"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("@grammyjs/menu");
function createMainMenu() {
    // switchMenu is using for replace mainMenu
    const switchMenu = new menu_1.Menu("switch-menu")
        .text("Add", async (ctx) => {
        await ctx.conversation.enter("talk");
    })
        .back("Switch")
        .row()
        .text("Sell 1", (ctx) => ctx.reply("You pressed Sell 1!"))
        .text("Sell 2", (ctx) => ctx.reply("You pressed Sell 2!"))
        .text("Sell 3", (ctx) => ctx.reply("You pressed Sell 3!"));
    // mainMenu
    const mainMenu = new menu_1.Menu("root-menu")
        .text("Add", async (ctx) => {
        await ctx.conversation.enter("talk");
    })
        .submenu("Switch", "switch-menu")
        .row()
        .text("Buy 0.01", (ctx) => ctx.reply("You pressed Buy 0.01"))
        .text("Buy 0.05", (ctx) => ctx.reply("You pressed Buy 0.05"));
    mainMenu.register(switchMenu, "root-menu");
    return mainMenu;
}
exports.default = createMainMenu;
