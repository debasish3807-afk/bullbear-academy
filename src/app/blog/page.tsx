import type { Metadata } from 'next'
import { Card, Badge } from '@/components/ui'

export const metadata: Metadata = { title: 'Blog' }

const posts = [
  { title: 'How to Use Open Interest Without Fooling Yourself', category: 'Options', author: 'Sneha Mukherjee', time: '8 min', color: 'gold' as const },
  { title: 'Nifty Expiry Playbook for July', category: 'Strategy', author: 'Rajesh Iyer', time: '12 min', color: 'green' as const },
  { title: 'Why Most Traders Ignore Position Sizing', category: 'Psychology', author: 'Priya Menon', time: '6 min', color: 'blue' as const },
  { title: 'The Opening Range Breakout: Refined', category: 'Intraday', author: 'Karthik Rao', time: '10 min', color: 'gold' as const },
  { title: 'Reading Quarterly Results Like a Pro', category: 'Fundamentals', author: 'Sneha Mukherjee', time: '9 min', color: 'green' as const },
  { title: 'The 2% Rule Is Wrong (For Most People)', category: 'Risk', author: 'Rajesh Iyer', time: '7 min', color: 'blue' as const },
]

export default function BlogPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Trading Blog</h1>
          <p className="mx-auto max-w-[520px] text-text-secondary">Insights that are useful, not keyword-stuffed fluff.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} className="cursor-pointer">
              <Badge variant={post.color} className="mb-3">{post.category}</Badge>
              <h3 className="mb-2 font-semibold leading-snug">{post.title}</h3>
              <p className="text-sm text-text-secondary">Deep-dive analysis from our expert team.</p>
              <div className="mt-3 text-xs text-text-muted">{post.author} · {post.time} read</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
