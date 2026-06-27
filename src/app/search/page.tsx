'use client'

import { useState } from 'react'
import { Card } from '@/components/ui'

const allResults = [
  { type: 'Course', title: 'Options Trading: Zero to Pro', desc: 'Complete options education from basics to advanced structures.' },
  { type: 'Course', title: 'Technical Analysis Masterclass', desc: 'Charts, indicators, trend structure, and execution examples.' },
  { type: 'Lesson', title: 'Understanding Delta and Gamma', desc: 'How delta measures sensitivity and gamma changes delta.' },
  { type: 'Blog', title: 'How to Use Open Interest', desc: 'Institutional framework for OI analysis in Nifty options.' },
  { type: 'Tool', title: 'Position Size Calculator', desc: 'Calculate optimal quantity using capital, risk, and stop loss.' },
  { type: 'Community', title: 'Nifty Triangle Discussion', desc: 'Aarav Mehta analysis of the daily ascending triangle formation.' },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const filtered = query
    ? allResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase()))
    : allResults

  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="mx-auto max-w-[680px]">
        <h1 className="mb-4 text-center text-3xl font-bold">Search</h1>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-6 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-base"
          placeholder="Search courses, lessons, blog, tools..."
          autoFocus
        />
        <div className="space-y-3">
          {filtered.map((r, i) => (
            <Card key={i} className="p-4">
              <div className="mb-1 text-[0.7rem] font-bold uppercase tracking-wider text-text-muted">{r.type}</div>
              <h4 className="font-semibold">{r.title}</h4>
              <p className="text-sm text-text-secondary">{r.desc}</p>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-card border border-dashed border-line p-8 text-center text-text-secondary">
              No results for &ldquo;{query}&rdquo;. Try different keywords.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
