const BotApi = require("node-telegram-bot-api");

const token =
  "7458656190:AAEuiDB5Rh78hsUcACRJxEUM44tDYJUQhLo";

const bot = new BotApi(token, { polling: true });

bot.on("message", (msg) => {
  console.log("", msg);
  const chatId = msg.chat.id;
  const message = msg.text;
  bot.sendMessage(
    chatId,
    "T-1000 send the message: " + message
  );
});
// console.log("idex.js started", bot);
