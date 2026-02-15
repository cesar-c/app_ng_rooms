import { Timestamp } from 'firebase/firestore';

export interface Room {
  id: string;
  name: string;
  description?: string;
  adminId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
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

export interface RoomWithStatus extends Room {
  hasUnread: boolean;
  userRole: 'admin' | 'member';
  lastReadTimestamp: Timestamp;
}
