import fetch from "node-fetch";
import {ChatMessage, ChatOptions, ChatResult, ModerationResult} from "./models.js";

const OPEN_API_KEY = process.env.OPENAI_API_KEY;
const url = "https://api.openai.com/v1"


export async function moderate(...text: string[]) {
    const result = await fetch(`${url}/moderations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_API_KEY}`
        },
        body: JSON.stringify({input: text})
    })
    return (await result.json()) as ModerationResult
}

export async function chat(messages: ChatMessage[], options: ChatOptions = {}) {
    const result = await fetch(`${url}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            ...options,
            messages
        })
    })
    return (await result.json()) as ChatResult
}