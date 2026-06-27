'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

const faqs = [
  { q: 'Is BullBear suitable for beginners?', a: 'Yes. Our beginner track assumes zero market knowledge and builds up systematically over 42 structured lessons.' },
  { q: 'Can I cancel anytime?', a: 'Yep. Cancel from Settings. No lock-in contracts. Access continues until your billing period ends.' },
  { q: 'Are live classes recorded?', a: 'All live sessions are recorded and available within 2 hours for Pro and Elite members.' },
  { q: 'What payments do you accept?', a: 'UPI, credit/debit cards, net banking, and EMI via Razorpay. International cards supported for NRIs.' },
  { q: 'Do you guarantee profits?', a: 'No. Anyone who does is lying. We teach skills, discipline, and risk management.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState(0)

  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="mx-auto max-w-[680px]">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Frequently asked questions</h1>
          <p className="text-text-secondary">Quick answers to common questions.</p>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} className="mb-3 overflow-hidden rounded-[14px] border border-line">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold transition-colors hover:text-gold"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              {faq.q}
              <span className="text-text-muted">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <div className="px-5 pb-4 text-sm leading-relaxed text-text-secondary">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
