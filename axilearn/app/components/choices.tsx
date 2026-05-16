"use client";

import React from "react";
import Link from "next/link";
import { genAction } from "../actions";

interface GenerateProps {
  courseId: string;
  slug: string[];
  title: string;
  url: string;
  type: string;
}

const generateOptions = [
  {
    id: "flashcards",
    title: "Basic Flashcards",
    description: "Front/back recall",
    icon: "📚",
    structure: {
      id: "string",
      title: "string",
      description: "string",
      backAnswer: "string",
      tag: "string",
    },
  },
  {
    id: "practice",
    title: "Practice Problems",
    description: "Q&A exercises",
    icon: "✏️",
    structure: {
      problem: "string",
      solution: "string",
      explanation: "string",
      difficulty: "string",
    },
  },
  {
    id: "Fill",
    title: "Fill in the blanks",
    description: "Fill in the blanks",
    icon: "🔲",
    structure: {
      sentenceWithBlank: "string (use ____ for blanks)",
      correctMissingWord: "string",
      contextHint: "string",
    },
  },
  {
    id: "mcq",
    title: "Multiple Choice",
    description: "Structured questions",
    icon: "✅",
    structure: {
      question: "string",
      options: "string[] (array of 4 strings)",
      correctAnswerIndex: "number",
      rationale: "string",
    },
  },
];

export default function Choices({type, url, courseId, slug, title }: GenerateProps) {
  const handleClick = async (structure: string) => {
    console.log("Clicked option contains structure:", structure);

    const action = await genAction(type, courseId, url, structure);
    
  };
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Study Generator
          </h1>
          <p className="text-sm text-muted-foreground mt-2">{title}</p>
        </div>

        {/* Grid of square tiles */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {generateOptions.map((opt: any) => (
            <div
              onClick={() => handleClick(opt.structure)}
              key={opt.id}
              className="group"
            >
              <div
                className={`aspect-square rounded-2xl bg-green-50 border border-green-200/50' p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95`}
              >
                <div className="text-5xl leading-none mb-2">{opt.icon}</div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {opt.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
