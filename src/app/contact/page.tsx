import type { Metadata } from 'next'
import { Card, Button } from '@/components/ui'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Get in touch</h1>
          <p className="mx-auto max-w-[520px] text-text-secondary">Support, billing, partnerships, or feedback. We respond within 4 hours.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 font-semibold">Send a message</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm focus:border-gold" placeholder="Full name" />
              <input className="rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm focus:border-gold" type="email" placeholder="Email" />
            </div>
            <select className="mt-3 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm">
              <option>General inquiry</option><option>Technical support</option><option>Billing</option><option>Partnership</option>
            </select>
            <textarea className="mt-3 w-full rounded-btn border border-line bg-bg-elevated px-4 py-3 text-sm" rows={5} placeholder="Your message" />
            <Button className="mt-4">Send Message</Button>
          </Card>
          <div className="space-y-4">
            <Card><h4 className="font-semibold">Email</h4><p className="text-sm text-text-secondary">support@bullbearacademy.in</p></Card>
            <Card><h4 className="font-semibold">WhatsApp</h4><p className="text-sm text-text-secondary">+91 98765 43210, Mon-Sat 9 AM to 6 PM</p></Card>
            <Card><h4 className="font-semibold">Office</h4><p className="text-sm text-text-secondary">WeWork, BKC, Mumbai 400051</p></Card>
          </div>
        </div>
      </div>
    </div>
  )
}
