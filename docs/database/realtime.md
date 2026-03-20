# Realtime Database Schema

## Collections

### userRooms/
- **Path**: `userRooms/{userId}/{roomId}`
- **Fields**:
  - `roomName`: string
  - `lastRead`: number (timestamp)
  - `isActive`: boolean

### roomMembers/
- **Path**: `roomMembers/{roomId}/{userId}`
- **Fields**:
  - `displayName`: string
  - `isOnline`: boolean
