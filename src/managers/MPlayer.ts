import { SYSTEM_ENVIRONMENT } from "../base/constants/config";
import { Environment } from "../base/enums/Environment";
import { LogLevel, ULogger } from "../utils/ULogger";

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
    ULogger.get().log(MPlayer.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }

  public getPlayerModel(player: Player): void {
    const signature: string = `${MPlayer.sClassName}.getPlayerModel()`;
    // #region LOG
    ULogger.get().log(
      MPlayer.sEnvironment,
      LogLevel.INFO,
      signature,
      `Getting player model for player "${player.name}".`,
    );
    ULogger.get().log(MPlayer.sEnvironment, LogLevel.WARNING, signature, `NOT IMPLEMENTED!`);
    // #endregion
  }
}
