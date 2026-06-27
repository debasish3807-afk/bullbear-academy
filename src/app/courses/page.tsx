import type { Metadata } from 'next'
import { Card, Badge } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Courses' }

const courses = [
  { slug: 'stock-market-fundamentals', title: 'Stock Market Fundamentals', level: 'Beginner', hours: 12, lessons: 42, enrolled: '12.4k', price: 1999, rating: 4.9 },
  { slug: 'technical-analysis', title: 'Technical Analysis Masterclass', level: 'Intermediate', hours: 18, lessons: 64, enrolled: '8.2k', price: 3499, rating: 4.8 },
  { slug: 'options-trading', title: 'Options Trading: Zero to Pro', level: 'Advanced', hours: 24, lessons: 86, enrolled: '15.6k', price: 4999, rating: 4.9 },
  { slug: 'risk-management', title: 'Risk Management Essentials', level: 'Beginner', hours: 6, lessons: 24, enrolled: '9.8k', price: 999, rating: 4.9 },
  { slug: 'scalping-intraday', title: 'Scalping & Intraday Strategies', level: 'Advanced', hours: 16, lessons: 52, enrolled: '6.4k', price: 3999, rating: 4.7 },
  { slug: 'trading-psychology', title: 'Trading Psychology & Discipline', level: 'Intermediate', hours: 8, lessons: 32, enrolled: '7.1k', price: 1499, rating: 4.8 },
]

export default function CoursesPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Master every trading style</h1>
          <p className="mx-auto max-w-[560px] text-text-secondary">Structured courses taught by traders who survived bear markets.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`}>
              <Card className="group h-full cursor-pointer">
                <div className="mb-4 flex h-[140px] items-center justify-center rounded-[14px] bg-gradient-to-br from-bg-elevated to-bg">
                  <Badge variant={c.level === 'Beginner' ? 'green' : c.level === 'Intermediate' ? 'blue' : 'gold'}>{c.level}</Badge>
                </div>
                <h3 className="mb-1 font-semibold group-hover:text-gold">{c.title}</h3>
                <div className="mb-3 flex flex-wrap gap-3 text-xs text-text-muted">
                  <span>{c.hours} hrs</span><span>{c.lessons} lessons</span><span>{c.enrolled} learners</span>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-3">
                  <span className="font-bold text-gold">₹{c.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-text-muted">★ {c.rating}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
