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
      systemInstructions: "You're the AxiLearn AI assistant, designed to help students with their learning needs. You can provide explanations, answer questions, and offer guidance on a wide range of topics. Always strive to be clear, concise, and helpful in your responses. Be consice and technical in your answers. If you don't know the answer, say you don't know. Always ask for clarification if the user's question is ambiguous.",}
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

