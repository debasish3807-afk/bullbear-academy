import type { Metadata } from 'next'
import { Card, Badge, Button } from '@/components/ui'

export const metadata: Metadata = { title: 'Teacher Dashboard' }

export default function TeacherPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-1 text-2xl font-bold">Teacher Dashboard</h1>
        <p className="mb-6 text-sm text-text-secondary">Your courses, students, classes, and grading queue.</p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><strong className="font-heading text-2xl">4,210</strong><div className="text-xs text-text-muted">Students</div></Card>
          <Card><strong className="font-heading text-2xl">6</strong><div className="text-xs text-text-muted">Active Courses</div></Card>
          <Card><strong className="font-heading text-2xl">4.9</strong><div className="text-xs text-text-muted">Avg Rating</div></Card>
          <Card><strong className="font-heading text-2xl">₹1.84L</strong><div className="text-xs text-text-muted">Monthly Payout</div></Card>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="mb-3 font-semibold">My Courses</h3>
            <div className="space-y-3">
              {[
                { name: 'Options Trading: Zero to Pro', enrolled: '15,624', completion: 72, status: 'Live' },
                { name: 'Nifty Expiry Strategies', enrolled: '8,412', completion: 58, status: 'Live' },
                { name: 'Bank Nifty Masterclass', enrolled: '6,218', completion: 64, status: 'Live' },
                { name: 'Advanced Hedging Techniques', enrolled: 'Draft', completion: 75, status: 'Draft' },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-btn bg-bg-elevated p-3">
                  <div><strong className="text-sm">{c.name}</strong><div className="text-xs text-text-muted">{c.enrolled}{c.status === 'Live' ? ` enrolled · ${c.completion}% completion` : ' · 18/24 lessons'}</div></div>
                  <Badge variant={c.status === 'Live' ? 'green' : 'gold'}>{c.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Upcoming Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-btn bg-bg-elevated p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-emerald-dim text-[0.68rem] font-bold leading-tight text-emerald">MON<br/>30</div>
                <div><strong className="text-sm">Live: Nifty Weekly Analysis</strong><div className="text-xs text-text-muted">9:00 AM · 842 registered</div></div>
              </div>
              <div className="flex items-center gap-3 rounded-btn bg-bg-elevated p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-gold-dim text-[0.68rem] font-bold leading-tight text-gold">WED<br/>2</div>
                <div><strong className="text-sm">Live: Expiry Strategy</strong><div className="text-xs text-text-muted">2:30 PM · 1,124 registered</div></div>
              </div>
            </div>
            <h4 className="mb-2 mt-5 text-sm font-semibold">Pending Tasks</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-center justify-between">12 quiz submissions awaiting review <Button variant="ghost" size="sm">Review</Button></div>
              <div className="flex items-center justify-between">8 assignment evaluations pending <Button variant="ghost" size="sm">Evaluate</Button></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
