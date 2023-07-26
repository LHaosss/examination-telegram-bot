import { type Conversation, type ConversationFlavor } from "@grammyjs/conversations"
import { Context, SessionFlavor } from "grammy"

export interface SessionData {
  name: string
  address: string
}

// MyContext, customizable type, provided for bot and menu
export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor
type MyConversation = Conversation<MyContext>

// conversation
export default async function talk(conversation: MyConversation, ctx: MyContext) {
  // markup this message as force_rpely
  await ctx.reply("What would you like to name this copy trade wallet? 8 letters max, only numbers and letters.", {
    reply_markup: { force_reply: true },
  })

  // get user first input and valid it
  const nameMessage = await conversation.wait()
  ctx.session.name = nameMessage.message.text
  if (ctx.session.name.length > 8) {
    await ctx.reply("This is not a valid wallet name. Name must be alphanumeric, 8 letters max.")
    // return from conversation
    return
  }

  // markup this message as force_rpely
  await ctx.reply("Reply to this message with the desired wallet address you'd like to copy trades from.", {
    reply_markup: { force_reply: true },
  })

  // get user second input and valid it
  const zg = /^[0-9a-zA-Z]*$/

  const addressMessage = await conversation.wait()
  ctx.session.address = addressMessage.message.text
  if (ctx.session.address.length !== 42 || !ctx.session.address.startsWith("0x") || !zg.test(ctx.session.address)) {
    await ctx.reply("This is not a valid wallet address. Please try again.")
    // return from conversation
    return
  }
  ctx.reply(`Added ARB wallet(${ctx.session.name})
  ${ctx.session.address}`)
}
