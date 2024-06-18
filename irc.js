const tmi = require("tmi.js");

// Define configuration options
const opts = {
  identity: {
    username: "",
    password: "",
  },
  channels: [""],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("whisper", onWhisperHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!dice") {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!discord") {
    client.say(target, `${shoutDiscord()} `);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!discordw") {
    const user = {
      name: context.username,
      state: context.userstate,
    };
    try {
      client.whisper(
        user.name,
        `Hi ${
          user.name
        }, here is the discord link ${shoutDiscord()}, This is your State ${
          user.state
        }`
      );
      console.log(`* Executed ${commandName} command`);
    } catch (err) {
      console.log(`* Error sending whisper: ${err.message}`);
    }
  } else if (commandName === "!lucas") {
    client.say(target, `Lucas ist ein Arschloch`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Called every time a whisper comes in
function onWhisperHandler(from, userstate, msg, self) {
  console.log(`* Received whisper from ${from}: ${msg}`);
  const username = userstate.username;
  client.whisper(username, "I received your whisper!");
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function shoutDiscord() {
  return "https://discord.gg/ayranflow";
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
