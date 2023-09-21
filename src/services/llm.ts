import {Ollama} from "langchain/llms/ollama";
import {loadQAStuffChain, RetrievalQAChain} from "langchain/chains";
import {HNSWLib} from "langchain/vectorstores/hnswlib";

class Ai {
    llm: Ollama;
    database: HNSWLib;
    chain: RetrievalQAChain;

    constructor(database: HNSWLib) {
        this.llm = new Ollama({ baseUrl: process.env.OLLAMA_URL, model: 'llama2' })
        this.database = database
        this.chain = new RetrievalQAChain({
            combineDocumentsChain: loadQAStuffChain(this.llm),
            retriever: this.database.asRetriever(),
            inputKey: 'question'
        });
    }

    public ask(question: string, handleToken?: (token: string) => (void | Promise<void>)) {
        return this.chain.call({ question }, {callbacks: [{
            async handleLLMNewToken(token) {
                await handleToken?.(token)
            }
        }]});
    }
}

export const loadAi = (database: HNSWLib) => new Ai(database)