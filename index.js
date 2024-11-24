const { stickers, token } = require("./constants");
const { gameOptions, gameOptionsPlayAgain } = require("./options");

const BotApi = require("node-telegram-bot-api");
const bot = new BotApi(token, { polling: true });
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

let attempts = 0;
chats = {};

const playGame = async (chatId) => {
  attempts = 0;
  await bot.sendMessage(chatId, "Try to guess the number in three attempts.");
  const randomNumber = Math.floor(Math.random() * 10) + "";
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Please enter your number from 0 to 10", gameOptions);
};

function startBot() {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    if (message === "/start") {
      await bot.sendSticker(chatId, stickers.botStart);
      return bot.sendMessage(chatId, "Hello, I'm BotAnika. Would you want to play with me? If - yes, enter the '/game'");
    }
    if (message === "/game") {
      playGame(chatId);
    }
    if (message === "/help") {
      await bot.sendSticker(chatId, stickers.botHelp);
      return bot.sendMessage(chatId, "No,no,no. I don't have time for it :) Help yourself!");
    }
  });
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    const randomNumber = chats[chatId] ? chats[chatId] : "0";

    if (data === "/playAgain") {
      return playGame(chatId);
    }

    await bot.sendMessage(chatId, `Your ${++attempts} attempts and number is ${data}`, gameOptions);
    if (data === randomNumber) {
      await bot.sendSticker(chatId, stickers.botWin);
      return bot.sendMessage(chatId, "Congratulations! You've guessed the number correctly!", gameOptionsPlayAgain);
    }
    if (chats[chatId] < data) {
      await bot.sendMessage(chatId, "Your guess is too high!");
    }
    if (chats[chatId] > data) {
      await bot.sendMessage(chatId, "Your guess is too low!");
    }
    if (attempts === 3) {
      await bot.sendSticker(chatId, stickers.botFell);
      return bot.sendMessage(chatId, "Sorry, you've exceeded the number of attempts. Game over!", gameOptionsPlayAgain);
    }
    if (data === "/") return bot.sendMessage(chatId, "Please enter your number from 0 to 10", gameOptions);
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

const queryStructure = {
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
