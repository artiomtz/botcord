const config = require("./config");
let channel = null;

function findChannelByName(client, channelName) {
  channel = client.channels.cache.find((ch) => ch.name === channelName);
  return channel;
}

function post(content) {
  try {
    content = typeof content === "number" ? String(content) : content;
    channel.send(content);
    console.log(`✅ Message posted.`);
    return true;
  } catch {
    console.error("⛔ Error while posting to channel.");
    return false;
  }
}

function shouldPost() {
  if (config.env === "dev") {
    return true;
  }
  const currentHour = new Date().getHours();

  if (currentHour >= config.startHour && currentHour < config.endHour) {
    return Math.random() < config.postProbability;
  }
  return false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  post,
  sleep,
  shouldPost,
  findChannelByName,
};
