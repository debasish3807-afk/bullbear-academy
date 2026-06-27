import type { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = { title: 'Notifications' }

const notifications = [
  { color: 'bg-gold', title: 'New lesson published', desc: 'Chapter 9: Fibonacci Retracements is live.', time: '2 hrs ago' },
  { color: 'bg-emerald', title: 'Assignment graded', desc: 'Market Journal scored 88/100. Feedback ready.', time: '5 hrs ago' },
  { color: 'bg-info', title: 'Live class tomorrow', desc: 'Nifty Weekly Analysis at 9:00 AM.', time: '8 hrs ago' },
  { color: 'bg-gold', title: 'Streak reminder', desc: 'Complete 1 lesson to keep your 12-day streak.', time: '12 hrs ago' },
  { color: 'bg-text-muted', title: 'Community reply', desc: 'Aarav replied to your IV rank question.', time: '1 day ago' },
]

export default function NotificationsPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[650px]">
        <h1 className="mb-6 text-2xl font-bold">Notifications</h1>
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <Card key={i} className="flex gap-3 p-4">
              <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${n.color}`} />
              <div>
                <strong className="text-sm">{n.title}</strong>
                <p className="text-xs text-text-secondary">{n.desc}</p>
                <span className="text-[0.7rem] text-text-muted">{n.time}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
