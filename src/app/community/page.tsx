'use client'

import { useState } from 'react'
import { Card, Badge, Button } from '@/components/ui'

const posts = [
  { author: 'Aarav Mehta', initials: 'AM', badge: 'Elite' as const, time: '2 hours ago', category: 'Chart Analysis', content: 'Nifty forming a clean ascending triangle on the daily. Resistance at 24,950 tested 3 times. If we break above on real volume, targeting 25,400 with stop below 24,600.', votes: 42, replies: 18 },
  { author: 'Sanjana Das', initials: 'SD', badge: 'Pro' as const, time: '5 hours ago', category: 'Trade Journal', content: 'Week 24 journal: 4 trades, 3 winners, 1 scratch. Net +2.1R. Biggest change: stopped averaging down. My losers are capped at 1R religiously now.', votes: 67, replies: 24 },
  { author: 'Nikhil Iyer', initials: 'NI', badge: 'Beginner' as const, time: '8 hours ago', category: 'Questions', content: 'Confused about IV rank vs historical volatility. When IV rank is at 80%, does that mean I should be selling options or is there more context needed?', votes: 11, replies: 9 },
]

export default function CommunityPage() {
  const [liked, setLiked] = useState<Record<number, boolean>>({})

  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="mx-auto max-w-[860px]">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Trader Community</h1>
          <p className="text-text-secondary">50,000+ traders sharing analysis, journals, and structured discussions.</p>
        </div>
        <Card className="mb-5">
          <h3 className="mb-3 text-sm font-semibold">Create post</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm">
              <option>Chart Analysis</option><option>Trade Journal</option><option>Question</option><option>Weekly Review</option>
            </select>
            <input className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" placeholder="Headline" />
          </div>
          <textarea className="mt-3 w-full rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" rows={3} placeholder="Share your analysis or question" />
          <Button className="mt-3" size="sm">Publish</Button>
        </Card>
        <div className="space-y-4">
          {posts.map((post, i) => (
            <Card key={i}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-dim font-bold text-gold">{post.initials}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm">{post.author}</strong>
                    <Badge variant={post.badge === 'Elite' ? 'gold' : post.badge === 'Pro' ? 'green' : 'blue'}>{post.badge}</Badge>
                  </div>
                  <div className="text-xs text-text-muted">{post.time} · {post.category}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">{post.content}</p>
              <div className="mt-3 flex gap-3">
                <Button variant="ghost" size="sm" onClick={() => setLiked(prev => ({ ...prev, [i]: !prev[i] }))}>
                  ▲ {liked[i] ? post.votes + 1 : post.votes}
                </Button>
                <Button variant="ghost" size="sm">💬 {post.replies}</Button>
                <Button variant="ghost" size="sm">🔖 Save</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
