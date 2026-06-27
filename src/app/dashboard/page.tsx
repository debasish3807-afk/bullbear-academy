'use client'

import { Card, Badge, Progress } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function DashboardPage() {
  const { profile } = useAuth()
  const displayName = profile?.displayName?.split(' ')[0] || 'Trader'

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-1 text-2xl font-bold">Welcome back, {displayName} 👋</h1>
        <p className="mb-6 text-sm text-text-secondary">
          {profile?.streak ? `${profile.streak}-day streak. Keep pushing.` : 'Start your first lesson today.'}
        </p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><div className="font-heading text-2xl font-extrabold">6</div><div className="text-xs text-text-muted">Courses enrolled</div></Card>
          <Card><div className="font-heading text-2xl font-extrabold">124</div><div className="text-xs text-text-muted">Lessons completed</div></Card>
          <Card><div className="font-heading text-2xl font-extrabold text-gold">🔥 {profile?.streak || 0}</div><div className="text-xs text-text-muted">Current streak</div></Card>
          <Card><div className="font-heading text-2xl font-extrabold">{(profile?.xp || 0).toLocaleString()}</div><div className="text-xs text-text-muted">Total XP</div></Card>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          <Link href="/dashboard/profile"><Badge variant="gold">Profile</Badge></Link>
          <Link href="/dashboard/certificates"><Badge variant="green">Certificates</Badge></Link>
          <Link href="/dashboard/quiz"><Badge variant="blue">Quizzes</Badge></Link>
          <Link href="/dashboard/assignments"><Badge variant="gold">Assignments</Badge></Link>
          <Link href="/dashboard/leaderboard"><Badge variant="green">Leaderboard</Badge></Link>
          <Link href="/dashboard/planner"><Badge variant="blue">Study Planner</Badge></Link>
          <Link href="/dashboard/wallet"><Badge variant="gold">Wallet</Badge></Link>
          <Link href="/dashboard/referrals"><Badge variant="green">Referrals</Badge></Link>
          <Link href="/dashboard/bookmarks"><Badge variant="blue">Bookmarks</Badge></Link>
          <Link href="/dashboard/wishlist"><Badge variant="gold">Wishlist</Badge></Link>
          <Link href="/dashboard/notifications"><Badge variant="blue">Notifications</Badge></Link>
          <Link href="/dashboard/settings"><Badge variant="gold">Settings</Badge></Link>
        </div>
        <h2 className="mb-3 text-lg font-bold">Continue Learning</h2>
        <div className="space-y-3">
          <Link href="/dashboard/video">
            <Card className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-bg-elevated text-lg">📊</div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">Technical Analysis Masterclass</h4>
                <p className="text-xs text-text-muted">Ch 8: Support & Resistance</p>
                <Progress value={68} className="mt-2" />
              </div>
              <Badge variant="gold">68%</Badge>
            </Card>
          </Link>
          <Link href="/dashboard/video">
            <Card className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-bg-elevated text-lg">🔀</div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">Options Trading: Zero to Pro</h4>
                <p className="text-xs text-text-muted">Ch 4: Understanding Greeks</p>
                <Progress value={32} className="mt-2" />
              </div>
              <Badge variant="gold">32%</Badge>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
