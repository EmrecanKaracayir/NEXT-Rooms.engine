export {};

declare global {
  /**
   * Use this function to initialize the room. Returns a new instance of the {@link Room} class.
   */
  function HBInit(roomConfig: RoomConfig): Room;

  /**
   * Room is the main interface which lets you control the room and listen to it's events.
   */
  class Room {
    /**
     * Sends a chat message using the host player.
     * @details
     * If targetId is null or undefined the message is sent to all players. If targetId is defined
     * the message is sent only to the player with a matching id.
     * @deprecated Use {@link sendAnnouncement} instead.
     */
    sendChat(msg: string, targetId: number): void;

    /**
     * Changes the admin status of the specified player.
     */
    setPlayerAdmin(playerId: number, admin: boolean): void;

    /**
     * Moves the specified player to a team.
     */
    setPlayerTeam(playerId: number, team: number): void;

    /**
     * Kicks the specified player from the room.
     */
    kickPlayer(playerId: number, reason: string, ban: boolean): void;

    /**
     * Clears the ban for a playerId that belonged to a player that was previously banned.
     */
    clearBan(playerId: number): void;

    /**
     * Clears the list of banned players.
     */
    clearBans(): void;

    /**
     * Sets the score limit of the room.
     * @details
     * If a game is in progress this method does nothing.
     */
    setScoreLimit(limit: number): void;

    /**
     * Sets the time limit of the room. The limit must be specified in number of minutes.
     * @details
     * If a game is in progress this method does nothing.
     */
    setTimeLimit(limitInMinutes: number): void;

    /**
     * Parses the stadiumFileContents as a .hbs stadium file and sets it as the selected stadium.
     * @details
     * There must not be a game in progress, If a game is in progress this method does nothing. See
     * example [here](https://github.com/haxball/haxball-issues/blob/master/headless/examples/setCustomStadium.js).
     */
    setCustomStadium(stadiumFileContents: string): void;

    /**
     * Sets the selected stadium to one of the default stadiums. The name must match exactly (case
     * sensitive).
     * @details
     * There must not be a game in progress, If a game is in progress this method does nothing.
     */
    setDefaultStadium(stadiumName: string): void;

    /**
     * Sets the teams lock. When teams are locked players are not able to change team unless they
     * are moved by an admin.
     */
    setTeamsLock(locked: boolean): void;

    /**
     * Sets the colors of a team.
     * @details
     * Colors are represented as an integer, for example a pure red color is 0xFF0000.
     */
    setTeamColors(team: TeamID, angle: number, textColor: number, colors: readonly number[]): void;

    /**
     * Starts the game.
     * @details
     * If a game is already in progress this method does nothing.
     */
    startGame(): void;

    /**
     * Stops the game.
     * @details
     * If there is no game in progress this method does nothing.
     */
    stopGame(): void;

    /**
     * Sets the pause state of the game.
     * @param pauseState If true the game is paused, if false the game is
     */
    pauseGame(pauseState: boolean): void;

    /**
     * Returns the player with the specified id. Returns null if the player doesn't exist.
     */
    getPlayer(playerId: number): Player | null;

    /**
     * Returns the current list of players.
     */
    getPlayerList(): Player[];

    /**
     * If a game is in progress it returns the current score information. Otherwise it returns null.
     */
    getScores(): Scores | null;

    /**
     * Returns the ball's position in the field or null if no game is in progress.
     */
    getBallPosition(): Position | null;

    /**
     * Starts recording of a haxball replay.
     * @details
     * Don't forget to call {@link stopRecording} or it will cause a memory leak.
     */
    startRecording(): void;

    /**
     * Stops the recording previously started with startRecording and returns the replay file
     * contents as a Uint8Array.
     * @details
     * Returns null if recording was not started or had already been stopped.
     */
    stopRecording(): Uint8Array | null;

    /**
     * Changes the password of the room, if pass is null the password will be cleared.
     */
    setPassword(pass: string | null): void;

    /**
     * Activates or deactivates the recaptcha requirement to join the room.
     */
    setRequireCaptcha(required: boolean): void;

    /**
     * First all players listed are removed, then they are reinserted in the same order they appear
     * in the playerIdList.
     * @details
     * If moveToTop is true players are inserted at the top of the list, otherwise they are inserted
     * at the bottom of the list.
     */
    reorderPlayers(playerIdList: readonly number[], moveToTop: boolean): void;

    /**
     * Sends a host announcement with msg as contents. Unlike {@link sendChat}, announcements will
     * work without a host player and has a larger limit on the number of characters.
     * @param targetId If targetId is null or undefined the message is sent to all players,
     * otherwise it's sent only to the player with matching targetId.
     * @param color Will set the color of the announcement text, it's encoded as an integer
     * (0xFF0000 is red, 0x00FF00 is green, 0x0000FF is blue).
     * @param style style will set the style of the announcement text, it must be one of the
     * following strings: "normal","bold","italic", "small", "small-bold", "small-italic"
     * @param If sound is set to 0 the announcement will produce no sound. If sound is set to 1 the
     * announcement will produce a normal chat sound. If set to 2 it will produce a notification
     * sound.
     */
    sendAnnouncement(
      msg: string,
      targetId?: number,
      color?: number,
      style?: TextStyle,
      sound?: SoundType,
    ): void;

    /**
     * Sets the room's kick rate limits.
     * @param min The minimum number of logic-frames between two kicks. It is impossible to kick
     * faster than this.
     * @param rate Works like min but lets players save up extra kicks to use them later depending
     * on the value of burst.
     * @param burst Determines how many extra kicks the player is able to save up.
     */
    setKickRateLimit(min: number, rate: number, burst: number): void;

    /**
     * Overrides the avatar of the target player.
     * @details
     * If avatar is set to null the override is cleared and the player will be able to use his own
     * avatar again.
     */
    setPlayerAvatar(playerId: number, avatar: string | null): void;

    /**
     * Sets properties of the target disc.
     * @details
     * If settings is set to null the override is cleared and the default stadium settings will be
     * used again. For example `room.setDiscProperties(0, {x: 0, y: 0});` will set the position of
     * disc 0 to <0,0> while leaving any other value intact.
     */
    setDiscProperties(discIndex: number, properties: Partial<DiscProperties>): void;

    /**
     * Gets the properties of the disc at discIndex. Returns null if discIndex is out of bounds.
     */
    getDiscProperties(discIndex: number): DiscProperties | null;

    /**
     * Same as {@link setDiscProperties} but targets the disc belonging to a player with the given
     * Id.
     */
    setPlayerDiscProperties(playerId: number, properties: Partial<DiscProperties>): void;

    /**
     * Same as {@link getDiscProperties} but targets the disc belonging to a player with the given
     * Id.
     */
    getPlayerDiscProperties(playerId: number): DiscProperties;

    /**
     * Gets the number of discs in the game including the ball and player discs.
     */
    getDiscCount(): number;

    /**
     * Object filled with the collision flags constants that compose the cMask and cGroup disc
     * properties.
     * @details
     * Read more about collision flags [here](https://github.com/haxball/haxball-issues/wiki/Collision-Flags).
     */
    CollisionFlags: CollisionFlags;

    /**
     * @event onPlayerJoin called when a new player joins the room.
     */
    onPlayerJoin(player: Player): void;

    /**
     * @event onPlayerLeave called when a player leaves the room.
     */
    onPlayerLeave(player: Player): void;

    /**
     * @event onTeamVictory called when a team wins.
     */
    onTeamVictory(scores: Scores): void;

    /**
     * @event onPlayerChat called when a player sends a chat message.
     * @details The event function can return `false` in order to filter the chat message. This
     * prevents the chat message from reaching other players in the room.
     */
    onPlayerChat(player: Player, msg: string): boolean;

    /**
     * @event onPlayerBallKick called when a player kicks the ball.
     */
    onPlayerBallKick(player: Player): void;

    /**
     * @event onTeamGoal called when a team scores a goal.
     */
    onTeamGoal(team: TeamID): void;

    /**
     * @event onGameStart called when the game starts.
     * @param byPlayer Is the player which caused the event (can be null if the event wasn't caused
     * by a player).
     */
    onGameStart(byPlayer: Player | null): void;

    /**
     * @event onGameStop called when the game stops.
     * @param byPlayer Is the player which caused the event (can be null if the event wasn't caused
     * by a player).
     */
    onGameStop(byPlayer: Player | null): void;

    /**
     * @event onPlayerAdminChange called when a player's admin rights are changed.
     * @param byPlayer Is the player which caused the event (can be null if the event wasn't caused
     * by a player).
     */
    onPlayerAdminChange(changedPlayer: Player, byPlayer: Player | null): void;

    /**
     * @event onPlayerTeamChange called when a player team is changed.
     * @param byPlayer Is the player which caused the event (can be null if the event wasn't caused
     * by a player).
     */
    onPlayerTeamChange(changedPlayer: Player, byPlayer: Player | null): void;

    /**
     * @event onPlayerKicked called when a player has been kicked from the room.
     * @details
     * This is always called after the onPlayerLeave event. @param byPlayer Is the player which
     * caused the event (can be null if the event wasn't caused by a player).
     */
    onPlayerKicked(
      kickedPlayer: Player,
      reason: string,
      ban: boolean,
      byPlayer: Player | null,
    ): void;

    /**
     * @event onPlayerActivity called once for every game tick (happens 60 times per second). This
     * is useful if you want to monitor the player and ball positions without missing any ticks.
     * @details
     * This event is not called if the game is paused or stopped.
     */
    onGameTick(): void;

    /**
     * @event onGamePause called when the game is paused.
     * @param byPlayer Is the player which caused the event (can be null if the event wasn't caused
     * by a player).
     */
    onGamePause(byPlayer: Player | null): void;

    /**
     * @event onGameUnpause called when the game is unpaused.
     * @details
     * After this event there's a timer before the game is fully unpaused, to detect when the game
     * has really resumed you can listen for the first {@link onGameTick} event after this event is
     * called.
     * @param byPlayer Is the player which caused the event (can be null if the event wasn't caused
     * by a player).
     */
    onGameUnpause(byPlayer: Player | null): void;

    /**
     * @event onPositionsReset called when the players and ball positions are reset after a goal
     * happens.
     */
    onPositionsReset(): void;

    /**
     * @event onPlayerActivity called when a player gives signs of activity, such as pressing a key.
     * @details
     * This is useful for detecting inactive players.
     */
    onPlayerActivity(player: Player): void;

    /**
     * @event onStadiumChange called when the stadium is changed.
     */
    onStadiumChange(newStadiumName: string, byPlayer: Player): void;

    /**
     * @event onRoomLink called when the room link is obtained.
     */
    onRoomLink(url: string): void;

    /**
     * @event onPlayerBallKick called when the kick rate is set.
     */
    onKickRateLimitSet(min: number, rate: number, burst: number, byPlayer: Player): void;

    /**
     * @event onPlayerBallKick called when the teams lock setting is changed.
     * @param byPlayer Is the player which caused the event (can be null if the event wasn't caused
     * by a player).
     */
    onTeamsLockChange(locked: boolean, byPlayer: Player | null): void;
  }

  /**
   * Player holds information about a player.
   */
  class Player {
    /**
     * The id of the player, each player that joins the room gets a unique id that will never
     * change.
     */
    id: number;
    /**
     * The name of the player.
     */
    name: string;
    /**
     * The team of the player.
     */
    team: TeamID;
    /**
     * Whether the player has admin rights.
     */
    admin: boolean;
    /**
     * The player's position in the field, if the player is not in the field the value will be null.
     */
    position: Position | null;
    /**
     * The player's public ID. Players can view their own ID's [here](https://www.haxball.com/playerauth).
     * @details
     * The public ID is useful to validate that a player is who he claims to be, but can't be used
     * to verify that a player isn't someone else. Which means it's useful for implementing user
     * accounts, but not useful for implementing a banning system.
     *
     * Can be null if the ID validation fails.
     *
     * This property is only set in the {@link Room.onPlayerJoin} event.
     */
    auth: string | null;
    conn: string;
  }

  /**
   * Scores holds information relevant to the current game scores.
   */
  class Scores {
    /**
     * The number of goals scored by the red team.
     */
    red: number;
    /**
     * The number of goals scored by the blue team.
     */
    blue: number;
    /**
     * The number of seconds elapsed (seconds don't advance while the game is paused).
     */
    time: number;
    /**
     * The score limit for the game.
     */
    scoreLimit: number;
    /**
     * The time limit for the game.
     */
    timeLimit: number;
  }

  /**
   * RoomConfig is passed to HBInit to configure the room, all values are optional.
   */
  interface RoomConfig {
    /**
     * The name for the room.
     */
    roomName?: string;
    /**
     * The name for the host player.
     */
    playerName?: string;
    /**
     * The password for the room (no password if omitted).
     */
    password?: string;
    /**
     * Max number of players the room accepts.
     */
    maxPlayers?: number;
    /**
     * If true the room will appear in the room list.
     */
    public?: boolean;
    /**
     * GeoLocation override for the room.
     */
    geo?: { code: string; lat: number; lon: number };
    /**
     * Can be used to skip the recaptcha by setting it to a token that can be obtained
     * [here](https://www.haxball.com/headlesstoken).
     * @details
     * These tokens will expire after a few minutes.
     */
    token?: string;
    /**
     * If set to true the room player list will be empty, the {@link playerName} setting will be
     * ignored.
     */
    noPlayer?: boolean;
  }

  /**
   * DiscProperties holds information about a game physics disc.
   */
  interface DiscProperties {
    /**
     * The x coordinate of the disc's position.
     */
    x: number;
    /**
     * The y coordinate of the disc's position.
     */
    y: number;
    /**
     * The x coordinate of the disc's speed vector.
     */
    xspeed: number;
    /**
     * The y coordinate of the disc's speed vector.
     */
    yspeed: number;
    /**
     * The x coordinate of the disc's gravity vector.
     */
    xgravity: number;
    /**
     * The y coordinate of the disc's gravity vector.
     */
    ygravity: number;
    /**
     * The disc's radius.
     */
    radius: number;
    /**
     * The disc's bounding coefficient.
     */
    bCoeff: number;
    /**
     * The inverse of disc's mass.
     */
    invMass: number;
    /**
     * The disc's damping factor.
     */
    damping: number;
    /**
     * The disc's color expressed as an integer (0xFF0000 is red, 0x00FF00 is green, 0x0000FF is
     * blue, -1 is transparent).
     */
    color: number;
    /**
     * The disc's cMask property. (Represents what groups the disc can collide with).
     */
    cMask: number;
    /**
     * The disc's collision groups.
     */
    cGroup: number;
  }

  /**
   * Collision flags are what haxball's physics uses to determine which objects collide and which
   * objects ignore each other.
   * @details
   * Each flag represents a group or category.
   */
  interface CollisionFlags {
    /**
     * This is the default collision group of the ball.
     */
    ball: number;
    /**
     * This layer is automatically added to players of the red team.
     */
    red: number;
    /**
     * This layer is automatically added to players of the blue team.
     */
    blue: number;
    /**
     * This layer represents kickoff barriers that become active during kickOff for the red team.
     */
    redKO: number;
    /**
     * This layer represents kickoff barriers that become active during kickOff for the blue team.
     */
    blueKO: number;
    /**
     * This is the default collision group for vertexes segments and planes.
     */
    wall: number;
    /**
     * Represents a set including {@link ball}, {@link red}, {@link blue}, {@link redKO},
     * {@link blueKO} and {@link wall}
     */
    all: number;
    /**
     * Objects with this flag in their {@link DiscProperties.cGroup} will become kickable by the
     * players.
     */
    kick: number;
    /**
     * Objects with this flag in their {@link DiscProperties.cGroup} will score goals if they cross
     * a goal line.
     */
    score: number;
    /**
     * Has no special meaning and can be used for any purpose.
     */
    c0: number;
    /**
     * Has no special meaning and can be used for any purpose.
     */
    c1: number;
    /**
     * Has no special meaning and can be used for any purpose.
     */
    c2: number;
    /**
     * Has no special meaning and can be used for any purpose.
     */
    c3: number;
  }

  interface Position {
    /**
     * The x coordinate of the position.
     */
    x: number;
    /**
     * The y coordinate of the position.
     */
    y: number;
  }

  export enum TextStyle {
    /**
     * Normal text style.
     */
    NORMAL = "normal",
    /**
     * Bold text style.
     */
    BOLD = "bold",
    /**
     * Italic text style.
     */
    ITALIC = "italic",
    /**
     * Small text style.
     */
    SMALL = "small",
    /**
     * Small bold text style.
     */
    SMALL_BOLD = "small-bold",
    /**
     * Small italic text style.
     */
    SMALL_ITALIC = "small-italic",
  }

  export enum TeamID {
    /**
     * Spectators team code.
     */
    SPECTATORS = 0,
    /**
     * Red team code.
     */
    RED_TEAM = 1,
    /**
     * Blue team code.
     */
    BLUE_TEAM = 2,
  }

  export enum SoundType {
    /**
     * No sound code.
     */
    NO_SOUND = 0,
    /**
     * Chat sound code.
     */
    CHAT_SOUND = 1,
    /**
     * Notification sound code.
     */
    NOTIFICATION_SOUND = 2,
  }
}
