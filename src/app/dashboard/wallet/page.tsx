import type { Metadata } from 'next'
import { Card, Button } from '@/components/ui'

export const metadata: Metadata = { title: 'Wallet' }

export default function WalletPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[600px]">
        <h1 className="mb-6 text-2xl font-bold">Wallet & Billing</h1>
        <Card>
          <div className="border-b border-line pb-3"><span className="text-sm text-text-secondary">Current credit</span><strong className="ml-2 font-heading text-xl text-gold">₹300</strong></div>
          <div className="divide-y divide-line">
            <div className="flex items-center justify-between py-3 text-sm"><span>Pro Trader, Jun 2026</span><span>₹499 via UPI</span></div>
            <div className="flex items-center justify-between py-3 text-sm"><span>Referral reward</span><span className="text-emerald">+₹300</span></div>
            <div className="flex items-center justify-between py-3 text-sm"><span>Invoice BBA-10428</span><Button variant="ghost" size="sm">Download</Button></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
