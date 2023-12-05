require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV == "production" ? "prod" : "dev",

  discordToken: process.env.DISCORD_TOKEN,
  discordChannelName: process.env.DISCORD_CHANNEL_NAME,

  greetingMsgs: process.env.GREETING_MSGS,

  minDaysGap: process.env.MIN_DAYS_GAP,
  postProbability: process.env.POST_PROBABILITY,
  startHour: process.env.START_HOUR,
  endHour: process.env.END_HOUR,

  apis: process.env.APIS,

  delay: process.env.MESSAGE_PAUSE_DELAY,
};
