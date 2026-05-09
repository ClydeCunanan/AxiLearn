'use server';

import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

 export default async function main(message) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: []
  });
  const response = await chat.sendMessage({
    message: message
  });
  
chat.history.push({ role: "user", parts: [{ text: message.text }] }); 
chat.history.push({ role: "model", parts: [{ text: response.text }] }); 
  // for await (const chunk of response) {
  //   console.log(chunk.text);
  //   console.log("_".repeat(80));
  // }
  const aiResponse = response.text;
  return aiResponse;
}






  //how to get response .text  to messages to be displayed 


// export default async function main(message) {
//   console.log('Received message:', message);
// }