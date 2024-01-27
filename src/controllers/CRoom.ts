import { SYSTEM_ENVIRONMENT } from "../base/constants/config";
import { Environment } from "../base/enums/Environment";
import { Membership } from "../base/enums/Membership";
import { MCapacity } from "../managers/MCapacity";
import { MPlayer } from "../managers/MPlayer";
import { LogLevel, ULogger } from "../utils/ULogger";

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
    ULogger.get().log(CRoom.sEnvironment, LogLevel.INFO, signature, "Initialized.");
    // #endregion
    this.bindEvents();
  }

  private bindEvents(): void {
    const signature: string = `${CRoom.sClassName}.bindEvents()`;
    // #region LOG
    ULogger.get().log(CRoom.sEnvironment, LogLevel.INFO, signature, "Binding events.");
    // #endregion
    this.mRoom.onPlayerJoin = this.onPlayerJoin.bind(this);
    // #region LOG
    ULogger.get().log(CRoom.sEnvironment, LogLevel.INFO, signature, "Binding complete.");
    // #endregion
  }

  private onPlayerJoin(player: Player): void {
    const signature: string = `${CRoom.sClassName}.onPlayerJoin()`;
    // #region LOG
    ULogger.get().log(
      CRoom.sEnvironment,
      LogLevel.INFO,
      signature,
      `Player "${player.name}" joined the room.`,
    );
    ULogger.get().log(CRoom.sEnvironment, LogLevel.WARNING, signature, `NOT IMPLEMENTED!`);
    ULogger.get().log(CRoom.sEnvironment, LogLevel.INFO, signature, `Player conn: ${player.conn}`);
    // #endregion
    MPlayer.get().getPlayerModel(player);
    const capacityRes: AppResponse<string> = MCapacity.get().canPlayerJoin(
      this.mRoom,
      Membership.FREE,
    );
    if (!capacityRes.success) {
      this.mRoom.kickPlayer(player.id, capacityRes.data, false);
    }
  }
}
