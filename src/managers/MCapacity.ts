import { B_DEFAULT_DEBUG } from "../base/constants/configs";
import { LogLevel } from "../base/enums/logLevel";
import { PlayerType } from "../base/enums/playerType";
import { LOG } from "../base/helpers/logger";
import { capacityRules } from "../base/rules/joinRules";

export class MCapacity {
  private static sInstance: MCapacity;
  private static sbDebug: boolean = B_DEFAULT_DEBUG;

  public static get(bClean: boolean = false): MCapacity {
    if (!MCapacity.sInstance) {
      MCapacity.sInstance = new MCapacity();
    }
    if (bClean && MCapacity.sInstance.m_bDirty) {
      MCapacity.sInstance = new MCapacity();
    }
    return MCapacity.sInstance;
  }

  private constructor(private m_bDirty: boolean = false) {
    LOG(
      MCapacity.sbDebug,
      LogLevel.INFO,
      "MCapacity",
      "constructor",
      "Initialized.",
    );
  }

  public canJoinRoom(room: Room, playerType: PlayerType): boolean {
    LOG(
      MCapacity.sbDebug,
      LogLevel.INFO,
      "MCapacity",
      "canJoinRoom",
      `Checking if player type "${playerType}" can join room.`,
    );
    const bJoin: boolean =
      room.getPlayerList().length < capacityRules[playerType];
    LOG(
      MCapacity.sbDebug,
      LogLevel.INFO,
      "MCapacity",
      "canJoinRoom",
      `Currently ${room.getPlayerList().length} players in room. Player ${bJoin ? "can" : "cannot"} join room.`,
    );
    return bJoin;
  }
}
