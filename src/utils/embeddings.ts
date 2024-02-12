import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";


export async function getEmbeddings() {
    return new HuggingFaceTransformersEmbeddings({
        modelName: "Xenova/all-mpnet-base-v2",
    });
}