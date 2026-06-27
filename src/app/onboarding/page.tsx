'use client'

import { Button } from '@/components/ui'
import { Card } from '@/components/ui'
import Link from 'next/link'

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[500px]">
        <h1 className="mb-2 text-center text-2xl font-bold">Set up your learning path</h1>
        <p className="mb-6 text-center text-sm text-text-secondary">Takes 2 minutes. Helps the AI personalize your journey.</p>
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm">
              <option>Experience: Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
            <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm">
              <option>Interest: Options</option><option>Intraday</option><option>Swing</option><option>Investing</option>
            </select>
            <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm">
              <option>Capital: Below ₹50k</option><option>₹50k - ₹2L</option><option>₹2L - ₹10L</option><option>Above ₹10L</option>
            </select>
            <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm">
              <option>Weekly time: 2-4 hrs</option><option>5-8 hrs</option><option>9-12 hrs</option>
            </select>
          </div>
          <Link href="/dashboard"><Button className="mt-5 w-full">Build My Plan</Button></Link>
        </Card>
      </div>
    </div>
  )
}
