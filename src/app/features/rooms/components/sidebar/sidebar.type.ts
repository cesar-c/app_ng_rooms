import { EUIState } from '@core/enums/ui-states.enum';
import { UserRoom } from '@features/rooms/models/user-room.model';

export interface UserRoomsResult {
  state: EUIState;
  rooms: UserRoom[];
}
