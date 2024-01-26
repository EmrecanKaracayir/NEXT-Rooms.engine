import { AppString } from "../enums/appString";
import { PlayerType } from "../enums/playerType";
import { capacityRules } from "../rules/joinRules";

export const EN: AppStringMap = {
  [AppString.MCapacity_canPlayerJoin_basicRejection]: `Premium membership required for joining rooms with ${capacityRules[PlayerType.BASIC]}+ players!`,
  [AppString.MCapacity_canPlayerJoin_premiumRejection]: `Only admins can join rooms with ${capacityRules[PlayerType.PREMIUM]}+ players!`,
  [AppString.MCapacity_canPlayerJoin_adminRejection]: "Room is full right now!",
};
