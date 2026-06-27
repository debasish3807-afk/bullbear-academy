import type { Metadata } from 'next'
import { Card, Button } from '@/components/ui'

export const metadata: Metadata = { title: 'Referrals' }

export default function ReferralsPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[600px]">
        <h1 className="mb-6 text-2xl font-bold">Referral Dashboard</h1>
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <Card><strong className="font-heading text-xl">12</strong><div className="text-xs text-text-muted">Invites sent</div></Card>
          <Card><strong className="font-heading text-xl">5</strong><div className="text-xs text-text-muted">Joins</div></Card>
          <Card><strong className="font-heading text-xl text-gold">₹1,200</strong><div className="text-xs text-text-muted">Earned</div></Card>
        </div>
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Your referral link</h3>
          <div className="flex gap-3">
            <input readOnly value="https://bullbearacademy.in/r/sona12" className="flex-1 rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
            <Button size="sm">Copy</Button>
          </div>
          <p className="mt-3 text-xs text-text-muted">Earn ₹300 for every paid signup through your link. 14-day hold period.</p>
        </Card>
      </div>
    </div>
  )
}
