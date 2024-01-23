import { SYSTEM_ENVIRONMENT } from "../base/constants/configs";
import { Environment } from "../base/enums/environment";
import { LogLevel } from "../base/enums/logLevel";
import { PlayerType } from "../base/enums/playerType";
import { LOG } from "../base/helpers/logger";
import { MCapacity } from "../managers/MCapacity";
import { MPlayer } from "../managers/MPlayer";

export class CRoom {
  private static readonly sClassName: string = "CRoom";
  private static readonly sEnvironment: Environment = SYSTEM_ENVIRONMENT;
  private static sInstance: CRoom;

  public static initialize(roomConfig: RoomConfig): CRoom {
    if (!CRoom.sInstance) {
      CRoom.sInstance = new CRoom(HBInit(roomConfig));
    }
    return CRoom.sInstance;
  }

  private constructor(private readonly mRoom: Room) {
    const signature: string = `${CRoom.sClassName}.constructor()`;
    // #region LOG
    LOG(CRoom.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
    this.bindEvents();
  }

  private bindEvents(): void {
    const signature: string = `${CRoom.sClassName}.bindEvents()`;
    // #region LOG
    LOG(CRoom.sEnvironment, LogLevel.INFO, signature, "Binding events.");
    // #endregion
    this.mRoom.onPlayerJoin = this.onPlayerJoin.bind(this);
    // #region LOG
    LOG(CRoom.sEnvironment, LogLevel.INFO, signature, "Binding complete.");
    // #endregion
  }

  private onPlayerJoin(player: Player): void {
    const signature: string = `${CRoom.sClassName}.onPlayerJoin()`;
    // #region LOG
    LOG(CRoom.sEnvironment, LogLevel.INFO, signature, `Player "${player.name}" joined the room.`);
    LOG(CRoom.sEnvironment, LogLevel.WARNING, signature, `NOT IMPLEMENTED!`);
    // #endregion
    MPlayer.get().getPlayerModel(player);
    const bCapacity: boolean = MCapacity.get().canJoin(this.mRoom, PlayerType.BASIC);
    if (!bCapacity) {
      this.mRoom.kickPlayer(player.id, "Room is full", false);
    }
  }
}
