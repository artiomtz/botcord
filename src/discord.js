const config = require("./config");
// const { setResponses } = require("./responses");
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

async function login() {
  try {
    await client.login(config.discordToken);
    return new Promise((resolve) => {
      client.once("ready", (c) => {
        console.log(`Logged in as ${c.user.tag}`);

        const channel = findChannelByName(config.discordChannelName);
        if (channel) {
          // setResponses(client);
          resolve(true);
        } else {
          console.error(`Channel "${config.discordChannelName}" not found.`);
          resolve(false);
        }
      });
    });
  } catch {
    console.error("Couldn't connect to Discord.");
    return false;
  }
}

function findChannelByName(channelName) {
  return client.channels.cache.find((ch) => ch.name === channelName);
}

function post(msg) {
  try {
    const channel = findChannelByName(config.discordChannelName);
    channel.send(String(msg));
  } catch {
    console.error("Error while posting to channel.");
  }
}

module.exports = {
  login,
  post,
};
