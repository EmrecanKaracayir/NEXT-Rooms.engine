import { ROOM_CAPACITY } from "../constants/config";
import { Membership } from "../enums/Membership";

export const capacityRules: MembershipMap<number> = {
  [Membership.FREE]: ROOM_CAPACITY - 4,
  [Membership.PREMIUM]: ROOM_CAPACITY - 2,
  [Membership.ADMIN]: ROOM_CAPACITY,
};
