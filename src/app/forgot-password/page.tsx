'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[400px] rounded-[24px] border border-line bg-bg-card p-9">
        <h2 className="mb-2 text-center text-2xl font-bold">Forgot Password</h2>
        <p className="mb-6 text-center text-sm text-text-secondary">Enter your email to receive a reset link.</p>
        <input className="mb-4 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" type="email" placeholder="Registered email" />
        <Button className="w-full">Send Reset Link</Button>
        <p className="mt-4 text-center text-sm text-text-secondary">
          <Link href="/login" className="font-semibold text-gold">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
