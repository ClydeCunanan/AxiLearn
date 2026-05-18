'use server';

import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

  
 export default async function generator(content: any , structure: string) {
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:`Create a ${card} based on ${content} with the provided responseSchema` ,
    config: {
       systemInstruction: "",
      responseMimeType: "application/json",
      responseSchema: structure
    }
  });


   
  console.log(response.text)
}


  
  