'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { resendVerification, logout } from '@/lib/firebase'

export default function VerifyEmailPage() {
  const { user } = useAuth()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleResend() {
    setLoading(true)
    try {
      await resendVerification()
      setSent(true)
    } catch { /* silently fail */ }
    setLoading(false)
  }

  async function handleVerified() {
    if (user) {
      await user.reload()
      if (user.emailVerified) {
        router.push('/onboarding')
      } else {
        router.push('/dashboard')
      }
    }
  }

  async function handleLogout() {
    await logout()
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[420px] rounded-[24px] border border-line bg-bg-card p-9 text-center">
        <div className="mb-4 text-4xl">✉️</div>
        <h2 className="mb-2 text-2xl font-bold">Check your inbox</h2>
        <p className="mb-6 text-sm text-text-secondary">
          We sent a verification link to <strong>{user?.email || 'your email'}</strong>. Click it to activate your account.
        </p>
        {sent && <div className="mb-4 rounded-btn bg-emerald-dim px-4 py-2 text-sm text-emerald">Verification email resent.</div>}
        <div className="flex justify-center gap-3">
          <Button onClick={handleResend} disabled={loading || sent}>
            {sent ? 'Sent' : 'Resend Email'}
          </Button>
          <Button variant="outline" onClick={handleVerified}>I&apos;ve Verified</Button>
        </div>
        <button onClick={handleLogout} className="mt-4 text-sm text-text-muted hover:text-gold">Sign out</button>
      </div>
    </div>
  )
}
