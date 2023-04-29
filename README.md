AI Devs Solutions
=================

This is a repository for api and solutions for the quizzes 
from the [AI_devs](https://www.aidevs.pl/) course.

## How to run


### Api Keys

You need to export two keys

```shell
export AIDEVS_API_KEY=<YOUR_AI_DEV_KEY>
export OPENAI_API_KEY=<YOUR_OPENAPI_KEY>
```

Apis can be retrieved from:
- `AIDEVS_API_KEY` - [https://zadania.aidevs.pl/](https://zadania.aidevs.pl/)
- `OPENAI_API_KEY` - [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

### Run locally

The following snippet will install dependencies and
run task specified in `src/index.ts`

```shell
npm install
npm run start
```

## Structure of the project

### Tasks

In `src/tasks` each file corresponds to a single task from the course.

Each task has the following scheme:
1. fetch `token` from aidevs' server
2. fetch task's input data
3. process the data with gpt or algorithms
4. post the result to the answer endpoint

### AI_devs API

`src/aidevsApi` contains functions to communicate with aidevs' server:
1. fetches the token
2. fetches the task
3. pushes the answer

### Openai API

`src/openaid` contains of:
- `models.ts` - which consists of Typescript interfaces of requests and responses to OpenAI API
- `openAiApi` - contains function for requesting OpenAI API
- `chatGenerators` - useful functions for chat's messages creation and extracting responses

Example usage:

```typescript
import { chat } from "./openAiApi";
import { system, user, extractReplyAsync } from "./chatGenerators";

const assistanceReply: string = await extractReplyAsync(
    chat([
        system(sentenceWithName),
        user(task.question)
    ])
)
```