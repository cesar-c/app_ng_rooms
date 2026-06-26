import { Timestamp } from 'firebase/firestore';

export interface Room {
  id?: string;
  name: string;
  adminId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
  memberIds: string[];
  memberCount: number;
  lastMessage?: LastMessage;
}

export interface LastMessage {
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Timestamp;
}

export class RoomModel {
  static createNewRoom(name: string, adminId: string): Room {
    return {
      name: name,
      adminId: adminId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      memberIds: [adminId],
      memberCount: 1,
    };
  }
}
