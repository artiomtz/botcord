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
    console.log("✅ Message posted.");
    return true;
  } catch {
    console.error("⛔ Error while posting to channel.");
    return false;
  }
}

async function shouldPost() {
  if (config.env === "dev") {
    return true;
  }

  const currentHour = parseInt(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      hour12: false,
      ...{ timeZone: "America/New_York" },
    })
  );

  if (currentHour < config.startHour || currentHour > config.endHour) {
    console.log(`☑️ Not posting at ${currentHour} hours.`);
    return false;
  }

  const dayGap = await postGap();
  if (!dayGap) {
    return false;
  }

  const randomProbability = Math.random();
  const shareProbability =
    config.postProbability *
    (config.pingFreq / (config.endHour - config.startHour));
  console.log(
    `☑️ Comparing probability ${randomProbability.toFixed(
      3
    )} < ${shareProbability.toFixed(3)}`
  );
  return randomProbability < shareProbability;
}

async function postGap() {
  try {
    const messages = await channel.messages.fetch({ limit: 10 });
    const lastMessage = messages.find((msg) => msg.author.bot);

    if (lastMessage) {
      const currentDate = new Date();
      const lastMessageTimestamp = lastMessage.createdAt;
      const currentDateFormatted = currentDate.toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const lastMessageDateFormatted = lastMessageTimestamp.toLocaleString(
        "en-US",
        {
          timeZone: "America/New_York",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
      console.log(
        `☑️ Comparing dates ${currentDateFormatted} vs ${lastMessageDateFormatted}.`
      );
      return currentDateFormatted !== lastMessageDateFormatted;
    } else {
      console.log("☑️ No previous bot messages.");
      return true;
    }
  } catch {
    console.error("❌ Error fetching previous messages.");
    return false;
  }
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
