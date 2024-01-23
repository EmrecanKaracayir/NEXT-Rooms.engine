import { SYSTEM_ENVIRONMENT } from "../base/constants/configs";
import { Environment } from "../base/enums/environment";
import { LogLevel } from "../base/enums/logLevel";
import { LOG } from "../base/helpers/logger";

export class MAccount {
  private static readonly sClassName: string = "MAccount";
  private static readonly sEnvironment: Environment = SYSTEM_ENVIRONMENT;
  private static sInstance: MAccount;

  public static get(requireClean: boolean = false): MAccount {
    if (!MAccount.sInstance) {
      MAccount.sInstance = new MAccount();
    }
    if (requireClean && MAccount.sInstance.mIsDirty) {
      MAccount.sInstance = new MAccount();
    }
    return MAccount.sInstance;
  }

  private constructor(private mIsDirty: boolean = false) {
    const signature: string = `${MAccount.sClassName}.constructor()`;
    // #region LOG
    LOG(MAccount.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }
}
