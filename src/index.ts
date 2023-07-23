import { Bot } from "grammy"
import { Menu } from "@grammyjs/menu"

// 创建一个 bot。
const bot = new Bot("6046914308:AAFn6o-EXAGOHkHp4zA1JgjSJ2Ux9WWksjQ")

// 创建一个简单的菜单。
const menu = new Menu("my-menu-identifier")
  .text("Add", (ctx) => ctx.reply("You pressed Add!"))
  .text("Switch", (ctx) => ctx.reply("You pressed Switch!"))
  .row()
  .text("Buy 0.01", (ctx) => ctx.reply("You pressed Buy 0.01!"))
  .text("Buy 0.05", (ctx) => ctx.reply("You pressed Buy 0.05!"))

// 使其具有互动性。
bot.use(menu)

bot.command("start", async (ctx) => {
  // 发送菜单。
  await ctx.reply("Check out this menu:", { reply_markup: menu })
})

bot.start()
