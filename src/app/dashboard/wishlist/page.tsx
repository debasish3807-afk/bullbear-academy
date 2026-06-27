import type { Metadata } from 'next'
import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Wishlist' }

const items = [
  { title: 'Futures Trading Masterclass', level: 'Advanced', price: 4499, desc: 'Margins, rollover, spread trading, and hedging with futures.' },
  { title: 'Price Action & Supply Demand', level: 'Intermediate', price: 2999, desc: 'Institutional supply/demand zones and naked chart reading.' },
  { title: 'Swing Trading System', level: 'Intermediate', price: 2499, desc: 'Position holding for 2-10 days with clear rules.' },
]

export default function WishlistPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-6 text-2xl font-bold">Wishlist</h1>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title}>
              <Badge variant={item.level === 'Advanced' ? 'gold' : 'blue'} className="mb-3">{item.level}</Badge>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="mb-3 text-sm text-text-secondary">{item.desc}</p>
              <div className="flex items-center justify-between">
                <strong className="text-gold">₹{item.price.toLocaleString('en-IN')}</strong>
                <Link href="/signup"><Button size="sm">Enroll</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
