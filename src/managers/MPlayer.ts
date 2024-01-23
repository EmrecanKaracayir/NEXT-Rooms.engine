import { SYSTEM_ENVIRONMENT } from "../base/constants/configs";
import { Environment } from "../base/enums/environment";
import { LogLevel } from "../base/enums/logLevel";
import { LOG } from "../base/helpers/logger";

export class MPlayer {
  private static readonly sClassName: string = "MPlayer";
  private static readonly sEnvironment: Environment = SYSTEM_ENVIRONMENT;
  private static sInstance: MPlayer;

  public static get(requireClean: boolean = false): MPlayer {
    if (!MPlayer.sInstance) {
      MPlayer.sInstance = new MPlayer();
    }
    if (requireClean && MPlayer.sInstance.mIsDirty) {
      MPlayer.sInstance = new MPlayer();
    }
    return MPlayer.sInstance;
  }

  private constructor(private mIsDirty: boolean = false) {
    const signature: string = `${MPlayer.sClassName}.constructor()`;
    // #region LOG
    LOG(MPlayer.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }

  public getPlayerModel(player: Player): void {
    const signature: string = `${MPlayer.sClassName}.getPlayerModel()`;
    // #region LOG
    LOG(
      MPlayer.sEnvironment,
      LogLevel.INFO,
      signature,
      `Getting player model for player "${player.name}".`,
    );
    LOG(MPlayer.sEnvironment, LogLevel.WARNING, signature, `NOT IMPLEMENTED!`);
    // #endregion
  }
}
