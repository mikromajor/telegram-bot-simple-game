const BotApi = require("node-telegram-bot-api");

const token = "7568259988:AAG3Z0VFQeFPDcdfshzsavnSJ8sZHKVUOYc";

const bot = new BotApi(token, { polling: true });

chats = {};
const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  }),
};

bot.setMyCommands([
  {
    command: "/start",
    description: "Start communicating with bot",
  },
  {
    command: "/help",
    description: "help information about bot",
  },
  {
    command: "/game",
    description: "Simple communication game - Guess the number",
  },
]);

function startBot() {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    if (message === "/start") {
      await bot.sendSticker(chatId, "https://cdn.tlgrm.ru/stickers/88d/9dc/88d9dc34-0a9d-4de5-b94e-3f34adacece5/2.webp");
      return bot.sendMessage(chatId, "Hello, I'm BotAnika. Would you want to play with me? If - yes, enter the '/game'");
    }
    if (message === "/game") {
      await bot.sendMessage(chatId, "Try to guess the number in three attempts.");
      const randomNumber = Math.floor(Math.random() * 10) + "";
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, "Please enter your number from 0 to 10", gameOptions);
    }
    return bot.sendMessage(chatId, "I do not understand this message, try again.");
  });
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    const randomNumber = chats[chatId] ? chats[chatId] : "0";
    await bot.sendMessage(chatId, `Your number is ${data}`);
    console.log("data", data, "  randomNumber", randomNumber);
    console.log("data", data, typeof data, "  randomNumber", randomNumber, typeof randomNumber);

    if (data === randomNumber) {
      return bot.sendMessage(chatId, "Congratulations! You've guessed the number correctly!");
    }
    if (chats[chatId] < data) {
      await bot.sendMessage(chatId, "Your guess is too high!");
    }
    if (chats[chatId] > data) {
      await bot.sendMessage(chatId, "Your guess is too low!");
    }

    return bot.sendMessage(chatId, "Please enter your number from 0 to 10", gameOptions);
  });
}

startBot();

//----------------------------------------------------------------
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

const queryStucture = {
  id: "3661988262492355898",
  from: {
    id: 852623084,
    is_bot: false,
    first_name: "Alex",
    last_name: "Solianyk",
    username: "AlexSolianyk",
    language_code: "uk",
  },
  message: {
    message_id: 67,
    from: {
      id: 7458656190,
      is_bot: true,
      first_name: "mikromajor_curs",
      username: "SAS_T_1000_bot",
    },
    chat: {
      id: 852623084,
      first_name: "Alex",
      last_name: "Solianyk",
      username: "AlexSolianyk",
      type: "private",
    },
    date: 1732367659,
    text: "Please enter your number from 0 to 10",
    reply_markup: { inline_keyboard: [Array] },
  },
  chat_instance: "-3872188528998060335",
  data: "1",
};
