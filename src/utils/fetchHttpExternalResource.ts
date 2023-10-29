import fetch, {Response} from "node-fetch";

async function sleep(ms: number = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchHttpExternalResource(url: string, {tries = 3, timeout = 10000} = {
    tries: 3,
    timeout: 10000
}) {
    let lastErrorResponse: Response | null = null
    for (let i = 0; i < tries; i++) {
        const response = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; rv:112.0) Gecko/20100101 Firefox/112.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
        });
        if (response.status === 200) {
            const textBody = await response.text()
            return {response, textBody};
        } else {
            lastErrorResponse = response
        }
        await sleep(timeout)
    }
    throw Error(`Couldn't fetch ${url} after ${tries} tries; \nstatus=${lastErrorResponse?.status} \nresponse=${await lastErrorResponse?.text()}`)
}