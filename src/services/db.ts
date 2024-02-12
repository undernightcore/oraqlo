import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import {loadAllDocuments, splitDocuments} from "../utils/documents";
import {DB_PATH} from "../constants";
import {getEmbeddings} from "../utils/embeddings";

export async function loadDatabase() {
    return HNSWLib.load(DB_PATH, await getEmbeddings()).catch(() => {
        console.error('ORAQLO: Error loading database, please feed the beast again!')
        process.exit(1)
    })
}

export async function generateDatabase() {
    const documents = await loadAllDocuments()
    const processedDocuments = await splitDocuments(documents)
    const db = await HNSWLib.fromDocuments(processedDocuments, await getEmbeddings())
    await db.save(DB_PATH)
    return db
}