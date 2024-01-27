import { DEFAULT_LOCALE, SYSTEM_ENVIRONMENT } from "../base/constants/config";
import { Environment } from "../base/enums/Environment";
import { AppString } from "../base/l10n/AppString";
import { EN } from "../base/l10n/locales/en";
import { TR } from "../base/l10n/locales/tr";
import { LogLevel, ULogger } from "../utils/ULogger";

export class HLocalization {
  private static readonly sClassName: string = "HLocalization";
  private static readonly sEnvironment: Environment = SYSTEM_ENVIRONMENT;
  private static sInstance: HLocalization;

  public static get(requireClean: boolean = false): HLocalization {
    if (!HLocalization.sInstance) {
      HLocalization.sInstance = new HLocalization();
    }
    if (requireClean && HLocalization.sInstance.mIsDirty) {
      HLocalization.sInstance = new HLocalization();
    }
    return HLocalization.sInstance;
  }

  private constructor(private mIsDirty: boolean = false) {
    const signature: string = `${HLocalization.sClassName}.constructor()`;
    // #region LOG
    ULogger.get().log(HLocalization.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }

  public localize(str: AppString, locale: AppLocale = DEFAULT_LOCALE): string {
    const signature: string = `${HLocalization.sClassName}.localize()`;
    // #region LOG
    ULogger.get().log(
      HLocalization.sEnvironment,
      LogLevel.INFO,
      signature,
      `Localizing key "${AppString[str]}" to "${AppLocale[locale]}".`,
    );
    // #endregion
    switch (locale) {
      case AppLocale.TR:
        return TR[str];
      case AppLocale.EN:
        return EN[str];
    }
  }
}

export enum AppLocale {
  TR,
  EN,
}
