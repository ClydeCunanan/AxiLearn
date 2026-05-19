'use server';

import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

 export default async function main(message) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: [],
    config: {
      systemInstruction: "You are a helpful assistant that provides concise and accurate answers to user questions. You should provide clear and informative responses based on the user's input. If you don't know the answer, it's okay to say you don't know. Always strive to be helpful and accurate in your responses.",
    }
  });
  const response = await chat.sendMessage({
    message: message
  });
  
  
chat.history.push({ role: "user", parts: [{ text: message }] }); 
chat.history.push({ role: "model", parts: [{ text: response.text }] }); 
  // for await (const chunk of response) {
  //   console.log(chunk.text);
  //   console.log("_".repeat(80));
  // }
  const aiResponse = response.text;
  
  return aiResponse;
}

