import { Injectable, inject } from '@angular/core';
import { onValue, ref } from 'firebase/database';
import { AuthService } from '@core/services/auth.service';
import { FirebaseService } from '@core/services/firebase.service';
import { Observable, distinctUntilChanged, of, switchMap } from 'rxjs';
import { UserRoom } from '../models/user-room.model';

@Injectable({ providedIn: 'root' })
export class UserRoomsService {
  private database = inject(FirebaseService).rtdb;
  private authService = inject(AuthService);

  getActiveUserRooms(): Observable<UserRoom[]> {
    return this.authService.authState$.pipe(
      distinctUntilChanged((prev, curr) => prev?.uid === curr?.uid),
      switchMap((user) => (user?.uid ? this.listenToUserRooms(user.uid) : of([]))),
    );
  }

  private listenToUserRooms(uid: string): Observable<UserRoom[]> {
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
