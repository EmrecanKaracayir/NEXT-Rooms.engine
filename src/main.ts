import { ROOM_CAPACITY, ROOM_NAME, ROOM_NO_HOST, ROOM_PUBLIC } from "./base/constants/configs";
import { CRoom } from "./controllers/CRoom";

CRoom.initialize({
  roomName: ROOM_NAME,
  maxPlayers: ROOM_CAPACITY,
  public: ROOM_PUBLIC,
  noPlayer: ROOM_NO_HOST,
});
