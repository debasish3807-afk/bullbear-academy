import type { Metadata } from 'next'
import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Live Classes' }

const upcoming = [
  { title: 'Nifty Weekly Analysis', instructor: 'Rajesh Iyer', date: 'Mon, Jun 30 · 9:00 AM', registered: 842 },
  { title: 'Bank Nifty Expiry Strategy', instructor: 'Anil Mehta', date: 'Wed, Jul 2 · 2:30 PM', registered: 1124 },
  { title: 'Options Adjustment Workshop', instructor: 'Rajesh Iyer', date: 'Fri, Jul 4 · 10:00 AM', registered: 648 },
]

const recordings = [
  { title: 'Nifty Weekly Outlook, Jun 22', duration: '58 min', rating: '4.8★' },
  { title: 'Options Expiry Breakdown', duration: '46 min', rating: '4.9★' },
  { title: 'FII DII Positioning Session', duration: '38 min', rating: '4.7★' },
  { title: 'Price Action Masterclass Recap', duration: '62 min', rating: '4.9★' },
]

export default function LivePage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Live Classes</h1>
          <p className="mx-auto max-w-[540px] text-text-secondary">Trade with mentors in real time, then rewatch the recordings at your pace.</p>
        </div>
        <h2 className="mb-4 text-lg font-bold">Upcoming Sessions</h2>
        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          {upcoming.map((cls) => (
            <Card key={cls.title}>
              <Badge variant="green" className="mb-3">{cls.date}</Badge>
              <h3 className="mb-1 font-semibold">{cls.title}</h3>
              <p className="mb-3 text-sm text-text-muted">with {cls.instructor} · {cls.registered} registered</p>
              <div className="flex gap-2">
                <Button size="sm">Join Live</Button>
                <Button variant="ghost" size="sm">Add to Calendar</Button>
              </div>
            </Card>
          ))}
        </div>
        <h2 className="mb-4 text-lg font-bold">Recording Library</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recordings.map((rec) => (
            <Card key={rec.title}>
              <h4 className="mb-1 text-sm font-semibold">{rec.title}</h4>
              <p className="mb-3 text-xs text-text-muted">{rec.duration} · {rec.rating}</p>
              <Link href="/dashboard"><Button variant="ghost" size="sm">Watch</Button></Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
