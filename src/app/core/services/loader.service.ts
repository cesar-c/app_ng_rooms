import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private showLoader = signal(true);

  get isLoading() {
    return this.showLoader.asReadonly();
  }

  show() {
    this.showLoader.set(true);
  }
  hide() {
    this.showLoader.set(false);
  }
}
