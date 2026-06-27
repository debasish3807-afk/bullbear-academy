'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[400px] rounded-[24px] border border-line bg-bg-card p-9">
        <h2 className="mb-1 text-center text-2xl font-bold">Create Account</h2>
        <p className="mb-6 text-center text-sm text-text-secondary">7-day free trial. No card required.</p>
        <div className="mb-4 flex gap-3">
          <Button variant="ghost" className="flex-1">Google</Button>
          <Button variant="ghost" className="flex-1">GitHub</Button>
        </div>
        <div className="mb-4 flex items-center gap-3 text-xs text-text-muted">
          <span className="h-px flex-1 bg-line" /><span>or</span><span className="h-px flex-1 bg-line" />
        </div>
        <input className="mb-3 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" placeholder="Full name" />
        <input className="mb-3 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" placeholder="Email" />
        <input className="mb-3 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" placeholder="Phone (optional)" />
        <input className="mb-4 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" type="password" placeholder="Password (min 8)" />
        <Button className="w-full">Create Account</Button>
        <p className="mt-4 text-center text-sm text-text-secondary">
          Already registered? <Link href="/login" className="font-semibold text-gold">Log in</Link>
        </p>
      </div>
    </div>
  )
}
