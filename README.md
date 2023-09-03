# Oraqlo

Small POC using Ollama + Langchain to connect LLMs to your knowledge base. In the future it will introduce an API and better responses (still building good prompt templates).

## How to run

### Install dependencies

```shell
npm install
```

### Set the Ollama API url

Copy .env.example file to a .env file. This should preferably be running in an Apple Silicon Mac so you can use it's neural cores.

```text
OLLAMA_URL=http://localhost:11434
```

### Feed documents to the Vector DB

This will scan all .pdf files in the documents directory and create a database directory includiong all database files.

```text
npm run feed
```

### Ask the AI some questions

Right now you have to modify scripts/query.ts file to change the question (still building the API).

```javascript
const answer = await ai.ask('How many people work at Mercadona?')
```

```shell
npm run query
```