import { B_DEFAULT_DEBUG } from "../base/constants/configs";
import { LogLevel } from "../base/enums/logLevel";
import { LOG } from "../base/helpers/logger";

export class MPlayer {
  private static sInstance: MPlayer;
  private static sbDebug: boolean = B_DEFAULT_DEBUG;

  public static get(bClean: boolean = false): MPlayer {
    if (!MPlayer.sInstance) {
      MPlayer.sInstance = new MPlayer();
    }
    if (bClean && MPlayer.sInstance.m_bDirty) {
      MPlayer.sInstance = new MPlayer();
    }
    return MPlayer.sInstance;
  }

  private constructor(private m_bDirty: boolean = false) {
    LOG(
      MPlayer.sbDebug,
      LogLevel.INFO,
      "MPlayer",
      "constructor",
      "Initialized.",
    );
  }

  public getPlayerModel(player: Player): void {
    LOG(
      MPlayer.sbDebug,
      LogLevel.INFO,
      "MPlayer",
      "getPlayerModel",
      `Getting player model for player "${player.name}".`,
    );
    LOG(
      MPlayer.sbDebug,
      LogLevel.WARNING,
      "MPlayer",
      "getPlayerModel",
      `NOT IMPLEMENTED!`,
    );
  }
}
