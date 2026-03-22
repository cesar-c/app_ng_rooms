# Realtime Database Schema

## Collections

### userRooms/
- **Path**: `userRooms/{userId}/{roomId}`
- **Fields**:
  - `roomName`: string
  - `lastMessage`: string
  - `unreadCount`: string
  - `isActive`: boolean

### roomMembers/
- **Path**: `roomMembers/{roomId}/{userId}`
- **Fields**:
  - `displayName`: string
  - `isOnline`: boolean
