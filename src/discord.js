const { Client, IntentsBitField } = require("discord.js");
const config = require("./config");
const { setResponses } = require("./responses");
const { findChannelByName } = require("./posting");

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
        console.log(`✅ Logged in as ${c.user.tag}`);

        const channel = findChannelByName(client, config.discordChannelName);
        console.log(`...... ${channel}`);
        if (channel) {
          setResponses(client);
          resolve(true);
        } else {
          console.error(`❌ Channel "${config.discordChannelName}" not found.`);
          resolve(false);
        }
      });
    });
  } catch {
    console.error("⛔ Couldn't connect to Discord.");
    return false;
  }
}

module.exports = {
  login,
};
