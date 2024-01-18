declare function HBInit(roomConfig: RoomConfig): Room;

interface RoomConfig {
  roomName?: string;
  playerName?: string;
  password?: string;
  maxPlayers?: number;
  public?: boolean;
  geo?: { code: string; lat: number; lon: number };
  token?: string;
  noPlayer?: boolean;
}

declare class Room {
  sendChat(msg: string, targetId: number): void;
  setPlayerAdmin(playerId: number, admin: boolean): void;
  setPlayerTeam(playerId: number, team: number): void;
  kickPlayer(playerId: number, reason: string, ban: boolean): void;
  clearBan(playerId: number): void;
  clearBans(): void;
  setScoreLimit(limit: number): void;
  setTimeLimit(limitInMinutes: number): void;
  setCustomStadium(stadiumFileContents: string): void;
  setDefaultStadium(stadiumName: string): void;
  setTeamsLock(locked: boolean): void;
  setTeamColors(
    team: TeamID,
    angle: number,
    textColor: number,
    colors: readonly number[],
  ): void;
  startGame(): void;
  stopGame(): void;
  pauseGame(pauseState: boolean): void;
  getPlayer(playerId: number): Player;
  getPlayerList(): Player[];
  getScores(): Scores;
  getBallPosition(): { x: number; y: number };
  startRecording(): void;
  stopRecording(): Uint8Array;
  setPassword(pass: string): void;
  setRequireCaptcha(required: boolean): void;
  reorderPlayers(playerIdList: readonly number[], moveToTop: boolean): void;
  sendAnnouncement(
    msg: string,
    targetId?: number,
    color?: number,
    style?: string,
    sound?: number,
  ): void;
  setKickRateLimit(min: number, rate: number, burst: number): void;
  setPlayerAvatar(playerId: number, avatar: string): void;
  setDiscProperties(
    discIndex: number,
    properties: Partial<DiscProperties>,
  ): void;
  getDiscProperties(discIndex: number): DiscProperties;
  setPlayerDiscProperties(
    playerId: number,
    properties: Partial<DiscProperties>,
  ): void;
  getPlayerDiscProperties(playerId: number): DiscProperties;
  getDiscCount(): number;
  CollisionFlags: CollisionFlags;
  onPlayerJoin(player: Player): void;
  onPlayerLeave(player: Player): void;
  onTeamVictory(scores: Scores): void;
  onPlayerChat(player: Player, msg: string): boolean;
  onPlayerBallKick(player: Player): void;
  onTeamGoal(team: TeamID): void;
  onGameStart(byPlayer: Player): void;
  onGameStop(byPlayer: Player): void;
  onPlayerAdminChange(
    changedPlayer: Player,
    byPlayer: Player,
  ): void;
  onPlayerTeamChange(changedPlayer: Player, byPlayer: Player): void;
  onPlayerKicked(
    kickedPlayer: Player,
    reason: string,
    ban: boolean,
    byPlayer: Player,
  ): void;
  onGameTick(): void;
  onGamePause(byPlayer: Player): void;
  onGameUnpause(byPlayer: Player): void;
  onPositionsReset(): void;
  onPlayerActivity(player: Player): void;
  onStadiumChange(newStadiumName: string, byPlayer: Player): void;
  onRoomLink(url: string): void;
  onKickRateLimitSet(
    min: number,
    rate: number,
    burst: number,
    byPlayer: Player,
  ): void;
}

declare class Player {
  id: number;
  name: string;
  team: TeamID;
  admin: boolean;
  position: { x: number; y: number };
  auth: string;
  conn: string;
}

declare class Scores {
  red: number;
  blue: number;
  time: number;
  scoreLimit: number;
  timeLimit: number;
}

type TeamID = 0 | 1 | 2;

declare class DiscProperties {
  x: number;
  y: number;
  xspeed: number;
  yspeed: number;
  xgravity: number;
  ygravity: number;
  radius: number;
  bCoeff: number;
  invMass: number;
  damping: number;
  color: number;
  cMask: number;
  cGroup: number;
}

interface CollisionFlags {
  ball: number;
  red: number;
  blue: number;
  redKO: number;
  blueKO: number;
  wall: number;
  all: number;
  kick: number;
  score: number;
  c0: number;
  c1: number;
  c2: number;
  c3: number;
}
