import { Component, computed, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { LucideAngularModule, PencilLine } from 'lucide-angular';

import { NgRoomButton } from '@components/atoms/button/button';
import { NgRoomModal } from '@components/molecules/modal/modal';
import { type ModalConfig } from '@components/molecules/modal/modal.type';
import { CreateRoomModalPresenter } from './create-room-modal.presenter';

@Component({
  selector: 'ngroom-create-room-modal',
  imports: [NgRoomModal, NgRoomButton, LucideAngularModule, ReactiveFormsModule],
  providers: [CreateRoomModalPresenter],
  templateUrl: './create-room-modal.html',
  styleUrl: './create-room-modal.css',
})
export class CreateRoomModal implements OnInit {
  private destroyRef = inject(DestroyRef);
  readonly presenter = inject(CreateRoomModalPresenter);
  showModal = signal(false);

  disableButton = computed(() => this.presenter.isLoading() || this.presenter.isNameInvalid());
  primaryActionLabel = computed(() => (this.presenter.isLoading() ? 'Creando...' : 'Crear'));

  pencilLineIcon = PencilLine;

  modalConfig: Partial<ModalConfig> = {
    size: 'sm',
  };

  @Input({ required: true }) open$!: Observable<void>;

  ngOnInit(): void {
    this.open$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.showModal.set(true));
  }

  closeModal() {
    this.showModal.set(false);
  }
}
