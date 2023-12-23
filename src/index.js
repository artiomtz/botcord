const express = require("express");
const config = require("./config");
const { login, disconnect } = require("./discord");
const { fetchData } = require("./api");
const { post, shouldPost } = require("./posting");

const app = express();
app.listen(config.port, () => {
  console.log(`✅ Server is listening on port ${config.port}.`);
});

app.use(express.json());
app.use((req, res, next) => {
  const allowedUserAgent = JSON.parse(config.allowedAgents);
  if (
    !req.headers[allowedUserAgent.field] ||
    !req.headers[allowedUserAgent.field].includes(allowedUserAgent.value)
  ) {
    console.error("⛔ Unauthorized access.");
    return res.status(401).json({ error: "⛔ Unauthorized access." });
  }
  next();
});

async function setup() {
  console.log("☑️ Connecting to Discord...");
  const loginSuccess = await login();

  if (!loginSuccess) {
    console.error("❌ Couldn't connect to Discord.");
    return;
  }
  console.log("☑️ Running...");
}

const checkSecurityKey = (req, res, next) => {
  if (req.headers[config.postHeader] === config.postKey) {
    next();
  } else {
    console.error("⛔ Unauthorized request.");
    res.status(401).json({ error: "⛔ Unauthorized request." });
  }
};

app.post("/post", checkSecurityKey, (req, res) => {
  try {
    const { text } = req.body;
    if (text) {
      console.log(`☑️ Received text: ${text}`);
      const postSuccess = post(text);
      if (postSuccess) {
        res.status(200).json({ message: "✅ Text posted successfully." });
      } else {
        res.status(500).json({ error: "❌ Error while posting to channel." });
      }
    } else {
      console.error("❌ Invalid request.");
      res.status(400).json({ error: "❌ Invalid request." });
    }
  } catch {
    console.error("⛔ Error processing POST request.");
    res.status(500).json({ error: "⛔ Error processing POST request." });
  }
});

app.all("/", async (req, res) => {
  console.log("✅ Received request.");
  const doPost = await shouldPost();

  if (doPost) {
    const postData = await fetchData();
    if (!postData) {
      console.error("⛔ Couldn't fetch posts.");
      res.status(500).json({ error: "⛔ Couldn't fetch posts." });
      return;
    }

    const postSuccess = post(postData);
    if (postSuccess) {
      console.log("✅ Request processed.");
      res.status(200).json({ message: "✅ Request processed." });
    } else {
      console.error("⛔ Request failed.");
      res.status(500).json({ error: "⛔ Request failed." });
    }
  } else {
    console.log("☑️ Not posting.");
    res.status(200).json({ message: "☑️ Not posting." });
  }
});

process.on("SIGTERM", () => {
  disconnect();
  process.exit(0);
});

process.on("SIGINT", () => {
  disconnect();
  process.exit(0);
});

setup();
