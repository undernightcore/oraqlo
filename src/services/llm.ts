import {Ollama} from "@langchain/community/llms/ollama";
import {loadQAStuffChain, RetrievalQAChain} from "langchain/chains";
import {HNSWLib} from "langchain/vectorstores/hnswlib";

class Ai {
    llm: Ollama;
    database: HNSWLib;
    chain: RetrievalQAChain;

    constructor(database: HNSWLib) {
        this.llm = new Ollama({
            baseUrl: process.env.OLLAMA_URL ?? 'http://localhost:11434',
            model: process.env.MODEL ?? 'llama2'
        })
        this.database = database
        this.chain = new RetrievalQAChain({
            combineDocumentsChain: loadQAStuffChain(this.llm),
            retriever: this.database.asRetriever(),
            inputKey: 'question'
        });
    }

    public ask(question: string, handleToken?: (token: string) => (void | Promise<void>)) {
        return this.chain.invoke({ question }, {callbacks: [{
            handleLLMNewToken: handleToken
        }]});
    }
}

export const loadAi = (database: HNSWLib) => new Ai(database)