// src/app/services/rooms.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room, RoomWithStatus } from '../models/room.model';
import { UserRoom } from '../models/user-room.model';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private firestore = inject(Firestore);

  getRoomById(roomId: string): Observable<Room> {
    const roomRef = doc(this.firestore, `rooms/${roomId}`);
    return docData(roomRef, { idField: 'id' }) as Observable<Room>;
  }

  getRoomWithStatus(userRoom: UserRoom): Observable<RoomWithStatus> {
    return this.getRoomById(userRoom.roomId).pipe(
      map((room) => this.enrichWithUserStatus(room, userRoom)),
    );
  }

  enrichWithUserStatus(room: Room, userRoom: UserRoom): RoomWithStatus {
    const hasUnread = this.hasUnreadMessages(
      room.lastMessage?.timestamp,
      userRoom.lastReadTimestamp,
    );

    return {
      ...room,
      hasUnread,
      userRole: userRoom.role,
      lastReadTimestamp: userRoom.lastReadTimestamp,
    };
  }

  private hasUnreadMessages(lastMessageTime?: Timestamp, lastReadTime?: Timestamp): boolean {
    if (!lastMessageTime || !lastReadTime) {
      return false;
    }

    return lastMessageTime.toMillis() > lastReadTime.toMillis();
  }
}
