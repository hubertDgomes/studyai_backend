import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const documentSummurySchema = {
    type : "object",
    properties : {
        summary: {
            type : "string",
            description : "Summary of the document with the most important points and key takeaways. It should be concise and informative, providing a clear overview of the document's content. also it should be like the mix of paragraph and bullet points. The summary should be written in a way that is easy to understand and provides a clear understanding of the document's main ideas and arguments."
        }
    },
    required : ["summary"]  
}

const generateDocsSummury = async ({pdfText}) => {
    const prompt = `You are a document summarization expert. Your task is to generate a concise and informative summary of the following document text. The summary should highlight the most important points and key takeaways, providing a clear overview of the document's content. The summary should be written in a way that is easy to understand and provides a clear understanding of the document's main ideas and arguments. The summary should be like the mix of paragraph and bullet points. Here is the document text: ${pdfText}`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: documentSummurySchema
        }
    });

    return (JSON.parse(response.text))
    console.log(JSON.parse(response.text));
    
}

export default generateDocsSummury
