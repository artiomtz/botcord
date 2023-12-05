const cron = require("node-cron");
const config = require("./config");
const { fetchData } = require("./api");
const { post } = require("./posting");
let lastPostDate = null;

function schedulePosts() {
  const postingCycle =
    parseInt(config.minDaysGap) + Math.ceil(1 / config.postProbability);
  console.log(
    `✅ Scheduling to run roughly every ${config.minDaysGap} to ${postingCycle} days, around ${config.startHour}:00 to ${config.endHour}:00.`
  );

  let postingInterval = `0 ${config.startHour} * * *`;
  if (config.env === "dev") {
    postingInterval = `* * * * *`;
  }

  try {
    cron.schedule(postingInterval, () => {
      if (shouldPost()) {
        const randomDelay = getRandomDelay();
        console.log(`✅ Posting in ${randomDelay / (1000 * 60)} minutes...`);
        setTimeout(async () => {
          const data = await fetchData();
          post(data);
          lastPostDate = new Date();
        }, randomDelay);
      } else {
        console.log("☑️ Not posting today.");
      }
    });
    return true;
  } catch (error) {
    console.error("⛔ Couldn't schedule posts.");
    return false;
  }
}

function shouldPost() {
  if (!lastPostDate || config.env === "dev") {
    return true;
  }
  const currentDate = new Date();
  const daysDifference = (currentDate - lastPostDate) / (1000 * 60 * 60 * 24);

  return (
    daysDifference >= config.minDaysGap &&
    Math.random() < config.postProbability
  );
}

function getRandomDelay() {
  if (config.env === "dev") {
    return 0;
  }
  return Math.random() * (config.endHour - config.startHour) * 60 * 60 * 1000;
}

module.exports = {
  schedulePosts,
};
