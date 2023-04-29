import {fetchTask, fetchToken, submitAnswer} from "../aidevsApi/aiDevsApi.js";
import {moderate} from "../openai/openAiApi.js";

interface Task {
    code: number,
    msg: string,
    input: string[]
}

export async function main02() {
    const token = await fetchToken('moderation');
    const task = await fetchTask<Task>(token);
    const result = await moderate(...task.input)
    console.log(result)
    const answer = result.results.map(result => result.flagged ? 1 : 0)
    const answerResponse = await submitAnswer(token, answer);
    console.log(answerResponse)
}