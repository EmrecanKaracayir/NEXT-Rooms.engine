/* ################################# States ################################# */

const State = { PLAYING: 0, PAUSED: 1, STOPPED: 2 };

/* ############################### Initialize ############################### */

const roomConfig = {
  roomName: "UEHA SuperLeague",
  maxPlayers: 16,
  public: false,
  noPlayer: true,
  token: "thr1.AAAAAGWoMzGLlP-r8nzx0Q.q2vC-aCPVK0",
};

const room = HBInit(roomConfig);

room.setDefaultStadium("Small");
room.setScoreLimit(5);
room.setTimeLimit(0);

let gameState = State.STOPPED;

/* ################################# Events ################################# */

room.onPlayerJoin = (player) => {
  room.sendAnnouncement(`Welcome ${player.name}!`);
  updateAdmins();
};

room.onPlayerLeave = (player) => {
  room.sendAnnouncement(`${player.name} has left the room.`);
  updateAdmins();
};

room.onPlayerChat = (player, message) => {
  if (player.admin) {
    if (message.startsWith("!")) {
      const command = message.substr(1);
      switch (command) {
        case "p" || "pause":
          if (gameState !== State.STOPPED) {
            if (gameState !== State.PAUSED) {
              room.pauseGame(true);
            } else {
              room.pauseGame(false);
            }
          }
          break;
        default:
          room.sendAnnouncement(
            "Room: Unknown command!",
            player.id,
            0xff0000,
            "bold",
            2
          );
          break;
      }
      return false;
    }
  }
};

room.onGameStart = (_) => {
  gameState = State.PLAYING;
};

room.onGameStop = (_) => {
  gameState = State.STOPPED;
};

room.onGamePause = (_) => {
  gameState = State.PAUSED;
};

room.onGameUnpause = (_) => {
  gameState = State.PLAYING;
};

/* ############################### Functions ################################ */

function updateAdmins() {
  const players = room.getPlayerList();
  if (players.length == 0) return;
  const emrecan = players.find((player) => player.name == "Emrecan");
  if (emrecan) {
    room.setPlayerAdmin(emrecan.id, true);
  }
}
