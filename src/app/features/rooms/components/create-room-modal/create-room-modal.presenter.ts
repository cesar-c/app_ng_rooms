import { computed, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';

@Injectable()
export class CreateRoomModalPresenter {
  public readonly nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(30)],
  });

  private readonly nameStatus = toSignal(this.nameControl.statusChanges, {
    initialValue: this.nameControl.status,
  });

  readonly isNameInvalid = computed(() => this.nameStatus() !== 'VALID');
  readonly isLoading = signal(false);
}
