"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const conversations_1 = require("@grammyjs/conversations");
const menu_1 = __importDefault(require("./menu"));
const talk_1 = __importDefault(require("./talk"));
require("dotenv/config");
// create a bot.
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
// register session in bot
bot.use((0, grammy_1.session)({
    initial() {
        return {};
    },
}));
// register conversations plugin in bot
bot.use((0, conversations_1.conversations)());
// register conversation in bot
bot.use((0, conversations_1.createConversation)(talk_1.default, "talk"));
// create mainMenu
const mainMenu = (0, menu_1.default)();
// register menu in bot
bot.use(mainMenu);
// set replay content
bot.command("start", async (ctx) => {
    await ctx.reply("Check out this menu:", {
        reply_markup: mainMenu,
    });
});
bot.start();
