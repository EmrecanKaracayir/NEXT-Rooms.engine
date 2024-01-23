import { Environment } from "../enums/environment";
import { LogLevel } from "../enums/logLevel";

export function LOG(
  environment: Environment,
  level: LogLevel,
  signature: string,
  message: string,
): void {
  if (environment === Environment.PRODUCTION) return;
  switch (level) {
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
