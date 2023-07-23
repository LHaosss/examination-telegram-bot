import { Bot, session } from "grammy"
import { createConversation, conversations } from "@grammyjs/conversations"
import MainMenuCreator from "./menu"
import talk, { type MyContext } from "./talk"

// create a bot.
const bot = new Bot<MyContext>("6046914308:AAFn6o-EXAGOHkHp4zA1JgjSJ2Ux9WWksjQ")

// register session in bot
bot.use(
  session({
    initial() {
      return {}
    },
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
