const { login } = require("./discord");
const { greeting } = require("./greeting");
const { schedulePosts } = require("./scheduling");

async function main() {
  console.error("Attempting to connect to Discord...");
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.error("Shutting down.");
    return;
  } else {
    greeting();
  }

  console.log("Scheduling posts...");
  const schedulingSuccess = schedulePosts();
  if (!schedulingSuccess) {
    console.error("Shutting down.");
    return;
  }

  console.log("Scheduling complete.");
  console.log("Running...");
}

main();
