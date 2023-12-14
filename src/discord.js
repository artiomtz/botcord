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
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

async function login() {
  try {
    await client.login(config.discordToken);
    return new Promise((resolve) => {
      client.once("ready", (c) => {
        console.log(`✅ Logged in as ${c.user.tag}`);

        const channel = findChannelByName(client, config.discordChannelName);
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

async function disconnect() {
  console.log("☑️ Exiting...");

  try {
    await client.destroy();
    console.log("✅ Shutting Down...");
  } catch (error) {
    console.error(`⛔ Error during shutdown.`);
  }
}

module.exports = {
  login,
  disconnect,
};
