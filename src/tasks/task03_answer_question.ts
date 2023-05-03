import {fetchTask, fetchToken, submitAnswer} from "../aidevsApi/aiDevsApi.js";
import {chat} from "../openai/openAiApi.js";
import {extractReplyAsync, system, user} from "../openai/chatGenerators.js";

interface Task {
    code: number,
    msg: string,
    input: string[],
    question: string,
}

export async function main03() {
    const token = await fetchToken('inprompt');
    const task = await fetchTask<Task>(token);
    console.log(JSON.stringify(task, null, 0))

    const chatAboutName = await chat([
        system(`
            Wiadomość Usera zawiera treść pytania. W treści znajdować się będzie imię. Napisz jedynie to imię w tym zdaniu bez kropki na końcu i nic poza tym. 
            
            ### Przykłady
            user: co lubi jeść na śniadanie Mateusz?
            assistant: Mateusz
        `),
        user(task.question)
    ])

    const nameInQuestion = chatAboutName.choices[0].message.content
    console.log(nameInQuestion)
    const sentenceWithName = task.input.find(it => it.indexOf(nameInQuestion) !== -1)

    if (!sentenceWithName) {
        throw Error(`Couldn't find a sentence with name "${sentenceWithName}"`)
    }

    const replyAboutQuestion = await extractReplyAsync(chat([
        system(sentenceWithName),
        user(task.question)
    ]))

    console.log(replyAboutQuestion)
    const answerResponse = await submitAnswer(token, replyAboutQuestion);
    console.log(answerResponse)
    if (answerResponse.ok) {
        console.log('SUKCES!!!')
    } else {
        console.error('PORAŻKA!!!')
    }
}

// const taskResponse = {"code":0,"msg":"remember information about each person and then answer the question","input":["Abdon ma czarne oczy, średniej długości włosy i pracuje jako prawnik, a na śniadanie najbardziej lubi jeść owsiankę", "<NEXT PHRASES>"],"question":"co lubi jeść na śniadanie Alojzy?"}
