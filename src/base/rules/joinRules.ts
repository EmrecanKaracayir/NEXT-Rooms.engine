import { PlayerType } from "../enums/playerType";

export const capacityRules: PlayerTypeMap<number> = {
  [PlayerType.STANDARD]: 20,
  [PlayerType.VIP]: 22,
  [PlayerType.ADMIN]: 24,
};
