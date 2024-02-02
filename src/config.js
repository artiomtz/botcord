require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV == "development" ? "dev" : "prod",
  port: process.env.PORT,

  discordToken: process.env.DISCORD_TOKEN,
  discordChannelName: process.env.DISCORD_CHANNEL_NAME,

  cdnCloudName: process.env.CDN_CLOUD_NAME,
  cdnApiKey: process.env.CDN_API_KEY,
  cdnApiSecret: process.env.CDN_API_SECRET,
  cdnDir: process.env.CDN_DIR,
  cdnNumImages: process.env.CDN_NUM_IMAGES,
  cdnLocalDir: process.env.CDN_LOCAL_DIR,
  cdnPhotoName: process.env.CDN_PHOTO_NAME,

  postHeader: process.env.POST_SECURITY_HEADER,
  postKey: process.env.POST_SECURITY_KEY,

  apiPosts: process.env.POSTS,
  imagesPosts: process.env.IMAGES,
  picOverCdn: process.env.PIC_OVER_CDN,
  apiOverImage: process.env.API_OVER_IMAGE,

  notificationKey: process.env.NOTIFICATION_KEY,
  notificationEmail: process.env.NOTIFICATION_EMAIL,
  notificationSubject: process.env.NOTIFICATION_SUBJECT,

  pingFreq: process.env.PING_FREQ,
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

  allowedAgents: process.env.ALLOWED_AGENTS,
};
