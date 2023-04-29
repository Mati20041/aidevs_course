import {fetchTask, fetchToken, submitAnswer} from "../aidevsApi/aiDevsApi.js";


export async function main01() {
    const token = await fetchToken('moderation');
    const task = await fetchTask(token);
    console.log(task)
    const answerResponse = await submitAnswer(token, task);
    console.log(answerResponse)
}