import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, DocumentSnapshot, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { UserProfile } from '@core/models/user.model';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);

  getUserProfile(uid: string): Observable<UserProfile> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userDoc).then((docSnap) => this.formatUserProfile(docSnap, uid)));
  }

  createOrUpdateUser(userData: User): Observable<UserProfile> {
    const userDoc = doc(this.firestore, `users/${userData.uid}`);
    const userDataFormated: Partial<UserProfile> = {
      email: userData.email || '',
      name: userData.displayName || 'Anonymous',
      photoURL: userData.photoURL || '',
      lastLogin: new Date(),
    };

    return this.getUserProfile(userData.uid).pipe(
      switchMap((profile) => {
        const profileUpdated = { ...profile, ...userDataFormated } as UserProfile;
        if (!profileUpdated.createdAt) {
          profileUpdated.createdAt = new Date();
        }
        /* Se guarda la data actualizada menos el uid */
        const { uid, ...dataToSave } = profileUpdated;
        return from(setDoc(userDoc, dataToSave, { merge: true })).pipe(map((_) => profileUpdated));
      }),
    );
  }

  private formatUserProfile(data: DocumentSnapshot, uid: string): UserProfile {
    const docData = data.data() || {};
    return {
      uid,
      email: docData['email'] || '',
      name: docData['name'] || 'Anonymous',
      photoURL: docData['photoURL'] || '',
      createdAt: docData['createdAt'] ? docData['createdAt'].toDate() : '',
      lastLogin: docData['lastLoginAt'] ? docData['lastLoginAt'].toDate() : '',
    };
  }
}
