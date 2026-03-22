import { Injectable, inject } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';
import { AuthService } from '@core/services/auth.service';
import { Observable, distinctUntilChanged, of, switchMap } from 'rxjs';
import { UserRoom } from '../models/user-room.model';

@Injectable({ providedIn: 'root' })
export class UserRoomsService {
  private database = inject(Database);
  private authService = inject(AuthService);

  getActiveUserRooms(): Observable<UserRoom[]> {
    return this.authService.authState$.pipe(
      distinctUntilChanged((previous, current) => previous?.uid === current?.uid),
      switchMap((user) => {
        if (!user?.uid) {
          return of([]);
        }

        const userRoomsRef = ref(this.database, `userRooms/${user.uid}`);

        return new Observable<UserRoom[]>((observer) => {
          const unsubscribe = onValue(userRoomsRef, (snapshot) => {
            const data = snapshot.val() as Record<string, Partial<UserRoom>> | null;

            if (!data) {
              observer.next([]);
              return;
            }

            const rooms: UserRoom[] = Object.entries(data)
              .filter(([, value]) => value?.isActive)
              .map(([roomId, value]) => ({
                roomId,
                roomName: value?.roomName ?? '',
                lastMessage: value?.lastMessage ?? '',
                unreadCount: value?.unreadCount ?? 0,
                isActive: true,
              }));

            observer.next(rooms);
          });

          return () => unsubscribe();
        });
      }),
    );
  }
}
