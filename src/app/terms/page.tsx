import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function TermsPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="mx-auto max-w-[700px]">
        <h1 className="mb-3 text-center text-3xl font-bold">Terms & Conditions</h1>
        <p className="mb-8 text-center text-sm text-text-muted">Last updated: June 2026</p>
        <div className="space-y-6 text-text-secondary">
          <section><h2 className="mb-2 text-lg font-bold text-gold">Platform Use</h2><p className="leading-relaxed">Content is licensed for personal learning only. No redistribution, credential sharing, or automated scraping. Your subscription grants a personal, non-transferable license.</p></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">Disclaimer</h2><p className="leading-relaxed">BullBear Academy provides education, not financial advice. We are not SEBI-registered investment advisors. All trading involves risk. Past performance does not guarantee future results.</p></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">Liability</h2><p className="leading-relaxed">Total liability limited to 12 months of subscription fees. Not liable for trading losses or missed opportunities based on educational content.</p></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">Jurisdiction</h2><p className="leading-relaxed">Governed by laws of India. Subject to exclusive jurisdiction of courts in Mumbai, Maharashtra.</p></section>
        </div>
      </div>
    </div>
  )
}
