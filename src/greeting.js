const config = require("./config");
const { post, sleep } = require("./posting");

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

module.exports = {
  greeting,
};
