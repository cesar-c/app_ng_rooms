import { Timestamp } from '@angular/fire/firestore';

export interface UserRoom {
  roomId: string;
  roomName: string;
  role: 'admin' | 'member';
  lastReadTimestamp: Timestamp;
  joinedAt: Timestamp;
  isActive: boolean;
}
