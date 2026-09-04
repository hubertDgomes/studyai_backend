import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const quizSchema = {
    type : "array",
    items: {
        type: "object",
        properties: {
            question: {
                type: "string",
                description: "The question based on the provided document text."
            },
            options: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            correctAnswer: {
                type: "string"
            },
            explanation: {
                type: "string",
                description: "A brief explanation of the correct answer, providing context and reasoning."
            }
        },
        required: ["question", "options", "correctAnswer", "explanation"]
    }
};

const generateQuiz = async ({ documentText, questionCount }) => {
    const prompt = `You are a document quiz generation expert. Your task is to create a set of ${questionCount} multiple-choice questions based on the provided document text. Each question should have 4 options, with one correct answer and an explanation for the correct answer. The questions should be clear, concise, and directly related to the content of the document. Here is the document text: ${documentText} and also make exactly ${questionCount} questions`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: quizSchema
        }
    });

    return JSON.parse(response.text);
};

export default generateQuiz;

