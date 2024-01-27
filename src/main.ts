import {
  ROOM_CAPACITY,
  ROOM_NAME,
  ROOM_NO_HOST,
  ROOM_PUBLIC,
  ROOM_VERSION,
  SYSTEM_ENVIRONMENT,
} from "./base/constants/config";
import { CRoom } from "./controllers/CRoom";
import { LogLevel, ULogger } from "./utils/ULogger";

// #region LOG
ULogger.get().log(SYSTEM_ENVIRONMENT, LogLevel.INFO, "main", `NEXT-ROOMS ${ROOM_VERSION} started!`);
// #endregion

CRoom.initialize({
  roomName: ROOM_NAME,
  maxPlayers: ROOM_CAPACITY,
  public: ROOM_PUBLIC,
  noPlayer: ROOM_NO_HOST,
});
