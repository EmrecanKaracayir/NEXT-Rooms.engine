import { B_DEFAULT_DEBUG } from "../base/constants/configs";
import { LogLevel } from "../base/enums/logLevel";
import { PlayerType } from "../base/enums/playerType";
import { LOG } from "../base/helpers/logger";
import { MCapacity } from "../managers/MCapacity";
import { MPlayer } from "../managers/MPlayer";

export class CRoom {
  private static sInstance: CRoom;
  private static sbDebug: boolean = B_DEFAULT_DEBUG;

  public static initialize(roomConfig: RoomConfig): CRoom {
    if (!CRoom.sInstance) {
      CRoom.sInstance = new CRoom(HBInit(roomConfig));
    }
    return CRoom.sInstance;
  }

  private constructor(private readonly m_room: Room) {
    LOG(CRoom.sbDebug, LogLevel.INFO, "CRoom", "constructor", "Initialized.");
    this.bindEvents();
  }

  private bindEvents(): void {
    LOG(CRoom.sbDebug, LogLevel.INFO, "CRoom", "bindEvents", "Binding events.");
    this.m_room.onPlayerJoin = this.onPlayerJoin.bind(this);
  }

  private onPlayerJoin(player: Player): void {
    LOG(
      CRoom.sbDebug,
      LogLevel.INFO,
      "CRoom",
      "onPlayerJoin",
      `Player "${player.name}" joined the room.`,
    );
    LOG(
      CRoom.sbDebug,
      LogLevel.WARNING,
      "CRoom",
      "onPlayerJoin",
      `NOT IMPLEMENTED!`,
    );
    MPlayer.get().getPlayerModel(player);
    const bCapacity: boolean = MCapacity.get().canJoinRoom(
      this.m_room,
      PlayerType.STANDARD,
    );
    if (!bCapacity) {
      this.m_room.kickPlayer(player.id, "Room is full.", false);
    }
  }
}
