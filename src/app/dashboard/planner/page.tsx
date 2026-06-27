import type { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = { title: 'Study Planner' }

const days = [
  { day: 'Mon 30', events: ['Live class 9 AM', 'Lesson: VWAP'] },
  { day: 'Tue 1', events: ['Quiz due: Greeks'] },
  { day: 'Wed 2', events: ['Expiry session 2:30 PM'] },
  { day: 'Thu 3', events: ['Journal review'] },
  { day: 'Fri 4', events: ['Assignment due'] },
  { day: 'Sat 5', events: ['Market recap'] },
  { day: 'Sun 6', events: ['Rest or review'] },
]

export default function PlannerPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-6 text-2xl font-bold">Study Planner</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {days.map((d) => (
            <Card key={d.day} className="p-3">
              <strong className="text-sm">{d.day}</strong>
              {d.events.map((evt) => (
                <div key={evt} className="mt-2 rounded-lg bg-gold-dim px-2 py-1 text-[0.7rem] font-semibold text-gold">{evt}</div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
