import { SYSTEM_ENVIRONMENT } from "../base/constants/configs";
import { Environment } from "../base/enums/environment";
import { LogLevel } from "../base/enums/logLevel";
import { PlayerType } from "../base/enums/playerType";
import { LOG } from "../base/helpers/logger";
import { capacityRules } from "../base/rules/joinRules";

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

  public canJoin(room: Room, playerType: PlayerType): boolean {
    const signature: string = `${MCapacity.sClassName}.canJoin()`;
    // #region LOG
    LOG(
      MCapacity.sEnvironment,
      LogLevel.INFO,
      signature,
      `Checking if player type "${playerType}" can join thee room.`,
    );
    // #endregion
    const bJoin: boolean = room.getPlayerList().length < capacityRules[playerType];
    // #region LOG
    LOG(
      MCapacity.sEnvironment,
      LogLevel.INFO,
      signature,
      `Currently ${room.getPlayerList().length} players in room. Player ${bJoin ? "can" : "cannot"} join the room.`,
    );
    // #endregion
    return bJoin;
  }
}
