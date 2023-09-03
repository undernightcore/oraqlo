import {configDotenv} from "dotenv";
import {loadDatabase} from "../src/services/db";
import {loadAi} from "../src/services/llm";

async function main() {
    const database = await loadDatabase()
    const ai = await loadAi(database)

    const answer = await ai.ask('How many people work at Mercadona?')
    console.log(answer.text)
}

configDotenv()
main()