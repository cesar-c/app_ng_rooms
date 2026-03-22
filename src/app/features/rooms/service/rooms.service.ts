import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Room } from '@features/rooms/models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private firestore = inject(Firestore);

  getRoomById(roomId: string): Observable<Room> {
    const roomRef = doc(this.firestore, `rooms/${roomId}`);
    return docData(roomRef, { idField: 'id' }) as Observable<Room>;
  }

}
