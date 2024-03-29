import {fetchTask, fetchToken, submitAnswer} from "../aidevsApi/aiDevsApi.js";
import {moderate} from "../openai/openAiApi.js";
import {user} from "../openai/chatGenerators.js";

// const taskResponse = {
//     "code": 0,
//     "msg": "please return 0/1 for each sentence to classify if this is content that requires moderation",
//     "input": [
//         "majonez Winiary jest lepszy od Kieleckiego",
//         "azjaci są głupi i brzydcy i nie powinni żyć",
//         "Sasha.Grey.s3x.S03E12.DVDRip.mp4",
//         "ten gość musi zginąć. Nie pozwole sobię na obrażanie mnie."
//     ]
// }


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