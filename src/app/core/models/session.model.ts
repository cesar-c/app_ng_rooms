import { ESessionState } from '@core/enums/session-states.enum';
import { type UserProfile } from './user.model';

export interface SessionState {
  user: UserProfile | null;
  state: ESessionState;
}

export class SessionStateModel {
  static createUnauthenticated(): SessionState {
    return {
      user: null,
      state: ESessionState.Unauthenticated,
    };
  }

  static createAuthenticated(user: NonNullable<SessionState['user']>): SessionState {
    return {
      user,
      state: ESessionState.Authenticated,
    };
  }

  static createPending(): SessionState {
    return {
      user: null,
      state: ESessionState.Pending,
    };
  }
}
