import {fetchTask, fetchToken, submitAnswer} from "../aidevsApi/aiDevsApi.js";


// const taskResponse = {
//     "code": 0,
//     "msg": "please return value of \"cookie\" field as answer",
//     "cookie": "aidevs_06a2b41b"
// }
//


export async function main01() {
    const token = await fetchToken('helloapi');
    const task = await fetchTask<{cookie: string}>(token);
    console.log(JSON.stringify(task, null, 4))
    const answerResponse = await submitAnswer(task.cookie, task);
    console.log(answerResponse)
}