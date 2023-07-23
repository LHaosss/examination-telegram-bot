import { type Conversation, type ConversationFlavor } from "@grammyjs/conversations";
import { Context } from "grammy";
export type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;
export default function talk(conversation: MyConversation, ctx: MyContext): Promise<void>;
export {};
