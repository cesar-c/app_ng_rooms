import { Component, HostListener, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { DEFAULT_MODAL_CONFIG, ModalConfig, ModalSize } from './modal.type';
import { NgRoomButton } from '@components/atoms/button/button';

@Component({
  selector: 'ngroom-modal',
  imports: [NgClass, LucideAngularModule, NgRoomButton],
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class NgRoomModal {
  open = input(false);
  config = input<Partial<ModalConfig>>();
  xIcon = X;

  closeRequest = output<void>();

  readonly sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  settings = computed(() => ({
    ...DEFAULT_MODAL_CONFIG,
    ...(this.config() ?? {}),
  }));

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    const settings = this.settings();
    if (!this.open() || !settings.closeOnEscape) {
      return;
    }

    this.closeRequest.emit();
  }

  onBackdropClick(): void {
    const settings = this.settings();
    if (!settings.closeOnBackdrop) {
      return;
    }

    this.closeRequest.emit();
  }
}
