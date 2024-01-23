import { ROOM_CAPACITY, SYSTEM_ENVIRONMENT } from "../base/constants/configs";
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
      `Room has ${playerCount}/${ROOM_CAPACITY} player(s) in room. Player ${canJoin ? "can" : "cannot"} join.`,
    );
    // #endregion
    return canJoin;
  }
}
