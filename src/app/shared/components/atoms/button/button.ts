import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ngroom-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class NgRoomButton {
  @Input() disabled = false;
  @Input() customClasses = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'base' = 'primary';
  @Output() clicked = new EventEmitter<void>();

  classes = computed(() => ['btn', `btn-${this.variant}`, this.customClasses]);
}
