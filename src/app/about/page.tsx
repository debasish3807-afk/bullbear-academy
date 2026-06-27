import type { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Building India&apos;s most trusted trading school</h1>
          <p className="mx-auto max-w-[560px] text-text-secondary">Founded by traders who learned the expensive way.</p>
        </div>
        <div className="mb-12 grid items-start gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xl font-bold">Our Mission</h2>
            <p className="leading-relaxed text-text-secondary">
              Make professional-grade trading education accessible, structured, and honest. We teach risk management before strategy, psychology before indicators, and discipline before excitement. That sequence is why our learners outperform.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card><div className="font-heading text-2xl font-extrabold">50,000+</div><div className="text-xs text-text-muted">Active learners</div></Card>
            <Card><div className="font-heading text-2xl font-extrabold">92%</div><div className="text-xs text-text-muted">Improved results</div></Card>
            <Card><div className="font-heading text-2xl font-extrabold">4.9/5</div><div className="text-xs text-text-muted">Average rating</div></Card>
            <Card><div className="font-heading text-2xl font-extrabold">25+</div><div className="text-xs text-text-muted">Courses</div></Card>
          </div>
        </div>
        <h2 className="mb-4 text-xl font-bold">Leadership Team</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <Card><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-dim font-bold text-gold">RI</div><h3 className="font-semibold">Rajesh Iyer</h3><p className="text-sm text-text-secondary">Co-founder, derivatives educator, former prop trader.</p></Card>
          <Card><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-dim font-bold text-gold">PM</div><h3 className="font-semibold">Priya Menon</h3><p className="text-sm text-text-secondary">Co-founder, product and learning design.</p></Card>
          <Card><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-dim font-bold text-gold">KR</div><h3 className="font-semibold">Karthik Rao</h3><p className="text-sm text-text-secondary">Head of trading education, price action specialist.</p></Card>
        </div>
      </div>
    </div>
  )
}
