import { AppString } from "../enums/appString";
import { PlayerType } from "../enums/playerType";
import { capacityRules } from "../rules/joinRules";

export const TR: AppStringMap = {
  [AppString.MCapacity_canPlayerJoin_basicRejection]: `${capacityRules[PlayerType.BASIC]}+ oyuncu bulunan odalara katılmak için premium üyelik gereklidir!`,
  [AppString.MCapacity_canPlayerJoin_premiumRejection]: `Yalnızca adminler ${capacityRules[PlayerType.PREMIUM]}+ oyuncu bulunan odalara katılabilir!`,
  [AppString.MCapacity_canPlayerJoin_adminRejection]: "Oda şu anda dolu!",
};
