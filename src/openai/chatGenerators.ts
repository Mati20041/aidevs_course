import {ChatMessage, ChatResult} from "./models.js";

export const system = (content: string): ChatMessage => ({content: content.replace(/^\s+/gm,'').trim(), role: 'system'});
export const user = (content: string): ChatMessage => ({content: content.replace(/^\s+/gm,'').trim(), role: 'user'});
export const assistant = (content: string): ChatMessage => ({content: content.replace(/^\s+/gm,'').trim(), role: 'assistant'});

export const extractReply = (chatResponse: ChatResult) => chatResponse.choices[0].message.content
export const extractReplyAsync = (chatResponse: Promise<ChatResult>) => chatResponse.then(reponse => reponse.choices[0].message.content)