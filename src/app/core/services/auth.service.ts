import { Injectable, inject } from '@angular/core';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { Observable, combineLatest, from, of, shareReplay, switchMap, take } from 'rxjs';
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
  }).pipe(shareReplay(1));

  signInWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();

    const signIn$ = from(signInWithPopup(this.auth, provider));

    return combineLatest([signIn$, this.authState$]).pipe(
      switchMap(([_, user]) => of(user)),
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
