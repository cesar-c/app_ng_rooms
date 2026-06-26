import { Component, model } from '@angular/core';
import { LucideAngularModule, AtSign } from 'lucide-angular';

import { NgRoomModal } from '@components/molecules/modal/modal';
import { ModalConfig } from '@components/molecules/modal/modal.type';
import { NgRoomButton } from '@components/atoms/button/button';

@Component({
  selector: 'ngroom-join-room-modal',
  imports: [NgRoomModal, NgRoomButton, LucideAngularModule],
  templateUrl: './join-room-modal.html',
  styleUrl: './join-room-modal.css',
})
export class JoinRoomModal {
  isOpen = model(false);
  atSignIcon = AtSign;

  modalConfig: Partial<ModalConfig> = {
    size: 'sm',
  };

  closeModal() {
    this.isOpen.set(false);
  }
}
