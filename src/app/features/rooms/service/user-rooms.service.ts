// src/app/services/user-rooms.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { AuthService } from '@core/services/auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { UserRoom } from '../models/user-room.model';

@Injectable({ providedIn: 'root' })
export class UserRoomsService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  getActiveUserRooms(): Observable<UserRoom[]> {
    return this.authService.authState$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of([]);
        }

        // Crear listener reactivo en userRooms
        const userRoomsRef = collection(this.firestore, `userRooms/${user.uid}/rooms`);
        const activeRoomsQuery = query(userRoomsRef, where('isActive', '==', true));

        return collectionData(activeRoomsQuery, { idField: 'id' }) as Observable<UserRoom[]>;
      }),
    );
  }
}
