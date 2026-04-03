import { inject, Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { doc, DocumentSnapshot, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toDate } from '@core/helpers/date.helpers';
import { UserProfile } from '@core/models/user.model';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(FirebaseService).firestore;

  getUserProfile(uid: string): Observable<UserProfile> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userDoc)).pipe(map((docSnap) => this.mapDocToProfile(docSnap, uid)));
  }

  createOrUpdateUser(userData: User): Observable<UserProfile> {
    const userDoc = doc(this.firestore, `users/${userData.uid}`);
    return from(getDoc(userDoc)).pipe(
      switchMap((docSnap) => {
        const isNew = !docSnap.exists();
        const profileUpdate = this.buildProfileUpdate(userData, isNew);
        return from(setDoc(userDoc, profileUpdate, { merge: true })).pipe(
          map(() =>
            isNew ? (profileUpdate as UserProfile) : this.mapDocToProfile(docSnap, userData.uid),
          ),
        );
      }),
    );
  }

  private buildProfileUpdate(userData: User, isNew: boolean): Partial<UserProfile> {
    const profileUpdate: Partial<UserProfile> = {
      email: userData.email || '',
      name: userData.displayName || 'Anonymous',
    };

    if (isNew) {
      profileUpdate.createdAt = serverTimestamp() as unknown as Date;
    }

    return profileUpdate;
  }

  private mapDocToProfile(data: DocumentSnapshot, uid: string): UserProfile {
    const docData = data.data() || {};
    const createdAtValue = toDate(docData['createdAt']);
    return {
      uid,
      email: docData['email'] || '',
      name: docData['name'] || 'Anonymous',
      createdAt: createdAtValue,
    };
  }
}
