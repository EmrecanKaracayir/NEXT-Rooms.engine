export class RoomController {
  private constructor(private readonly m_room: Room) {}

  public static withRoomConfig(roomConfig: RoomConfig): RoomController {
    return new RoomController(HBInit(roomConfig));
  }

  public getRoom(): Room {
    return this.m_room;
  }
}
