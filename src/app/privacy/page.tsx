import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="mx-auto max-w-[700px]">
        <h1 className="mb-3 text-center text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-center text-sm text-text-muted">Last updated: June 2026</p>
        <div className="space-y-6 text-text-secondary">
          <section><h2 className="mb-2 text-lg font-bold text-gold">Information We Collect</h2><p className="leading-relaxed">Signup details (name, email, phone), payment metadata via Razorpay, learning progress, quiz responses, device analytics for platform improvement.</p></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">How We Use It</h2><p className="leading-relaxed">Course delivery, subscription management, AI study plan personalization, transactional notifications, performance analytics, and fraud prevention.</p></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">Your Rights</h2><p className="leading-relaxed">Export, correct, or delete your data anytime from Settings. We comply with India's DPDP Act 2023 and GDPR for EU users.</p></section>
          <section><h2 className="mb-2 text-lg font-bold text-gold">Security</h2><p className="leading-relaxed">TLS 1.3 in transit, AES-256 at rest. Firebase Authentication with optional 2FA. Production data access requires RBAC approval with full audit logging.</p></section>
        </div>
      </div>
    </div>
  )
}
