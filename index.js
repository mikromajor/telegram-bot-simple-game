const BotApi = require("node-telegram-bot-api");

const token =
  "7458656190:AAEuiDB5Rh78hsUcACRJxEUM44tDYJUQhLo";

const bot = new BotApi(token, { polling: true });

bot.setMyCommands([
  {
    command: "/go",
    description: "Start communicating with bot",
  },
  { command: "/inf", description: "information" },
  { command: "/help", description: "help" },
]);

bot.on("message", async (msg) => {
  console.log("", msg);
  const chatId = msg.chat.id;
  const message = msg.text;
  await bot.sendSticker(
    chatId,
    "https://cdn.tlgrm.ru/stickers/88d/9dc/88d9dc34-0a9d-4de5-b94e-3f34adacece5/2.webp"
  );
  if (message === "/start") {
    await bot.sendMessage(
      chatId,
      "Welcome, I'm bot T-1000: " + message
    );
  }
});

const msgStructure = {
  message_id: 10,
  from: {
    id: 852623084,
    is_bot: false,
    first_name: "Alex",
    last_name: "Solianyk",
    username: "AlexSolianyk",
    language_code: "uk",
  },
  chat: {
    id: 852623084,
    first_name: "Alex",
    last_name: "Solianyk",
    username: "AlexSolianyk",
    type: "private",
  },
  date: 1732126856,
  text: "/start",
  entities: [{ offset: 0, length: 6, type: "bot_command" }],
};
