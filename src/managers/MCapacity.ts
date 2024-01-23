import { B_DEFAULT_DEBUG } from "../base/constants/configs";
import { LogLevel } from "../base/enums/logLevel";
import { PlayerType } from "../base/enums/playerType";
import { LOG } from "../base/helpers/logger";
import { capacityRules } from "../base/rules/joinRules";

export class MCapacity {
  private static sClassName: string = "MCapacity";
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
    const signature: string = `${MCapacity.sClassName}.constructor()`;
    LOG(MCapacity.sbDebug, LogLevel.INFO, signature, "Initialized.");
  }

  public canJoin(room: Room, playerType: PlayerType): boolean {
    const signature: string = `${MCapacity.sClassName}.canJoin()`;
    LOG(
      MCapacity.sbDebug,
      LogLevel.INFO,
      signature,
      `Checking if player type "${playerType}" can join thee room.`,
    );
    const bJoin: boolean =
      room.getPlayerList().length < capacityRules[playerType];
    LOG(
      MCapacity.sbDebug,
      LogLevel.INFO,
      signature,
      `Currently ${room.getPlayerList().length} players in room. Player ${bJoin ? "can" : "cannot"} join the room.`,
    );
    return bJoin;
  }
}
