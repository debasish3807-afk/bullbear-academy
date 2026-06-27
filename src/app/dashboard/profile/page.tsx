import type { Metadata } from 'next'
import { Card, Badge, Progress } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Profile' }

export default function ProfilePage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[760px]">
        <Card className="mb-5 flex flex-wrap items-center gap-4">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gold-dim text-xl font-bold text-gold">SB</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Sona Biswas</h2>
            <p className="text-sm text-text-secondary">debasishbiswas9378@gmail.com</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="gold">Pro Trader</Badge>
              <Badge variant="green">Level 12</Badge>
              <Badge variant="blue">12-day streak</Badge>
            </div>
          </div>
          <Link href="/dashboard/settings" className="rounded-btn border border-gold px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-bg">Edit Profile</Link>
        </Card>
        <div className="mb-5 grid gap-4 sm:grid-cols-4">
          <Card><strong className="font-heading text-xl">6</strong><div className="text-xs text-text-muted">Courses</div></Card>
          <Card><strong className="font-heading text-xl">124</strong><div className="text-xs text-text-muted">Lessons</div></Card>
          <Card><strong className="font-heading text-xl">2,840</strong><div className="text-xs text-text-muted">XP</div></Card>
          <Card><strong className="font-heading text-xl">4</strong><div className="text-xs text-text-muted">Certificates</div></Card>
        </div>
        <h3 className="mb-3 font-semibold">Enrolled Courses</h3>
        <div className="space-y-3">
          {[{ name: 'Technical Analysis Masterclass', progress: 68 }, { name: 'Options Trading: Zero to Pro', progress: 32 }, { name: 'Trading Psychology', progress: 72 }].map((c) => (
            <Card key={c.name} className="flex items-center justify-between gap-4">
              <div className="flex-1"><strong className="text-sm">{c.name}</strong><Progress value={c.progress} className="mt-2 max-w-[200px]" /></div>
              <span className="text-sm text-text-muted">{c.progress}%</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
