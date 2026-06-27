'use client'

import { useState } from 'react'
import { Card, Badge, Button, Progress } from '@/components/ui'

export default function QuizPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const correctAnswer = 1

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[640px]">
        <h1 className="mb-1 text-2xl font-bold">Options Greeks Quiz</h1>
        <p className="mb-6 text-sm text-text-secondary">24 questions, 20 minutes.</p>
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <Badge variant="gold">Q3 of 24</Badge>
            <span className="text-xs text-text-muted">18:42 remaining</span>
          </div>
          <Progress value={12.5} className="mb-5" />
          <h3 className="mb-5 text-base font-semibold leading-relaxed">
            A call option has a delta of 0.65. If the stock moves up by ₹10, approximately how much will the option premium increase?
          </h3>
          <div className="space-y-2.5" role="radiogroup">
            {['A. ₹10.00', 'B. ₹6.50', 'C. ₹3.50', 'D. ₹0.65'].map((opt, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={selected === i}
                onClick={() => setSelected(i)}
                className={`w-full rounded-[14px] border p-3.5 text-left text-sm transition-colors ${
                  selected === i
                    ? i === correctAnswer
                      ? 'border-emerald bg-emerald-dim text-emerald'
                      : 'border-danger bg-danger-dim text-danger'
                    : 'border-line hover:border-line-hover hover:bg-gold-dim'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className={`mt-4 rounded-btn p-3 text-sm ${selected === correctAnswer ? 'bg-emerald-dim text-emerald' : 'bg-danger-dim text-danger'}`}>
              {selected === correctAnswer
                ? 'Correct. Delta 0.65 means ~₹6.50 change for a ₹10 underlying move.'
                : 'Not quite. Delta 0.65 implies ~₹6.50 for a ₹10 move in the underlying.'}
            </div>
          )}
          <div className="mt-5 flex justify-between">
            <Button variant="ghost">Previous</Button>
            <Button>Next Question</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
