import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut } from 'lucide-angular';
import { NgRoomButton } from '@components/atoms/button/button';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngroom-sidebar',
  imports: [CommonModule, LucideAngularModule, NgRoomButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly user = signal(this.authService.getCurrentUser());
  logOutIcon = LogOut;
  totalItems = 16;

  items = computed(() =>
    Array.from({ length: this.totalItems }, (_, i) => ({ id: i + 1, name: `Room ${i + 1}` })),
  );

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
