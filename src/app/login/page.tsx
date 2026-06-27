'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmail(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.code === 'auth/invalid-credential' ? 'Invalid email or password.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[400px] rounded-[24px] border border-line bg-bg-card p-9">
        <h2 className="mb-1 text-center text-2xl font-bold">Welcome Back</h2>
        <p className="mb-6 text-center text-sm text-text-secondary">Log in to continue your trading journey</p>
        {error && <div className="mb-4 rounded-btn bg-danger-dim px-4 py-2.5 text-sm text-danger">{error}</div>}
        <div className="mb-4 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={handleGoogleLogin} disabled={loading}>Google</Button>
          <Button variant="ghost" className="flex-1" disabled>GitHub</Button>
        </div>
        <div className="mb-4 flex items-center gap-3 text-xs text-text-muted">
          <span className="h-px flex-1 bg-line" /><span>or</span><span className="h-px flex-1 bg-line" />
        </div>
        <form onSubmit={handleEmailLogin}>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        <div className="mt-3 text-center text-sm">
          <Link href="/forgot-password" className="text-gold hover:underline">Forgot password?</Link>
        </div>
        <p className="mt-4 text-center text-sm text-text-secondary">
          No account? <Link href="/signup" className="font-semibold text-gold">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
