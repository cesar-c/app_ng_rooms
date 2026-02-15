import { inject, Injectable } from '@angular/core';
import { EAppState } from '@core/enums/app-state.enum';
import { UserProfile } from '@core/models/user.model';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs';

export interface SessionState {
  status: EAppState;
  user: UserProfile | null;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authService = inject(AuthService);
  private userService = inject(UsersService);
  private sessionStateSubject = new BehaviorSubject<UserProfile | null>(null);
  sessionState$ = this.sessionStateSubject.asObservable();

  constructor() {
    this.setupAuthListener();
  }

  private setupAuthListener() {
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.userService.getUserProfile(user.uid).subscribe((profile) => {
          this.sessionStateSubject.next(profile);
        });
      } else {
        this.sessionStateSubject.next(null);
      }
    });
  }
}
