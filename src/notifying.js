const sgMail = require("@sendgrid/mail");
const config = require("./config");

sgMail.setApiKey(config.notificationKey);

function notify(msg, members) {
  console.log("☑️ Sending a notification...");
  const title = members ? "Session Started" : "Session Ended";

  const content = {
    to: config.notificationEmail,
    from: config.notificationEmail,
    subject: config.notificationSubject,
    text: msg,
    html: `
      <html>
        <body>
          <h2>${title}</h2>
          <h3>${msg}</h3>
          ${members ? `<h4>${members}</h4>` : ``}
        </body>
      </html>
    `,
  };

  sgMail
    .send(content)
    .then(() => {
      console.log("✅ Notification sent.");
    })
    .catch(() => {
      console.error("⛔ Couldn't notify.");
    });
}

module.exports = {
  notify,
};
