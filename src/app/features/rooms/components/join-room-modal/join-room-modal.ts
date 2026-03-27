import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { NgRoomModal } from '@components/molecules/modal/modal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ModalConfig } from '@components/molecules/modal/modal.type';
import { NgRoomButton } from '@components/atoms/button/button';
import { LucideAngularModule, AtSign } from 'lucide-angular';

@Component({
  selector: 'ngroom-join-room-modal',
  imports: [NgRoomModal, NgRoomButton, LucideAngularModule],
  templateUrl: './join-room-modal.html',
  styleUrl: './join-room-modal.css',
})
export class JoinRoomModal implements OnInit {
  private destroyRef = inject(DestroyRef);
  showModal = signal(false);
  atSignIcon = AtSign;

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
