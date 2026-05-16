'use server';

import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

 export default async function generator(content: string, structure: string) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: [],
    config: {
      systemInstruction: `Create json content with this module/page context:${content} based on this template: ${structure}`
  }});

  
  
}

