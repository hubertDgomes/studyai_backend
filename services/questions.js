import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const answerSchema = {
    type : "object",
    properties : {
        answer: {
            type : "string",
            description : "The answer to the question based on the provided document text. The answer should be concise, accurate, and directly address the question. It should be written in a clear and understandable manner, providing a complete response that reflects the information contained within the document."
        }
    },
    required : ["answer"]  
}

const generateAnswer = async ({question , documentText}) => {
    const prompt = `You are a document question answering expert. Your task is to provide a concise and accurate answer to the following question based on the provided document text. The answer should directly address the question, be clear and understandable, and reflect the information contained within the document. Here is the question: ${question} Here is the document text: ${documentText}`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: answerSchema
        }
    });

    return (JSON.parse(response.text))
    console.log(JSON.parse(response.text));
    
}

export default generateAnswer
