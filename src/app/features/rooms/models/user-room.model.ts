export interface UserRoom {
  roomId: string;
  roomName: string;
  lastMessage: string;
  unreadCount: number;
  isActive: boolean;
}