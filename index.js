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

// 我要開版
if (userMessage === "我要開版") {
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: `信用審核資料如下👇

1.身分證正反面（可浮水印）

2.存簿封面（可浮水印）

3.資料填寫

姓名：
電話：
現居地址：
戶籍地址：
工作：
每個月薪資：
緊急聯絡人1：
緊急聯絡人2：

畢竟您要開版賺錢，我要會員人數
資料保密，沒必要造成公司困擾謝謝

以上資料填寫後回傳，待客服驗證`,
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
