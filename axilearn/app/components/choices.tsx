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

export interface GenerateOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  structure: any;
}

const generateOptions = [
  {
    id: "flashcards",
    title: "Basic Flashcards",
    description: "Front/back recall",
    icon: "📚",
  },
  {
    id: "practice",
    title: "Practice Problems",
    description: "Q&A exercises",
    icon: "✏️",
  },
  {
    id: "Fill",
    title: "Fill in the blanks",
    description: "Fill in the blanks",
    icon: "🔲",
  },
  {
    id: "mcq",
    title: "Multiple Choice",
    description: "Structured questions",
    icon: "✅",
  },
];

export default function Choices({
  type,
  url,
  courseId,
  slug, 
  title,
}: GenerateProps) {
  const handleClick = async (title: string) => {
    const action = await genAction(type, courseId, url, title);
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
              onClick={() => handleClick(opt.title)}
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
