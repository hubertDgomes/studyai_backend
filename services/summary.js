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
            description : "Summary of the document, written as clean, valid HTML with inline CSS styles for visual formatting. Structure it with a mix of short paragraphs and bullet points. Use <h2 style='font-weight:bold; font-size:1.25rem; margin-top:1rem; margin-bottom:0.5rem;'> for section headings to break the summary into logical parts (e.g. Overview, Key Concepts, Important Details). Use <strong style='color:#1A1A1A;'> for key terms and important phrases. Use <ul style='list-style-type:disc; margin-left:1.5rem;'><li> for bullet-point lists of related ideas, and <p style='margin-bottom:0.75rem;'> for narrative paragraph explanation. Vary text size using inline style (e.g. font-size:0.95rem for minor details, font-size:1.1rem for emphasis) to create visual hierarchy. Return ONLY valid, well-formed HTML — no markdown syntax, no <script> tags, no event handler attributes (onclick, onerror, etc.), and no external stylesheets or <style> blocks. Every tag must be properly closed."
        },
        title: {
            type : "string",
            description : "Title of the document. It should be concise and informative, providing a clear overview of the document's content."
        }
    },
    required : ["summary", "title"]  
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
