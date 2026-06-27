import type { Metadata } from 'next'
import { Card, Badge, Progress } from '@/components/ui'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-1 text-2xl font-bold">Welcome back, Sona 👋</h1>
        <p className="mb-6 text-sm text-text-secondary">12-day streak. Keep pushing.</p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><div className="font-heading text-2xl font-extrabold">6</div><div className="text-xs text-text-muted">Courses enrolled</div></Card>
          <Card><div className="font-heading text-2xl font-extrabold">124</div><div className="text-xs text-text-muted">Lessons completed</div></Card>
          <Card><div className="font-heading text-2xl font-extrabold text-gold">🔥 12</div><div className="text-xs text-text-muted">Current streak</div></Card>
          <Card><div className="font-heading text-2xl font-extrabold">2,840</div><div className="text-xs text-text-muted">Total XP</div></Card>
        </div>
        <h2 className="mb-3 text-lg font-bold">Continue Learning</h2>
        <div className="space-y-3">
          <Card className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-bg-elevated text-lg">📊</div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold">Technical Analysis Masterclass</h4>
              <p className="text-xs text-text-muted">Ch 8: Support & Resistance</p>
              <Progress value={68} className="mt-2" />
            </div>
            <Badge variant="gold">68%</Badge>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-bg-elevated text-lg">🔀</div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold">Options Trading: Zero to Pro</h4>
              <p className="text-xs text-text-muted">Ch 4: Understanding Greeks</p>
              <Progress value={32} className="mt-2" />
            </div>
            <Badge variant="gold">32%</Badge>
          </Card>
        </div>
      </div>
    </div>
  )
}
