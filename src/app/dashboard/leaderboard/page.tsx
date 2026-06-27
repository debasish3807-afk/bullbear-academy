import type { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = { title: 'Leaderboard' }

const leaders = [
  { rank: 1, name: 'Sanjana Das', initials: 'SD', xp: 4920, streak: 34 },
  { rank: 2, name: 'Aarav Mehta', initials: 'AM', xp: 4610, streak: 29 },
  { rank: 3, name: 'Sona Biswas', initials: 'SB', xp: 2840, streak: 12 },
  { rank: 4, name: 'Mousumi Roy', initials: 'MR', xp: 2640, streak: 22 },
  { rank: 5, name: 'Vivek Jain', initials: 'VJ', xp: 2180, streak: 17 },
]

export default function LeaderboardPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[650px]">
        <h1 className="mb-6 text-2xl font-bold">Leaderboard</h1>
        <div className="space-y-3">
          {leaders.map((l) => (
            <Card key={l.rank} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <strong className="w-6 text-center text-lg">{l.rank}</strong>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-dim font-bold text-gold">{l.initials}</div>
                <div><strong className="text-sm">{l.name}</strong><div className="text-xs text-text-muted">{l.streak}-day streak</div></div>
              </div>
              <strong className="font-heading text-gold">{l.xp.toLocaleString()} XP</strong>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
