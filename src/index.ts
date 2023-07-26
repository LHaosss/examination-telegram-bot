import { Bot, session } from "grammy"
import { createConversation, conversations } from "@grammyjs/conversations"
import MainMenuCreator from "./menu"
import talk, { type MyContext, SessionData } from "./talk"
import "dotenv/config"
import { freeStorage } from "@grammyjs/storage-free"

// create a bot.
const bot = new Bot<MyContext>(process.env.BOT_TOKEN)

// register session in bot
bot.use(
  session({
    storage: freeStorage<SessionData>(bot.token),
    initial: () => ({ name: "", address: "" }),
  }),
)

// register conversations plugin in bot
bot.use(conversations())

// register conversation in bot
bot.use(createConversation(talk, "talk"))

// create mainMenu
const mainMenu = MainMenuCreator()

// register menu in bot
bot.use(mainMenu)

// set replay content
bot.command("start", async (ctx) => {
  await ctx.reply("Check out this menu:", {
    reply_markup: mainMenu,
  })
})

bot.start()
