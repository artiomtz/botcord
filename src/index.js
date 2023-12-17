const express = require("express");
const config = require("./config");
const { login, disconnect } = require("./discord");
const { greeting } = require("./greeting");
const { schedulePosts } = require("./scheduling");
const { post } = require("./posting");

const app = express();
app.use(express.json());
app.listen(config.port, () => {
  console.log(`✅ Server is listening on port ${config.port}.`);
});

async function main() {
  console.error("☑️ Attempting to connect to Discord...");
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.error("❌ Shutting down.");
    return;
  } else {
    console.log("☑️ Posting greeting...");
    await greeting();
  }

  console.log("☑️ Scheduling posts...");
  const schedulingSuccess = schedulePosts();
  if (!schedulingSuccess) {
    console.error("❌ Shutting down.");
    return;
  }

  console.log("✅ Scheduling complete.");
  console.log("☑️ Running...");
}

app.post("/post", (req, res) => {
  try {
    const { text } = req.body;
    if (text) {
      console.log(`☑️ Received text: ${text}`);
      const postSuccess = post(text);
      if (postSuccess) {
        res.status(200).json({ message: "✅ Text posted successfully." });
      } else {
        res.status(500).json({ message: "❌ Error while posting to channel." });
      }
    } else {
      console.error("❌ Invalid request.");
      res.status(400).json({ error: "❌ Invalid request." });
    }
  } catch {
    console.error("⛔ Error processing POST request.");
    res.status(500).json({ message: "⛔ Error processing POST request." });
  }
});

app.all("/", (req, res) => {
  console.log("✅ Connected.");
  res.status(200).json({ message: "✅ Connected." });
});

process.on("SIGTERM", () => {
  disconnect();
  process.exit(0);
});

process.on("SIGINT", () => {
  disconnect();
  process.exit(0);
});

main();
