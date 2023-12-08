require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV == "production" ? "prod" : "dev",
  port: process.env.APP_PORT,

  discordToken: process.env.DISCORD_TOKEN,
  discordChannelName: process.env.DISCORD_CHANNEL_NAME,

  cdnCloudName: process.env.CDN_CLOUD_NAME,
  cdnApiKey: process.env.CDN_API_KEY,
  cdnApiSecret: process.env.CDN_API_SECRET,
  cdnDir: process.env.CDN_DIR,
  cdnNumImages: process.env.CDN_NUM_IMAGES,
  cdnLocalDir: process.env.CDN_LOCAL_DIR,
  cdnPhotoName: process.env.CDN_PHOTO_NAME,

  apis: process.env.APIS,
  cdnUrl: process.env.CDN_URL,
  apiOverCdn: process.env.API_OVER_CDN_PROBABILITY,

  notificationKey: process.env.NOTIFICATION_KEY,
  notificationEmail: process.env.NOTIFICATION_EMAIL,
  notificationSubject: process.env.NOTIFICATION_SUBJECT,

  minDaysGap: process.env.MIN_DAYS_GAP,
  postProbability: process.env.POST_PROBABILITY,
  startHour: process.env.START_HOUR,
  endHour: process.env.END_HOUR,

  greetingMsgs: process.env.GREETING_MSGS,
  friends: process.env.FRIENDS,
  keyWords: process.env.KEY_WORDS,
  keyWordsReply: process.env.KEY_WORDS_REPLY,
  voiceChatReply: process.env.VOICE_CHAT_REPLAY,
  replyProbability: process.env.REPLY_PROBABILITY,
  replyMention: process.env.REPLY_MENTION,
  delay: process.env.POST_DELAY,
};
