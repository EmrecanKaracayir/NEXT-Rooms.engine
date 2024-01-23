import { B_DEFAULT_DEBUG } from "../base/constants/configs";
import { LogLevel } from "../base/enums/logLevel";
import { LOG } from "../base/helpers/logger";

export class MAccount {
  private static sClassName: string = "MAccount";
  private static sInstance: MAccount;
  private static sbDebug: boolean = B_DEFAULT_DEBUG;

  public static get(bClean: boolean = false): MAccount {
    if (!MAccount.sInstance) {
      MAccount.sInstance = new MAccount();
    }
    if (bClean && MAccount.sInstance.m_bDirty) {
      MAccount.sInstance = new MAccount();
    }
    return MAccount.sInstance;
  }

  private constructor(private m_bDirty: boolean = false) {
    const signature: string = `${MAccount.sClassName}.constructor()`;
    LOG(MAccount.sbDebug, LogLevel.INFO, signature, "Initialized.");
  }
}
