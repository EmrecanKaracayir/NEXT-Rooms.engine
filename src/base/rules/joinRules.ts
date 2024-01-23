import { ROOM_CAPACITY } from "../constants/configs";
import { PlayerType } from "../enums/playerType";

export const capacityRules: PlayerTypeMap<number> = {
  [PlayerType.BASIC]: ROOM_CAPACITY - 4,
  [PlayerType.VIP]: ROOM_CAPACITY - 2,
  [PlayerType.ADMIN]: ROOM_CAPACITY,
};
