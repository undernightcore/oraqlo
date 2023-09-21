import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {Document} from "langchain/document";
import {UnstructuredDirectoryLoader} from "langchain/document_loaders/fs/unstructured";
import {DOCS_PATH} from "../constants";

export async function loadAllDocuments() {
    const loader = new UnstructuredDirectoryLoader(
        DOCS_PATH,
        {apiUrl: 'http://127.0.0.1:8000/general/v0/general'}
    );
    return loader.load()
}

export async function splitDocuments(documents: Document<Record<string, any>>[]) {
    const chunkSize = 1000
    const chunkOverlap = 200
    const splitter = new RecursiveCharacterTextSplitter({ chunkOverlap, chunkSize });
    return splitter.splitDocuments(documents)
}