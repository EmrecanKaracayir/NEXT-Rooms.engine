import {
  MAX_PLAYERS,
  NO_PLAYER,
  PUBLIC,
  ROOM_NAME,
} from "./base/constants/configs";
import { CRoom } from "./controllers/CRoom";

CRoom.initialize({
  roomName: ROOM_NAME,
  maxPlayers: MAX_PLAYERS,
  public: PUBLIC,
  noPlayer: NO_PLAYER,
});
