import Link from 'next/link'
import { Button, Card, Badge } from '@/components/ui'

const features = [
  { icon: '🧠', title: 'AI Trading Mentor', desc: 'Personalized study plans, weakness detection, and adaptive recommendations.' },
  { icon: '📹', title: 'Live Market Classes', desc: 'Learn while markets are open. Real setups, real decisions, no hindsight.' },
  { icon: '📊', title: 'Professional Tools', desc: 'Position sizing, Greeks, brokerage, SIP. Serious tools for serious traders.' },
  { icon: '🏆', title: 'Gamified Learning', desc: 'XP, streaks, badges, leaderboards. Consistency over motivation.' },
  { icon: '🛡️', title: 'Risk Management First', desc: 'Capital protection before strategy. The right order.' },
  { icon: '👥', title: 'Structured Community', desc: 'Charts, journals, questions, reviews. Signal over noise.' },
]

export default function HomePage() {
  return (
    <>
      <section className="flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-[150px]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="gold" className="mb-5">Trusted by 50,000+ Indian Traders</Badge>
            <h1 className="mb-4 text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight">
              Master the Markets.<br />Trade with <span className="text-gold">Confidence.</span>
            </h1>
            <p className="mb-7 max-w-[520px] text-[1.05rem] leading-relaxed text-text-secondary">
              India&apos;s premium trading education platform with AI-powered learning, live mentorship, professional tools, and a community of serious traders.
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              <Link href="/courses"><Button size="lg">Explore Courses</Button></Link>
              <Link href="/pricing"><Button variant="outline" size="lg">View Pricing</Button></Link>
            </div>
            <div className="flex gap-8">
              <div><div className="font-heading text-2xl font-extrabold">50,000+</div><div className="text-xs text-text-muted">Active learners</div></div>
              <div><div className="font-heading text-2xl font-extrabold">4.9/5</div><div className="text-xs text-text-muted">Course rating</div></div>
              <div><div className="font-heading text-2xl font-extrabold">200+</div><div className="text-xs text-text-muted">Video lessons</div></div>
            </div>
          </div>
          <div className="flex justify-center">
            <Card className="w-full max-w-[400px] shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-text-secondary">Portfolio Performance</span>
                <Badge variant="green">+24.8% YTD</Badge>
              </div>
              <div className="flex h-[170px] items-end gap-1 rounded-[14px] bg-bg-elevated p-3">
                {[40, 55, 35, 70, 50, 85, 60, 90, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-gold to-gold/35" style={{ height: `${h}%` }} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="container-main">
          <h2 className="mb-2 text-[clamp(1.5rem,3vw,2.4rem)] font-bold">Everything you need to become profitable</h2>
          <p className="mb-8 max-w-[560px] text-text-secondary">From beginner to advanced. AI adapts to your pace and style.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-btn bg-gold-dim text-xl">{f.icon}</div>
                <h3 className="mb-1.5 font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_70%)]" />
        <h2 className="relative mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold">Ready to trade smarter?</h2>
        <p className="relative mx-auto mb-6 max-w-[460px] text-text-secondary">
          Join 50,000+ traders who chose structured learning over random advice.
        </p>
        <Link href="/signup"><Button size="lg" className="relative">Start 7-Day Free Trial</Button></Link>
      </section>
    </>
  )
}
