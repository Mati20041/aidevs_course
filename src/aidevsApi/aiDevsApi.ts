import fetch, {Response} from "node-fetch";

const url = 'https://zadania.aidevs.pl'
const apikey = process.env.AIDEVS_API_KEY

export interface TokenResponse {
    token: string
}

export async function fetchToken(taskName: string): Promise<string> {
    const tokenResponse = await fetch(`${url}/token/${taskName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({apikey})
    })
    return ((await tokenResponse.json()) as TokenResponse).token;
}

export async function fetchTask<T>(token: string): Promise<T> {
    const taskResponse = await fetch(`${url}/task/${token}`)
    return (await taskResponse.json()) as T;
}

export async function submitAnswer(token: string, answer: unknown): Promise<Response> {
    return await fetch(`${url}/answer/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({answer})
    });
}