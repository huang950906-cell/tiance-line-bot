const express = require("express");
const line = require("@line/bot-sdk");
const { activityFlexMessage } = require("./flex");

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken,
});

const app = express();

// ====================
// Render 首頁
// ====================
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// ====================
// Health Check（給 UptimeRobot 用）
// ====================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "tiance-line-bot",
    time: new Date().toISOString(),
  });
});

// ====================
// LINE Webhook
// ====================
app.post("/webhook", line.middleware(config), async (req, res) => {
  try {
    await Promise.all(req.body.events.map(handleEvent));
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// ====================
// 關鍵字
// ====================
async function handleEvent(event) {
  if (event.type !== "message") return null;
  if (event.message.type !== "text") return null;

  const text = event.message.text.trim();

  // 測試
  if (text === "測試") {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: "天策官方賴連線成功！",
        },
      ],
    });
  }

  // 活動登記
  if (text === "活動登記") {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        activityFlexMessage,
        {
          type: "text",
          text:
`會員帳號：
優惠選項：

稍等客服幫您查詢是否符合領取資格`,
        },
      ],
    });
  }

  return null;
}

// ====================
// 啟動
// ====================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`天策 LINE Bot 已啟動，Port：${PORT}`);
});
