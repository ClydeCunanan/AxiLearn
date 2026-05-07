import {GoogleGenAI} from '@google/genai';

const CANVAS_API_TOKEN = process.env.CANVAS_API_TOKEN;
console.log('CANVAS_API_TOKEN:', CANVAS_API_TOKEN);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();
