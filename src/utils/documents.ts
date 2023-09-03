import {DirectoryLoader} from "langchain/document_loaders/fs/directory";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {Document} from "langchain/document";
import {DOCS_PATH} from "../constants";

export async function loadAllDocuments() {
    const loader = new DirectoryLoader(
        DOCS_PATH,
        {
            ".pdf": (path) => new PDFLoader(path)
        }
    );
    return loader.load()
}

export async function splitDocuments(documents: Document<Record<string, any>>[]) {
    const chunkSize = 500
    const chunkOverlap = 50
    const splitter = new RecursiveCharacterTextSplitter({ chunkOverlap, chunkSize });
    return splitter.splitDocuments(documents)
}