import {HNSWLib} from "langchain/vectorstores/hnswlib";
import {loadAllDocuments, splitDocuments} from "../utils/documents";
import "@tensorflow/tfjs-node"
import {TensorFlowEmbeddings} from "langchain/embeddings/tensorflow";
import {DB_PATH} from "../constants";

export async function loadDatabase() {
    return HNSWLib.load(DB_PATH, new TensorFlowEmbeddings()).catch(() => {
        console.error('ORAQLO: Error loading database, please feed the beast again!')
        process.exit(1)
    })
}

export async function generateDatabase() {
    const documents = await loadAllDocuments()
    const processedDocuments = await splitDocuments(documents)
    const db = await HNSWLib.fromDocuments(processedDocuments, new TensorFlowEmbeddings())
    await db.save(DB_PATH)
    return db
}