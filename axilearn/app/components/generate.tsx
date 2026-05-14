"use client";

import React from "react";
import Link from "next/link";
import { genAction } from "../actions";

interface GenerateProps {
  courseId: string;
  slug: string[];
  title: string;
}

const generateOptions = [
  {
    id: "flashcards",
    title: "Basic Flashcards",
    description: "Front/back recall",
    icon: "📚",
    structure: {},
  },
  {
    id: "practice",
    title: "Practice Problems",
    description: "Q&A exercises",
    icon: "✏️",
    structure: {},
  },
  {
    id: "FIl",
    title: "Fill in the blanks",
    description: "Fill in the blanks",
    icon: "🔲",
    structure: {},
  },
  {
    id: "mcq",
    title: "Multiple Choice",
    description: "Structured questions",
    icon: "✅",
    structure: {},
  },
];

export default function Generate({ courseId, slug, title }: GenerateProps) {
  const handleClick = async (structure: string) => {
    console.log("Clicked option contains structure:", structure);

    const action = await genAction(structure);
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
  };
}
