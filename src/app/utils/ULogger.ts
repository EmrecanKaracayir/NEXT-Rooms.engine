import { Environment } from "../enums/Environment";

export class ULogger {
  private static sInstance: ULogger;

  public static get(): ULogger {
    if (!ULogger.sInstance) {
      ULogger.sInstance = new ULogger();
    }
    return ULogger.sInstance;
  }

  public log(
    environment: Environment,
    logLevel: LogLevel,
    signature: string,
    message: string,
  ): void {
    if (environment === Environment.PRODUCTION) return;
    switch (logLevel) {
      case LogLevel.INFO:
        console.info(`[INFO] ${signature}: ${message}`);
        break;
      case LogLevel.WARNING:
        console.warn(`[WARN] ${signature}: ${message}`);
        break;
      case LogLevel.ERROR:
        console.error(`[ERRO] ${signature}: ${message}`);
        break;
    }
  }
}

export enum LogLevel {
  INFO,
  WARNING,
  ERROR,
}
