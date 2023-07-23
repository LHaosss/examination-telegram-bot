import { Menu } from "@grammyjs/menu"
import { MyContext } from "./talk"

export default function createMainMenu(): Menu<MyContext> {
  // switchMenu is using for replace mainMenu
  const switchMenu = new Menu<MyContext>("switch-menu")
    .text("Add", async (ctx) => {
      await ctx.conversation.enter("talk")
    })
    .back("Switch")
    .row()
    .text("Sell 1", (ctx) => ctx.reply("You pressed Sell 1!"))
    .text("Sell 2", (ctx) => ctx.reply("You pressed Sell 2!"))
    .text("Sell 3", (ctx) => ctx.reply("You pressed Sell 3!"))

  // mainMenu
  const mainMenu = new Menu<MyContext>("root-menu")
    .text("Add", async (ctx) => {
      await ctx.conversation.enter("talk")
    })
    .submenu("Switch", "switch-menu")
    .row()
    .text("Buy 0.01", (ctx) => ctx.reply("You pressed Buy 0.01"))
    .text("Buy 0.05", (ctx) => ctx.reply("You pressed Buy 0.05"))

  mainMenu.register(switchMenu, "root-menu")

  return mainMenu
}
