import {
  BOT_VERSION as ROOM_VERSION,
  ROOM_CAPACITY,
  ROOM_NAME,
  ROOM_NO_HOST,
  ROOM_PUBLIC,
  SYSTEM_ENVIRONMENT,
} from "./base/constants/configs";
import { LogLevel } from "./base/enums/logLevel";
import { LOG } from "./base/helpers/logger";
import { CRoom } from "./controllers/CRoom";

// #region LOG
LOG(SYSTEM_ENVIRONMENT, LogLevel.INFO, "main", `NEXT-ROOMS ${ROOM_VERSION} started!`);
// #endregion

CRoom.initialize({
  roomName: ROOM_NAME,
  maxPlayers: ROOM_CAPACITY,
  public: ROOM_PUBLIC,
  noPlayer: ROOM_NO_HOST,
});
