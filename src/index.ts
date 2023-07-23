import { Bot } from "grammy"
import { Menu } from "@grammyjs/menu"

// 创建一个 bot。
const bot = new Bot("6046914308:AAFn6o-EXAGOHkHp4zA1JgjSJ2Ux9WWksjQ")

// switch菜单栏
const switchMenu = new Menu("switch-menu")
  .text("Add", (ctx) => ctx.reply("You pressed Add!"))
  .back("Switch")
  .row()
  .text("Sell 1", (ctx) => ctx.reply("You pressed Sell 1!"))
  .text("Sell 2", (ctx) => ctx.reply("You pressed Sell 2!"))
  .text("Sell 3", (ctx) => ctx.reply("You pressed Sell 3!"))

// main菜单栏
const mainMenu = new Menu("root-menu")
  .text("Add", (ctx) => ctx.reply("You pressed Add!"))
  .submenu("Switch", "switch-menu")
  .row()
  .text("Buy 0.01", (ctx) => ctx.reply("You pressed Buy 0.01"))
  .text("Buy 0.05", (ctx) => ctx.reply("You pressed Buy 0.05"))

mainMenu.register(switchMenu, "root-menu")

// 使其具有互动性。
bot.use(mainMenu)

bot.command("start", async (ctx) => {
  // 发送菜单。
  await ctx.reply("Check out this menu:", { reply_markup: mainMenu })
})

bot.start()
