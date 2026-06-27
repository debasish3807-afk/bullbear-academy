import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-heading text-[7rem] font-extrabold leading-none text-gold">404</h1>
        <h2 className="mt-2 text-2xl font-bold">Page not found</h2>
        <p className="mx-auto mt-3 max-w-[400px] text-text-secondary">
          This page might have been removed, renamed, or never existed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/"><Button>Go Home</Button></Link>
          <Link href="/support"><Button variant="outline">Support</Button></Link>
        </div>
      </div>
    </div>
  )
}
