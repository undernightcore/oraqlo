import {generateDatabase} from "../src/services/db";
import {configDotenv} from "dotenv";

async function main() {
    console.info('ORAQLO: Feeding the beast...')
    const database = await generateDatabase()
    console.info(`ORAQLO: Generated ${database.docstore._docs.size} chunks, have fun!`)
}

configDotenv()
main()