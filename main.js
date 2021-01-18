const fs = require("fs");
const line = require("@line/bot-sdk");
// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

// create LINE SDK client
const client = new line.Client(config);
const createRichMenu = async () => {
  let id = await client.createRichMenu({
    size: {
      width: 2500,
      height: 1686
    },
    selected: false,
    name: "richmenu-2",
    chatBarText: "選單2",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 833,
          height: 843
        },
        action: {
          type: "message",
          label: "文字",
          text: "Hello, iBot!2"
        }
      },
      {
        bounds: {
          x: 833,
          y: 0,
          width: 833,
          height: 843
        },
        action: {
          type: "uri",
          label: "網址",
          uri: "https://ithelp.ithome.com.tw/users/20106865/ironman/2732"
        }
      },
      {
        bounds: {
          x: 1666,
          y: 0,
          width: 833,
          height: 843
        },
        action: {
          type: "postback",
          label: "選單2",
          data: "action=changeMenu2"
        }
      }
    ]
  });
  console.log(id);
  let r = await client.setRichMenuImage(
    id,
    fs.createReadStream("./linerichmenu.jpg")
  );
  // console.log(r);
  client.setDefaultRichMenu(id);
};
createRichMenu();

const main = async () => {
  // client.setDefaultRichMenu("richmenu-cc38c4dcccb6c79c31a34cf064862c02");
};
// main();
