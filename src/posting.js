let channel = null;

function findChannelByName(client, channelName) {
  channel = client.channels.cache.find((ch) => ch.name === channelName);
  return channel;
}

function post(msg) {
  try {
    channel.send(String(msg));
    console.log(`✅ Message posted.`);
  } catch {
    console.error("⛔ Error while posting to channel.");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  post,
  sleep,
  findChannelByName,
};
