import { inject, Injectable } from '@angular/core';
import { EAppState } from '@core/enums/app-state.enum';
import { UserProfile } from '@core/models/user.model';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { catchError, map, Observable, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

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
}
