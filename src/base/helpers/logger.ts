import { LogLevel } from "../enums/logLevel";

export function LOG(bDebug: boolean, level: LogLevel, signature: string, message: string): void {
  if (!bDebug) {
    return;
  }
  switch (level) {
    case LogLevel.INFO:
      console.info(`[INFO | ${signature}]: `, message);
      break;
    case LogLevel.WARNING:
      console.warn(`[WARN | ${signature}]: `, message);
      break;
    case LogLevel.ERROR:
      console.error(`[ERRO | ${signature}]: `, message);
      break;
  }
}
