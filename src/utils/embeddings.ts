import "@tensorflow/tfjs-node"
import {TensorFlowEmbeddings} from "langchain/embeddings/tensorflow";

export function getEmbeddings() {
    return new TensorFlowEmbeddings()
}