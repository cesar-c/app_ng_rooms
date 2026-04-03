import { inject, Injectable, signal } from '@angular/core';
import { SessionService } from './session.service';
import { ESessionState } from '@core/enums/session-states.enum';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private sessionService = inject(SessionService);

  private showLoaderState = signal(false);

  showLoader = this.showLoaderState.asReadonly();

  constructor() {
    this.sessionService.sessionState$.subscribe((sessionState) => {
      this.showLoaderState.set(sessionState.state === ESessionState.Pending);
    });
  }
}
