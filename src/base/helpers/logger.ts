import { LogLevel } from "../enums/logLevel";

export function LOG(
  bDebug: boolean,
  level: LogLevel,
  className: string,
  methodName: string,
  message: string,
): void {
  if (!bDebug) {
    return;
  }
  switch (level) {
    case LogLevel.INFO:
      console.info(`[INFO | ${className}.${methodName}]: `, message);
      break;
    case LogLevel.WARNING:
      console.warn(`[WARN | ${className}.${methodName}]: `, message);
      break;
    case LogLevel.ERROR:
      console.error(`[ERRO | ${className}.${methodName}]: `, message);
      break;
  }
}
