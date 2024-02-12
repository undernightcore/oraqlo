import {configDotenv} from "dotenv";
import {loadDatabase} from "../src/services/db";
import {loadAi} from "../src/services/llm";
import {formatResponse} from "../src/utils/responses";

async function main() {
    const database = await loadDatabase()
    const ai = loadAi(database)
    const question = process.argv[2]

    if (!question) throw new Error('Question must not be empty!')

    const tokens: string[] = []

    await ai.ask(question, (token) => {
        tokens.push(token)
        console.clear()
        console.info(formatResponse(question, tokens))
    })
}

configDotenv()
main()