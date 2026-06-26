# Firestore Schema

## Collections

### users/

- **Document ID**: `{userId}`
- **Fields**:
  - `email`: string
  - `name`: string
  - `createdAt`: Timestamp (optional)

### rooms/

- **Document ID**: `{roomId}`
- **Fields**:
  - `name`: string
  - `adminId`: string
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp
  - `deletedAt`: Timestamp
  - `memberIds`: string[]
  - `lastMessage`: LastMessage (optional)

- **LastMessage**:
  - `text`: string
  - `senderId`: string
  - `senderName`: string
  - `timestamp`: Timestamp

### Subcollections

#### rooms/{roomId}/messages/

- **Document ID**: `{messageId}`
- **Fields**:
  - `text`: string
  - `senderId`: string
  - `senderName`: string
  - `timestamp`: Timestamp
