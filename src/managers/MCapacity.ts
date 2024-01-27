import { ROOM_CAPACITY, SYSTEM_ENVIRONMENT } from "../app/constants/config";
import { RESPONSE_OK } from "../app/constants/others";
import { Environment } from "../app/enums/Environment";
import { Membership } from "../app/enums/Membership";
import { AppString } from "../app/l10n/AppString";
import { capacityRules } from "../app/rules/join";
import { HLocalization } from "../app/helpers/HLocalization";
import { LogLevel, ULogger } from "../app/utils/ULogger";

export class MCapacity {
  private static readonly sClassName: string = "MCapacity";
  private static readonly sEnvironment: Environment = SYSTEM_ENVIRONMENT;
  private static sInstance: MCapacity;

  public static get(requireClean: boolean = false): MCapacity {
    if (!MCapacity.sInstance) {
      MCapacity.sInstance = new MCapacity();
    }
    if (requireClean && MCapacity.sInstance.mIsDirty) {
      MCapacity.sInstance = new MCapacity();
    }
    return MCapacity.sInstance;
  }

  private constructor(private mIsDirty: boolean = false) {
    const signature: string = `${MCapacity.sClassName}.constructor()`;
    // #region LOG
    ULogger.get().log(MCapacity.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }

  public canPlayerJoin(room: Room, membership: Membership): AppResponse<string> {
    const signature: string = `${MCapacity.sClassName}.canPlayerJoin()`;
    // #region LOG
    ULogger.get().log(
      MCapacity.sEnvironment,
      LogLevel.INFO,
      signature,
      `Checking if player with the "${Membership[membership]}" role can join the room.`,
    );
    // #endregion
    const playerCount: number = room.getPlayerList().length - 1; // -1 because the player is already in the room.
    const canJoin: boolean = playerCount < capacityRules[membership];
    // #region LOG
    ULogger.get().log(
      MCapacity.sEnvironment,
      LogLevel.INFO,
      signature,
      `Room has ${playerCount}/${ROOM_CAPACITY} player(s) in room. The player ${canJoin ? "can" : "cannot"} join.`,
    );
    // #endregion
    if (!canJoin) {
      switch (membership) {
        case Membership.FREE:
          return {
            success: false,
            data: HLocalization.get().localize(AppString.MCapacity_canPlayerJoin_basicRejection),
          };
        case Membership.PREMIUM:
          return {
            success: false,
            data: HLocalization.get().localize(AppString.MCapacity_canPlayerJoin_premiumRejection),
          };
        case Membership.ADMIN:
          return {
            success: false,
            data: HLocalization.get().localize(AppString.MCapacity_canPlayerJoin_adminRejection),
          };
      }
    }
    return { success: true, data: RESPONSE_OK };
  }
}
