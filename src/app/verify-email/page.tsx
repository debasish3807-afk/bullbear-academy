import { Button } from '@/components/ui'
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-[420px] rounded-[24px] border border-line bg-bg-card p-9 text-center">
        <div className="mb-4 text-4xl">✉️</div>
        <h2 className="mb-2 text-2xl font-bold">Check your inbox</h2>
        <p className="mb-6 text-sm text-text-secondary">
          We sent a verification link to your email. Click it to activate your account.
        </p>
        <div className="flex justify-center gap-3">
          <Button>Resend Email</Button>
          <Link href="/dashboard"><Button variant="outline">I&apos;ve Verified</Button></Link>
        </div>
      </div>
    </div>
  )
}
