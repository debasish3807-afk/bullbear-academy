'use client'

import { useState } from 'react'
import { Card, Button } from '@/components/ui'

export default function ToolsPage() {
  const [result, setResult] = useState<string | null>(null)

  function calcPosition(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const capital = Number(fd.get('capital'))
    const riskPct = Number(fd.get('risk')) / 100
    const entry = Number(fd.get('entry'))
    const sl = Number(fd.get('sl'))
    const riskAmt = capital * riskPct
    const rps = Math.abs(entry - sl)
    const shares = Math.floor(riskAmt / rps)
    const investment = shares * entry
    setResult(`Shares: ${shares.toLocaleString('en-IN')} | Investment: \u20b9${investment.toLocaleString('en-IN')} | Risk: \u20b9${riskAmt.toLocaleString('en-IN')}`)
  }

  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="mx-auto max-w-[560px]">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold">Trading Tools</h1>
          <p className="text-text-secondary">Professional-grade calculators for Indian markets.</p>
        </div>
        <Card>
          <h3 className="mb-4 font-semibold">Position Size Calculator</h3>
          <form onSubmit={calcPosition} className="space-y-3">
            <input name="capital" type="number" defaultValue={100000} className="w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" placeholder="Capital" />
            <input name="risk" type="number" defaultValue={2} step={0.5} className="w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" placeholder="Risk %" />
            <div className="grid grid-cols-2 gap-3">
              <input name="entry" type="number" defaultValue={250} className="rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" placeholder="Entry" />
              <input name="sl" type="number" defaultValue={240} className="rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" placeholder="Stop Loss" />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
          </form>
          {result && (
            <div className="mt-4 rounded-btn border border-gold-border bg-gold-dim p-4 text-sm font-semibold text-gold">{result}</div>
          )}
        </Card>
      </div>
    </div>
  )
}
