'use server';

import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 💎 OFFICIAL GOOGLE SCHEMATIC MAP (Pure Native Objects)
const generateStructures = {
  flashcards: {
    type: "OBJECT",
    properties: {
      flashcards: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            title: { type: "STRING" },
            description: { type: "STRING" },
            backAnswer: { type: "STRING" },
            tag: { type: "STRING" }
          },
          required: ["id", "title", "description", "backAnswer", "tag"]
        }
      }
    },
    required: ["flashcards"]
  },

  practice: {
    type: "OBJECT",
    properties: {
      practice: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            problem: { type: "STRING" },
            solution: { type: "STRING" },
            explanation: { type: "STRING" },
            difficulty: { type: "STRING" }
          },
          required: ["problem", "solution", "explanation", "difficulty"]
        }
      }
    },
    required: ["practice"]
  },

  fill: {
    type: "OBJECT",
    properties: {
      fill: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            sentenceWithBlank: { type: "STRING" },
            correctMissingWord: { type: "STRING" },
            contextHint: { type: "STRING" }
          },
          required: ["sentenceWithBlank", "correctMissingWord", "contextHint"]
        }
      }
    },
    required: ["fill"]
  },

  mcq: {
    type: "OBJECT",
    properties: {
      mcq: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            question: { type: "STRING" },
            options: { 
              type: "ARRAY", 
              items: { type: "STRING" } 
            },
            correctAnswerIndex: { type: "INTEGER" }, // Native type for integers
            rationale: { type: "STRING" }
          },
          required: ["question", "options", "correctAnswerIndex", "rationale"]
        }
      }
    },
    required: ["mcq"]
  }
};

interface ContentInput {
  cleanHTML: string;
  downloadedImages: string[];
}

export default async function generator(content: ContentInput, title: string) {
  let schema;
  
  // Symmetrical layout mapping
  if (title === "Basic Flashcards") {
    schema = generateStructures.flashcards;
  } else if (title === "Practice Problems") {
    schema = generateStructures.practice;
  } else if (title === "Fill in the blanks") {
    schema = generateStructures.fill;
  } else if (title === "Multiple Choice") {
    schema = generateStructures.mcq;
  } else {
    console.error("❌ Generation title not matched to a valid schema target:", title);
    return null;
  }

  const { cleanHTML, downloadedImages } = content;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [
        // Component 1: The document/webpage text structural source
        { text: cleanHTML },
        
        // Component 2+: Dynamically append multi-modal visual assets
        ...downloadedImages.map(base64 => ({
          inlineData: {
            mimeType: "image/png", 
            data: base64
          }
        }))
      ],
      config: {
        systemInstruction: `You are an elite study material generator. Generate a precise list of ${title} entries based on the context text and reference layout positions of the provided images.`,
        responseMimeType: "application/json",
        responseSchema: schema 
      }
    });

    // Parse the safe, structured response text
    const parsedData = JSON.parse(response.text ?? "no data");
    console.log("🚀 Generation Payload Received Successfully");
    
    console.log(parsedData);
  } catch (error) {
    console.error("❌ Fatal Error in Gemini Generation Pipeline:", error);
    throw error;
  }
}