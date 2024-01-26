import { DEFAULT_LOCALE, SYSTEM_ENVIRONMENT } from "../base/constants/configs";
import { AppLocale } from "../base/enums/appLocale";
import { AppString } from "../base/enums/appString";
import { Environment } from "../base/enums/environment";
import { LogLevel } from "../base/enums/logLevel";
import { LOG } from "../base/helpers/logger";
import { EN } from "../base/l10n/en";
import { TR } from "../base/l10n/tr";

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
    LOG(HLocalization.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
  }

  public localize(str: AppString, locale: AppLocale = DEFAULT_LOCALE): string {
    const signature: string = `${HLocalization.sClassName}.localize()`;
    // #region LOG
    LOG(
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
