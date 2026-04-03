import { inject, Injectable } from '@angular/core';
import { SessionState, SessionStateModel } from '@core/models/session.model';
import { BehaviorSubject, catchError, map, of, share, shareReplay, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authService = inject(AuthService);
  private userService = inject(UsersService);
  private sessionStateSubject = new BehaviorSubject<SessionState>(
    SessionStateModel.createPending(),
  );
  sessionState$ = this.sessionStateSubject.asObservable();
  get sessionState() {
    return this.sessionStateSubject.value;
  }

  constructor() {
    this.setupAuthListener();
  }

  private setupAuthListener() {
    this.authService.authState$
      .pipe(
        tap(() => this.pendingSession()),
        switchMap((user) => {
          if (!user) {
            return of(SessionStateModel.createUnauthenticated());
          }

          return this.userService.createOrUpdateUser(user).pipe(
            map((profile) => SessionStateModel.createAuthenticated(profile)),
            catchError(() => {
              this.authService.signOut();
              return of(SessionStateModel.createUnauthenticated());
            }),
          );
        }),
      )
      .subscribe((sessionState: SessionState) => {
        this.sessionStateSubject.next(sessionState);
      });
  }

  private pendingSession() {
    this.sessionStateSubject.next(SessionStateModel.createPending());
  }
}
