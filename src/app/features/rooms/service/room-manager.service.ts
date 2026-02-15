import { inject, Injectable } from '@angular/core';
import { RoomsService } from './rooms.service';
import { UserRoomsService } from './user-rooms.service';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { RoomWithStatus } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomManagerService {
  private userRoomsService = inject(UserRoomsService);
  private roomsService = inject(RoomsService);

  getUserRoomsWithStatus(): Observable<RoomWithStatus[]> {
    return this.userRoomsService.getActiveUserRooms().pipe(
      switchMap((userRooms) => {
        if (userRooms.length === 0) {
          return of([]);
        }

        // Obtener cada sala con su estado
        const roomObservables = userRooms.map((userRoom) =>
          this.roomsService.getRoomWithStatus(userRoom),
        );

        return combineLatest(roomObservables);
      }),
    );
  }
}
