export type FlashcardTag = "verb" | "noun" | "adj" | string;

export type FlashcardKind = "basic" | "fill" | "mcq" | "practice";

export interface FlashcardBase {
  id: string; // stable identifier
  title: string;
  description?: string;
  tag?: FlashcardTag;
  kind: FlashcardKind;
}

export interface BasicFlashcard extends FlashcardBase {
  kind: "basic";
  front: string;
  back: string;
}

export interface FillFlashcard extends FlashcardBase {
  kind: "fill";
  prompt: string; // prompt with blank marker like "I ___ to school"
  answer: string; // canonical answer
  placeholder?: string; // optional hint
}

export interface MCQOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface MCQFlashcard extends FlashcardBase {
  kind: "mcq";
  question: string;
  options: MCQOption[];
}

export interface PracticeFlashcard extends FlashcardBase {
  kind: "practice";
  prompt: string;
  expected: string;
  attempts?: number;
}

export type AnyFlashcard = BasicFlashcard | FillFlashcard | MCQFlashcard | PracticeFlashcard;

// Helpers: convert a loose structure into typed examples for each kind.
// Example input shape (from user):
// { id: "flashcards", title: "Basic Flashcards", description: "Front/back recall", backAnswer: "Flashcard back", tag: "verb" }

const sampleInput = {
  id: "flashcards",
  title: "Basic Flashcards",
  description: "Front/back recall",
  backAnswer: "Flashcard back",
  tag: "verb",
};

export const SAMPLE_BASIC: BasicFlashcard = {
  id: String(sampleInput.id) || "basic-1",
  title: String(sampleInput.title) || "Untitled",
  description: sampleInput.description ? String(sampleInput.description) : undefined,
  tag: sampleInput.tag ? (String(sampleInput.tag) as FlashcardTag) : undefined,
  kind: "basic",
  front: sampleInput.title ?? "Front",
  back: sampleInput.backAnswer ?? "Back",
};

export const SAMPLE_FILL: FillFlashcard = {
  id: `${sampleInput.id}-fill`,
  title: `${sampleInput.title} — Fill`,
  description: sampleInput.description ? String(sampleInput.description) : undefined,
  tag: sampleInput.tag ? (String(sampleInput.tag) as FlashcardTag) : undefined,
  kind: "fill",
  prompt: "Yo ___ español.",
  answer: "aprendo",
  placeholder: "verb (first person)",
};

export const SAMPLE_MCQ: MCQFlashcard = {
  id: `${sampleInput.id}-mcq`,
  title: `${sampleInput.title} — MCQ`,
  description: sampleInput.description ? String(sampleInput.description) : undefined,
  tag: sampleInput.tag ? (String(sampleInput.tag) as FlashcardTag) : undefined,
  kind: "mcq",
  question: "What is the English meaning of 'aprender'?",
  options: [
    { id: "a", text: "to teach", correct: false },
    { id: "b", text: "to learn", correct: true },
    { id: "c", text: "to sing", correct: false },
    { id: "d", text: "to run", correct: false },
  ],
};

export const SAMPLE_PRACTICE: PracticeFlashcard = {
  id: `${sampleInput.id}-practice`,
  title: `${sampleInput.title} — Practice`,
  description: sampleInput.description ? String(sampleInput.description) : undefined,
  tag: sampleInput.tag ? (String(sampleInput.tag) as FlashcardTag) : undefined,
  kind: "practice",
  prompt: "Say the verb 'aprender' in first person present (Spanish)",
  expected: "aprendo",
  attempts: 0,
};

export const ALL_SAMPLES: AnyFlashcard[] = [SAMPLE_BASIC, SAMPLE_FILL, SAMPLE_MCQ, SAMPLE_PRACTICE];
