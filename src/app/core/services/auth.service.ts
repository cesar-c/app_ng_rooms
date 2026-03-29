import { Injectable, inject } from '@angular/core';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { Observable, filter, from, switchMap, take } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(FirebaseService).auth;

  readonly authState$ = new Observable<User | null>((observer) => {
    const unsubscribe = onAuthStateChanged(
      this.auth,
      (user) => observer.next(user),
      (error) => observer.error(error),
    );

    return () => unsubscribe();
  });

  signInWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();

    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(() => this.authState$),
      filter((user) => user !== null),
      take(1),
    );
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
