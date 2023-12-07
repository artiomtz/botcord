require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV == "production" ? "prod" : "dev",
  port: process.env.APP_PORT,

  discordToken: process.env.DISCORD_TOKEN,
  discordChannelName: process.env.DISCORD_CHANNEL_NAME,

  greetingMsgs: process.env.GREETING_MSGS,

  apis: process.env.APIS,

  minDaysGap: process.env.MIN_DAYS_GAP,
  postProbability: process.env.POST_PROBABILITY,
  startHour: process.env.START_HOUR,
  endHour: process.env.END_HOUR,

  friends: process.env.FRIENDS,
  keyWords: process.env.KEY_WORDS,
  keyWordsReply: process.env.KEY_WORDS_REPLY,
  voiceChatReply: process.env.VOICE_CHAT_REPLAY,
  replyProbability: process.env.REPLY_PROBABILITY,
  replyMention: process.env.REPLY_MENTION,
  delay: process.env.POST_DELAY,
};
