import { Membership } from "../../enums/Membership";
import { capacityRules } from "../../rules/join";
import { AppString } from "../AppString";

export const TR: AppStringMap = {
  [AppString.MCapacity_canPlayerJoin_basicRejection]: `${capacityRules[Membership.FREE]}+ oyuncu bulunan odalara katılmak için premium üyelik gereklidir!`,
  [AppString.MCapacity_canPlayerJoin_premiumRejection]: `Yalnızca adminler ${capacityRules[Membership.PREMIUM]}+ oyuncu bulunan odalara katılabilir!`,
  [AppString.MCapacity_canPlayerJoin_adminRejection]: "Oda şu anda dolu!",
};
