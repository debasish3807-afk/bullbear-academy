'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { resetPassword } from '@/lib/firebase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') setError('No account with that email.')
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[400px] rounded-[24px] border border-line bg-bg-card p-9">
        <h2 className="mb-2 text-center text-2xl font-bold">Forgot Password</h2>
        <p className="mb-6 text-center text-sm text-text-secondary">Enter your email to receive a reset link.</p>
        {error && <div className="mb-4 rounded-btn bg-danger-dim px-4 py-2.5 text-sm text-danger">{error}</div>}
        {sent ? (
          <div className="rounded-btn bg-emerald-dim p-4 text-center text-sm text-emerald">
            Reset link sent to <strong>{email}</strong>. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <input
              className="mb-4 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm"
              type="email"
              placeholder="Registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-text-secondary">
          <Link href="/login" className="font-semibold text-gold">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
