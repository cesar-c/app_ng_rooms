import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { doc, onSnapshot } from 'firebase/firestore';
import { Room } from '@features/rooms/models/room.model';
import { FirebaseService } from '@core/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private firestore = inject(FirebaseService).firestore;

  getRoomById(roomId: string): Observable<Room> {
    const roomRef = doc(this.firestore, `rooms/${roomId}`);
    return new Observable<Room>((observer) => {
      const unsubscribe = onSnapshot(
        roomRef,
        (snapshot) => {
          const data = snapshot.data();
          observer.next({ id: snapshot.id, ...(data || {}) } as Room);
        },
        (error) => observer.error(error),
      );

      return () => unsubscribe();
    });
  }

}
