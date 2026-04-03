import { Injectable, inject } from '@angular/core';
import { onValue, ref } from 'firebase/database';
import { AuthService } from '@core/services/auth.service';
import { FirebaseService } from '@core/services/firebase.service';
import { Observable, distinctUntilChanged, of, switchMap } from 'rxjs';
import { UserRoom } from '../models/user-room.model';
import { SessionService } from '@core/services/session.service';

@Injectable({ providedIn: 'root' })
export class UserRoomsService {
  private database = inject(FirebaseService).rtdb;
  private sessionService = inject(SessionService);

  getActiveUserRooms(): Observable<UserRoom[]> {
    const currentUser = this.sessionService.sessionState.user;
    return currentUser ? this.listenToUserRooms(currentUser.uid) : of([]);
  }

  private listenToUserRooms(
    uid: string = this.sessionService.sessionState.user?.uid ?? '',
  ): Observable<UserRoom[]> {
    const userRoomsRef = ref(this.database, `userRooms/${uid}`);

    return new Observable<UserRoom[]>((observer) => {
      const unsubscribe = onValue(userRoomsRef, (snapshot) => {
        const data = snapshot.val() as Record<string, Partial<UserRoom>> | null;
        observer.next(data ? this.parseActiveRooms(data) : []);
      });

      return () => unsubscribe();
    });
  }

  private parseActiveRooms(data: Record<string, Partial<UserRoom>>): UserRoom[] {
    return Object.entries(data)
      .filter(([, value]) => value?.isActive)
      .map(([roomId, value]) => ({
        roomId,
        roomName: value?.roomName ?? '',
        lastMessage: value?.lastMessage ?? '',
        unreadCount: value?.unreadCount ?? 0,
        isActive: true,
      }));
  }
}
