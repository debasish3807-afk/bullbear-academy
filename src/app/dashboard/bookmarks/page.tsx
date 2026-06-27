import type { Metadata } from 'next'
import { Card } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Bookmarks' }

const bookmarks = [
  { icon: '📹', title: 'Understanding Delta and Gamma', sub: 'Options Trading, Lesson 14', href: '/dashboard/video' },
  { icon: '📝', title: 'Fibonacci Retracement Levels', sub: 'Technical Analysis, Lesson 28', href: '/dashboard/video' },
  { icon: '💬', title: 'Aarav\'s Nifty Triangle Analysis', sub: 'Community post', href: '/community' },
  { icon: '📊', title: 'Position Sizing Worksheet', sub: 'Risk Management, Download', href: '/tools' },
]

export default function BookmarksPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[650px]">
        <h1 className="mb-6 text-2xl font-bold">Bookmarks</h1>
        <div className="space-y-3">
          {bookmarks.map((b) => (
            <Link key={b.title} href={b.href}>
              <Card className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-bg-elevated">{b.icon}</div>
                <div className="flex-1">
                  <strong className="text-sm">{b.title}</strong>
                  <div className="text-xs text-text-muted">{b.sub}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
