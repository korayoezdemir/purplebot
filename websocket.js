const WebSocket = require("ws");

const oAuth = "";
const nick = "";
const channel = "";
const socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

socket.addEventListener("open", () => {
  socket.send(`PASS oauth:${oAuth}`);
  socket.send(`NICK ${nick}`);
  socket.send(`JOIN #${channel}`);
});

socket.addEventListener("message", (event) => {
  console.log(event.data);
});
