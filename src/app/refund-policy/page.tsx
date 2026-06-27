import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Refund Policy' }

export default function RefundPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="mx-auto max-w-[700px]">
        <h1 className="mb-3 text-center text-3xl font-bold">Refund Policy</h1>
        <div className="mt-8 space-y-6 text-text-secondary">
          <section><h2 className="mb-2 text-lg font-bold text-gold">7-Day Money-Back Guarantee</h2><p className="leading-relaxed">First-time subscribers can request a full refund within 7 days of purchase if less than 20% of content has been accessed and no certificate has been issued.</p></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">Non-Refundable</h2><ul className="list-disc space-y-1 pl-5"><li>Individual course purchases</li><li>Renewal payments</li><li>Terms violations</li><li>Gift subscriptions</li><li>Add-on services</li></ul></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">Processing</h2><p className="leading-relaxed">Approved refunds processed within 5-7 business days to original payment method. Email refunds@bullbearacademy.in with your order ID.</p></section>
        </div>
      </div>
    </div>
  )
}
