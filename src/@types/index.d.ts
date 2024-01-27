import { Membership } from "../base/enums/Membership";
import { AppString } from "../base/l10n/AppString";

export {};

declare global {
  type AppResponse<T> = {
    success: boolean;
    data: T;
  };

  type AppStringMap = {
    [K in AppString]: string;
  };

  type MembershipMap<T> = {
    [K in Membership]: T;
  };
}
