import { type Conversation, type ConversationFlavor } from "@grammyjs/conversations"
import { Context } from "grammy"

// MyContext, customizable type, provided for bot and menu
export type MyContext = Context & ConversationFlavor
type MyConversation = Conversation<MyContext>

// conversation
export default async function talk(conversation: MyConversation, ctx: MyContext) {
  // markup this message as force_rpely
  await ctx.reply("What would you like to name this copy trade wallet? 8 letters max, only numbers and letters.", {
    reply_markup: { force_reply: true },
  })

  // get user first input and valid it
  const { message } = await conversation.wait()
  const name = message.text
  if (name.length > 8) {
    await ctx.reply("This is not a valid wallet name. Name must be alphanumeric, 8 letters max.")
    return
  }

  // markup this message as force_rpely
  await ctx.reply("Reply to this message with the desired wallet address you'd like to copy trades from.", {
    reply_markup: { force_reply: true },
  })

  // get user second input and valid it
  const zg = /^[0-9a-zA-Z]*$/

  const msg = await conversation.wait()
  const address = msg.message.text
  console.log(zg.test(address))
  if (address.length !== 42 || !address.startsWith("0x") || !zg.test(address)) {
    await ctx.reply("This is not a valid wallet address. Please try again.")
    return
  }
  ctx.reply(`Added ARB wallet(${name})
  ${address}`)
}
