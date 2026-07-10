const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = line.LineBotClient.fromChannelAccessToken({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();

// 首頁測試
app.get("/", (req, res) => {
  res.send("天策 LINE Bot 運作中");
});

// LINE Webhook
app.post("/webhook", line.middleware(config), async (req, res) => {
  try {
    await Promise.all(req.body.events.map(handleEvent));
    res.status(200).end();
  } catch (error) {
    console.error("Webhook 發生錯誤：", error);
    res.status(500).end();
  }
});

async function handleEvent(event) {
  // 目前只處理文字訊息
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }

  const userMessage = event.message.text.trim();



  return null;
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`天策 LINE Bot 已啟動，Port：${port}`);
});
