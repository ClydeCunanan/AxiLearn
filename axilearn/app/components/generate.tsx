'use client'

import React from 'react'
import Link from 'next/link'

interface GenerateProps {
  courseId: string
  slug: string[]
  title: string
}

const generateOptions = [
  {
    id: 'flashcards',
    title: 'Basic Flashcards',
    description: 'Front/back recall',
    icon: '📚',
    href: '#flashcards',
   
  },
  {
    id: 'practice',
    title: 'Practice Problems',
    description: 'Q&A exercises',
    icon: '✏️',
    href: '#practice',
   
  },
  {
    id: 'cloze',
    title: 'Cloze Deletion',
    description: 'Fill in the blanks',
    icon: '🔲',
    href: '#cloze',

  },
  {
    id: 'mcq',
    title: 'Multiple Choice',
    description: 'Structured questions',
    icon: '✅',
    href: '#mcq',
  
  },
]

export default function Generate({ courseId, slug, title}: GenerateProps) {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Study Generator</h1>
           <p className="text-sm text-muted-foreground mt-2">{title}</p>
        </div>

        {/* Grid of square tiles */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {generateOptions.map((opt: any) => (
            <Link key={opt.id} href={opt.href} className="group">
              <div
                className={`aspect-square rounded-2xl bg-green-50 border border-green-200/50' p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95`}
              >
                <div className="text-5xl leading-none mb-2">{opt.icon}</div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{opt.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{opt.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Add More button */}
        <div className="flex justify-center">
          <button className="px-6 py-3 rounded-2xl bg-card border border-border/50 text-sm font-medium text-foreground hover:bg-muted transition-colors" style={{ boxShadow: 'var(--shadow-ios)' }}>
            + Add More
          </button>
        </div>
      </div>
    </div>
  )
}
