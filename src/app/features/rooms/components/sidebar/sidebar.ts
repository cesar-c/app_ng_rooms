import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut, MessagesSquare, MessageSquarePlus } from 'lucide-angular';
import { NgRoomButton } from '@components/atoms/button/button';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { JoinRoomModal } from '../join-room-modal/join-room-modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngroom-sidebar',
  imports: [CommonModule, LucideAngularModule, NgRoomButton, JoinRoomModal],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly showJoinRoomModalSubject = new Subject<void>();
  showJoinRoomModal$ = this.showJoinRoomModalSubject.asObservable();

  readonly user = signal(this.authService.getCurrentUser());

  /* ICONS  */
  logOutIcon = LogOut;
  messagesSquareIcon = MessagesSquare;
  messageSquarePlusIcon = MessageSquarePlus;

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
