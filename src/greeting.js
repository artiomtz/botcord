const config = require("./config");
const { post } = require("./discord");

async function greeting() {
  const greetingMessages = JSON.parse(config.greetingMsgs);

  if (greetingMessages.length === 0) {
    console.log("☑️ No greeting messages.");
    return;
  }

  for (const greetingMsg of greetingMessages) {
    post(greetingMsg);
    await sleep(config.delay);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  greeting,
};
