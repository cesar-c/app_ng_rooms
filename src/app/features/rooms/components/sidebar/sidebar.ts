import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut, MessagesSquare, MessageSquarePlus } from 'lucide-angular';
import { NgRoomButton } from '@components/atoms/button/button';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { JoinRoomModal } from '../join-room-modal/join-room-modal';
import { map, Observable, Subject } from 'rxjs';
import { UserRoomsService } from '@features/rooms/service/user-rooms.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { type UserRoomsResult } from './sidebar.type';
import { EUIState } from '@core/enums/ui-states.enum';

@Component({
  selector: 'ngroom-sidebar',
  imports: [CommonModule, LucideAngularModule, NgRoomButton, JoinRoomModal],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly userRoomsService = inject(UserRoomsService);

  /* ICONS  */
  logOutIcon = LogOut;
  messagesSquareIcon = MessagesSquare;
  messageSquarePlusIcon = MessageSquarePlus;

  readonly showJoinRoomModalSubject = new Subject<void>();
  showJoinRoomModal$ = this.showJoinRoomModalSubject.asObservable();

  readonly user = signal(this.authService.getCurrentUser());
  private userRooms$: Observable<UserRoomsResult> = this.userRoomsService
    .getActiveUserRooms()
    .pipe(map((rooms) => ({ state: EUIState.Success, rooms })));
  readonly userRooms = toSignal(this.userRooms$, {
    initialValue: { state: EUIState.Loading, rooms: [] },
  });

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
