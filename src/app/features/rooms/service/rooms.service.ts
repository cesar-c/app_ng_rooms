import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { doc, onSnapshot, addDoc, collection } from 'firebase/firestore';

import { FirebaseService } from '@core/services/firebase.service';
import { type Room, RoomModel } from '@features/rooms/models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private firestore = inject(FirebaseService).firestore;

  public getRoomById(roomId: string): Observable<Room> {
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

  public createRoom(name: string, adminId: string): Observable<Room> {
    const roomsCollection = collection(this.firestore, 'rooms');
    const payload = RoomModel.createNewRoom(name, adminId);
    return from(addDoc(roomsCollection, payload)).pipe(
      map((docRef) => ({ id: docRef.id, ...payload }) as Room),
    );
  }
}
