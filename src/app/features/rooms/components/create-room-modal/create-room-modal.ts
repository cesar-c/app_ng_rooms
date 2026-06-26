import { Component, computed, inject, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
export class CreateRoomModal {
  readonly presenter = inject(CreateRoomModalPresenter);
  isOpen = model(false);

  disableButton = computed(() => this.presenter.isLoading() || this.presenter.isNameInvalid());
  primaryActionLabel = computed(() => (this.presenter.isLoading() ? 'Creando...' : 'Crear'));

  pencilLineIcon = PencilLine;

  modalConfig: Partial<ModalConfig> = {
    size: 'sm',
  };

  closeModal() {
    this.isOpen.set(false);
  }
}
