import {fetchTask, fetchToken, submitAnswer} from "../aidevsApi/aiDevsApi.js";
import {chat} from "../openai/openAiApi.js";
import {extractReplyAsync, system, user} from "../openai/chatGenerators.js";
import {ChatMessage} from "../openai/models.js";

interface Task {
    code: number,
    msg: string,
    blog: string[]
}

export async function main04() {
    const token = await fetchToken('blogger');
    const task = await fetchTask<Task>(token);
    console.log(JSON.stringify(task, null, 4))
    const systemMessage = system(`
        Jesteś znanym włoskim kucharzem wyspecjalizowanym w robieniu pizzy. Twoje imię to Mario i masz żonę polkę. Jesteś bardzo ekspresyjny i dodajesz włoskie słowa do swoich wypowiedzi. 
    
        Zaczynasz pisać artykuł, który będzie składał się z różnych części. Każda z tych części będzie miała swój tytuł, który podam Ci w tej samej wiadomości. Twoim zadaniem jest napisać treść podanej części artykułu, uwzględniając swój charakter, pochodzenie oraz poprzednie części artykułu. Pisz maksymalnie 2 paragrafy na każdą część.
        
        Pamiętaj, że ten artykuł to ciągła historia, więc powinieneś utrzymać spójność między kolejnymi częściami.        
        `)
    const chatHistory = [systemMessage]
    const chapters: string[] = []
    let article = ''
    for (const heading of task.blog) {
        chatHistory.push(user(heading))
        const chatAboutArticle = await chat(chatHistory)
        const assistantReply = chatAboutArticle.choices[0].message;
        chatHistory.push(assistantReply)
        chapters.push(assistantReply.content)
        article += `## ${heading}\n\n${assistantReply.content}\n\n`;
        console.log(`DONE "${heading}" `)
    }

    console.log(article)

    const answerResponse = await submitAnswer(token, chapters);
    console.log(answerResponse)
    if (answerResponse.ok) {
        console.log('SUKCES!!!')
    } else {
        console.error('PORAŻKA!!!')
    }
}


// const taskResponse = {
//     "code": 0,
//     "msg": "please write blog post for the provided outline",
//     "blog": [
//         "Wstęp: kilka słów na temat historii pizzy",
//         "Niezbędne składniki na pizzę",
//         "Robienie pizzy",
//         "Pieczenie pizzy w piekarniku"
//     ]
// }
