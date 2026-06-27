'use client'

import { Card, Button } from '@/components/ui'
import Link from 'next/link'

export default function SupportPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Support Center</h1>
          <p className="text-text-secondary">Technical help, billing, course issues, and account fixes.</p>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="text-center"><div className="mb-2 text-2xl">💬</div><h4 className="font-semibold">Live Chat</h4><p className="text-xs text-text-muted">Avg response: 4 min</p></Card>
          <Card className="text-center"><div className="mb-2 text-2xl">📧</div><h4 className="font-semibold">Email</h4><p className="text-xs text-text-muted">support@bullbearacademy.in</p></Card>
          <Link href="/faq"><Card className="text-center"><div className="mb-2 text-2xl">❓</div><h4 className="font-semibold">FAQ</h4><p className="text-xs text-text-muted">Quick answers</p></Card></Link>
        </div>
        <Card className="mx-auto max-w-[600px]">
          <h3 className="mb-4 font-semibold">Submit a Ticket</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm"><option>Technical issue</option><option>Billing</option><option>Course content</option><option>Account</option></select>
            <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
          </div>
          <input className="mt-3 w-full rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" placeholder="Subject" />
          <textarea className="mt-3 w-full rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" rows={4} placeholder="Describe the issue" />
          <Button className="mt-4">Submit Ticket</Button>
        </Card>
      </div>
    </div>
  )
}
