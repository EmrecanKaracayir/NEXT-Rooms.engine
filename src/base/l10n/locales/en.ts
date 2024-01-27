import { Membership } from "../../enums/Membership";
import { capacityRules } from "../../rules/join";
import { AppString } from "../AppString";

export const EN: AppStringMap = {
  [AppString.MCapacity_canPlayerJoin_basicRejection]: `Premium membership required for joining rooms with ${capacityRules[Membership.FREE]}+ players!`,
  [AppString.MCapacity_canPlayerJoin_premiumRejection]: `Only admins can join rooms with ${capacityRules[Membership.PREMIUM]}+ players!`,
  [AppString.MCapacity_canPlayerJoin_adminRejection]: "Room is full right now!",
};
