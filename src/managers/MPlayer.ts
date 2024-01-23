import { B_DEFAULT_DEBUG } from "../base/constants/configs";
import { LogLevel } from "../base/enums/logLevel";
import { LOG } from "../base/helpers/logger";

export class MPlayer {
  private static sClassName: string = "MPlayer";
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
    const signature: string = `${MPlayer.sClassName}.constructor()`;
    // #region LOG
    LOG(MPlayer.sbDebug, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }

  public getPlayerModel(player: Player): void {
    const signature: string = `${MPlayer.sClassName}.getPlayerModel()`;
    // #region LOG
    LOG(
      MPlayer.sbDebug,
      LogLevel.INFO,
      signature,
      `Getting player model for player "${player.name}".`,
    );
    LOG(MPlayer.sbDebug, LogLevel.WARNING, signature, `NOT IMPLEMENTED!`);
    // #endregion
  }
}
