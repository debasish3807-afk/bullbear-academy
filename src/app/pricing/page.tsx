import type { Metadata } from 'next'
import { Card, Button } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Pricing' }

export default function PricingPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main text-center">
        <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Invest in your trading education</h1>
        <p className="mx-auto mb-10 max-w-[520px] text-text-secondary">One bad trade costs more than a year&apos;s subscription.</p>
        <div className="mx-auto grid max-w-[960px] items-start gap-5 text-left md:grid-cols-3">
          <Card>
            <div className="text-sm text-text-secondary">Starter</div>
            <div className="my-1 font-heading text-3xl font-extrabold">Free</div>
            <div className="mb-5 text-xs text-text-muted">Forever, no card needed</div>
            <ul className="mb-6 space-y-2 text-sm text-text-secondary">
              <li>3 beginner courses</li><li>Basic tools</li><li>Community access</li><li>Market updates</li>
            </ul>
            <Link href="/signup"><Button variant="outline" className="w-full">Get Started</Button></Link>
          </Card>
          <Card className="relative border-gold shadow-[0_0_40px_rgba(212,175,55,0.08)]">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[0.68rem] font-bold text-bg">MOST POPULAR</div>
            <div className="text-sm text-text-secondary">Pro Trader</div>
            <div className="my-1 font-heading text-3xl font-extrabold">₹499<span className="text-sm font-normal text-text-muted">/mo</span></div>
            <div className="mb-5 text-xs text-text-muted">₹5,988 billed annually</div>
            <ul className="mb-6 space-y-2 text-sm text-text-secondary">
              <li>All 25+ courses</li><li>Live classes 3x/week</li><li>AI mentor</li><li>Advanced tools</li><li>Certificates</li><li>Mock exams</li>
            </ul>
            <Link href="/signup"><Button className="w-full">Start 7-Day Trial</Button></Link>
          </Card>
          <Card>
            <div className="text-sm text-text-secondary">Elite</div>
            <div className="my-1 font-heading text-3xl font-extrabold">₹999<span className="text-sm font-normal text-text-muted">/mo</span></div>
            <div className="mb-5 text-xs text-text-muted">Annual mentorship support</div>
            <ul className="mb-6 space-y-2 text-sm text-text-secondary">
              <li>Everything in Pro</li><li>1-on-1 mentor calls</li><li>Private signals</li><li>Portfolio reviews</li><li>Exclusive research</li>
            </ul>
            <Link href="/signup"><Button variant="outline" className="w-full">Try Elite</Button></Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
