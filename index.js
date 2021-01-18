"use strict";

const line = require("@line/bot-sdk");
const express = require("express");

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.get(`/`, (req, rep) => {
  rep.end(`hello go`);
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
async function handleEvent(event) {
  //  await client.linkRichMenuToUser(
  //   "Uc511a6476d2665ee223aacaf3894277d",
  //   "richmenu-824b54733cae096554053845afb7d27b"
  // );
  let r = await client.unlinkRichMenuFromUser(
    "Uc511a6476d2665ee223aacaf3894277d"
  );
  console.log(r);
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  console.log(event.source.userId);
  // create a echoing text message
  const echo = { type: "text", text: event.message.text + "aaa" };
  // let r = await client.getDefaultRichMenuId();
  // console.log(r);
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
