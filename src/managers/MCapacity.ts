import { ROOM_CAPACITY, SYSTEM_ENVIRONMENT } from "../base/constants/configs";
import { RESPONSE_OK } from "../base/constants/others";
import { AppString } from "../base/enums/appString";
import { Environment } from "../base/enums/environment";
import { LogLevel } from "../base/enums/logLevel";
import { PlayerType } from "../base/enums/playerType";
import { LOG } from "../base/helpers/logger";
import { capacityRules } from "../base/rules/joinRules";
import { HLocalization } from "../helpers/HLocalization";

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
    LOG(MCapacity.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }

  public canPlayerJoin(room: Room, playerType: PlayerType): AppResponse<string> {
    const signature: string = `${MCapacity.sClassName}.canPlayerJoin()`;
    // #region LOG
    LOG(
      MCapacity.sEnvironment,
      LogLevel.INFO,
      signature,
      `Checking if player with the "${PlayerType[playerType]}" role can join the room.`,
    );
    // #endregion
    const playerCount: number = room.getPlayerList().length - 1; // -1 because the player is already in the room.
    const canJoin: boolean = playerCount < capacityRules[playerType];
    // #region LOG
    LOG(
      MCapacity.sEnvironment,
      LogLevel.INFO,
      signature,
      `Room has ${playerCount}/${ROOM_CAPACITY} player(s) in room. The player ${canJoin ? "can" : "cannot"} join.`,
    );
    // #endregion
    if (!canJoin) {
      switch (playerType) {
        case PlayerType.BASIC:
          return {
            success: false,
            data: HLocalization.get().localize(AppString.MCapacity_canPlayerJoin_basicRejection),
          };
        case PlayerType.PREMIUM:
          return {
            success: false,
            data: HLocalization.get().localize(AppString.MCapacity_canPlayerJoin_premiumRejection),
          };
        case PlayerType.ADMIN:
          return {
            success: false,
            data: HLocalization.get().localize(AppString.MCapacity_canPlayerJoin_adminRejection),
          };
      }
    }
    return { success: true, data: RESPONSE_OK };
  }
}
