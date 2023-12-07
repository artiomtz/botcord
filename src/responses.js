const config = require("./config");
const { post, sleep } = require("./posting");

function setResponses(client) {
  client.on("messageCreate", async (msg) => {
    if (msg.author.bot) {
      return;
    }

    if (Math.random() > config.replyProbability) {
      return;
    }
    const user = msg.author.username;
    const content = msg.content;
    const mentions = msg.mentions;
    await sleep(config.delay);

    if (mentions.everyone) {
      msg.reply(config.replyMention);
      return;
    }

    if (
      JSON.parse(config.keyWords).some((keyword) => content.includes(keyword))
    ) {
      replies = JSON.parse(config.keyWordsReply);
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      post(randomReply);
      return;
    }

    const friend = JSON.parse(config.friends).find((f) => f.name === user);
    if (friend) {
      const randomReply =
        friend.replies[Math.floor(Math.random() * friend.replies.length)];
      post(randomReply);
      return;
    }
  });

  client.on("voiceStateUpdate", async (oldState, newState) => {
    if (oldState.channelId !== newState.channelId) {
      const member = newState.member;
      const timestamp = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      if (newState.channelId) {
        console.log(
          `▶️ ${member.user.tag} joined voice channel '${newState.channel.name}' at ${timestamp}`
        );

        if (Math.random() > config.replyProbability) {
          return;
        }
        const membersCount = newState.channel.members.size;

        if (config.env === "dev" || membersCount > 1) {
          replies = JSON.parse(config.voiceChatReply);
          const randomVoiceChatReply =
            replies[Math.floor(Math.random() * replies.length)];
          await sleep(config.delay);
          post(randomVoiceChatReply);
        }
      } else {
        console.log(
          `▶️ ${member.user.tag} left voice channel '${oldState.channel.name}' at ${timestamp}`
        );
      }
    }
  });
}

module.exports = {
  setResponses,
};
