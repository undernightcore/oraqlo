export function formatResponse(question: string, tokens: string[]) {
    return `
QUESTION
--------
${question}

${tokens.join('')}
    `
}