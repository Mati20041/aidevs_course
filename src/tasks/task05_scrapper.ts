import {fetchTask, fetchToken, submitAnswer} from "../aidevsApi/aiDevsApi.js";
import {fetchHttpExternalResource} from "../utils/fetchHttpExternalResource.js";
import {chat} from "../openai/openAiApi.js";
import {extractReply, system, user} from "../openai/chatGenerators.js";

interface Task {
    code: number,
    msg: string,
    input: string
    question: string
}

export async function main05() {
    const token = await fetchToken('scraper');
    const task = await fetchTask<Task>(token);
    console.log(JSON.stringify(task, null, 4))
    const {textBody: inputText} = await fetchHttpExternalResource(task.input);
    console.log(inputText)
    const answerToTheQuestion = await chat([
        system(inputText),
        user(task.question)
    ])

    const chatReply = extractReply(answerToTheQuestion);
    console.log(chatReply)

    const answerResponse = await submitAnswer(token, chatReply);
    console.log(await answerResponse.text())
    if (answerResponse.ok) {
        console.log('SUKCES!!!')
    } else {
        console.error('PORAŻKA!!!')
    }
}

const asd = 3

const b = asd + 5 /*?*/


// const taskResponse = {
//     "code": 0,
//     "msg": "Return answer for the question in POLISH language, based on provided article. Maximum length for the answer is 200 characters",
//     "input": "https://zadania.aidevs.pl/text_pizza_history.txt",
//     "question": "z którego roku pochodzi łaciński dokument, który pierwszy raz wspomina o pizzy? "
// }
