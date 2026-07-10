const express = require("express");
const line = require("@line/bot-sdk");
const { activityFlexMessage } = require("./flex");

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
  // 只處理文字訊息
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }

  const userMessage = event.message.text.trim();

  // 測試
  if (userMessage === "測試") {
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
  if (userMessage === "活動登記") {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        activityFlexMessage,
        {
          type: "text",
          text: `會員帳號：
優惠選項：

稍等客服幫您查詢是否符合領取資格`,
        },
      ],
    });
  }

  return null;
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`天策 LINE Bot 已啟動，Port：${port}`);
});
