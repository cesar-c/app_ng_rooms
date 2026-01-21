import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut } from 'lucide-angular';
import { NgRoomButton } from '@components/atoms/button/button';

@Component({
  selector: 'ngroom-sidebar',
  imports: [CommonModule, LucideAngularModule, NgRoomButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  logOutIcon = LogOut;
  totalItems = 16;

  items = computed(() =>
    Array.from({ length: this.totalItems }, (_, i) => ({ id: i + 1, name: `Room ${i + 1}` })),
  );
}
