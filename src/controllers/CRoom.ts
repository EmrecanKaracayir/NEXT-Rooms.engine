import { B_DEFAULT_DEBUG } from "../base/constants/configs";
import { LogLevel } from "../base/enums/logLevel";
import { PlayerType } from "../base/enums/playerType";
import { LOG } from "../base/helpers/logger";
import { MCapacity } from "../managers/MCapacity";
import { MPlayer } from "../managers/MPlayer";

export class CRoom {
  private static sClassName: string = "CRoom";
  private static sInstance: CRoom;
  private static sbDebug: boolean = B_DEFAULT_DEBUG;

  public static initialize(roomConfig: RoomConfig): CRoom {
    if (!CRoom.sInstance) {
      CRoom.sInstance = new CRoom(HBInit(roomConfig));
    }
    return CRoom.sInstance;
  }

  private constructor(private readonly m_room: Room) {
    const signature: string = `${CRoom.sClassName}.constructor()`;
    // #region LOG
    LOG(CRoom.sbDebug, LogLevel.INFO, signature, "Initialized.");
    // #endregion
    this.bindEvents();
  }

  private bindEvents(): void {
    const signature: string = `${CRoom.sClassName}.bindEvents()`;
    // #region LOG
    LOG(CRoom.sbDebug, LogLevel.INFO, signature, "Binding events.");
    // #endregion
    this.m_room.onPlayerJoin = this.onPlayerJoin.bind(this);
    // #region LOG
    LOG(CRoom.sbDebug, LogLevel.INFO, signature, "Binding complete.");
    // #endregion
  }

  private onPlayerJoin(player: Player): void {
    const signature: string = `${CRoom.sClassName}.onPlayerJoin()`;
    // #region LOG
    LOG(CRoom.sbDebug, LogLevel.INFO, signature, `Player "${player.name}" joined the room.`);
    LOG(CRoom.sbDebug, LogLevel.WARNING, signature, `NOT IMPLEMENTED!`);
    // #endregion
    MPlayer.get().getPlayerModel(player);
    const bCapacity: boolean = MCapacity.get().canJoin(this.m_room, PlayerType.STANDARD);
    if (!bCapacity) {
      this.m_room.kickPlayer(player.id, "Room is full.", false);
    }
  }
}
