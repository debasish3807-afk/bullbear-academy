'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { signUpWithEmail, signInWithGoogle } from '@/lib/firebase'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setError('')
    setLoading(true)
    try {
      await signUpWithEmail(email, password, name)
      router.push('/verify-email')
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') setError('Email already registered. Try logging in.')
      else if (err.code === 'auth/weak-password') setError('Password too weak. Use at least 8 characters.')
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignup() {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      router.push('/onboarding')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[400px] rounded-[24px] border border-line bg-bg-card p-9">
        <h2 className="mb-1 text-center text-2xl font-bold">Create Account</h2>
        <p className="mb-6 text-center text-sm text-text-secondary">7-day free trial. No card required.</p>
        {error && <div className="mb-4 rounded-btn bg-danger-dim px-4 py-2.5 text-sm text-danger">{error}</div>}
        <div className="mb-4 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={handleGoogleSignup} disabled={loading}>Google</Button>
          <Button variant="ghost" className="flex-1" disabled>GitHub</Button>
        </div>
        <div className="mb-4 flex items-center gap-3 text-xs text-text-muted">
          <span className="h-px flex-1 bg-line" /><span>or</span><span className="h-px flex-1 bg-line" />
        </div>
        <form onSubmit={handleSignup}>
          <input
            className="mb-3 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="mb-3 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="mb-4 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm"
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-text-secondary">
          Already registered? <Link href="/login" className="font-semibold text-gold">Log in</Link>
        </p>
      </div>
    </div>
  )
}
