import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

//  export default async function main(message) {
//   const chat = ai.chats.create({
//     model: "gemini-3-flash-preview",
//     history: []
//   });
//   console.log(message, message.type);
//   const response = await chat.sendMessageStream({
//     message: message
//   });
//   console.log("Chat response 1:", response.text);

//   const aiResponse = response.text

  

// chat.history.push({ role: "user", parts: [{ text: message.text }] }); 
// chat.history.push({ role: "model", parts: [{ text: response.text }] }); 
//   for await (const chunk of response) {
//     console.log(chunk.text);
//     console.log("_".repeat(80));
//   }
// }

export default async function main(message) {
  console.log('Received message:', message);
}