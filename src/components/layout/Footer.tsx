import Link from 'next/link'

const footerLinks = {
  Platform: [
    { href: '/courses', label: 'Courses' },
    { href: '/live', label: 'Live Classes' },
    { href: '/tools', label: 'Tools' },
    { href: '/market-analysis', label: 'Market Analysis' },
    { href: '/blog', label: 'Blog' },
  ],
  Account: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/profile', label: 'Profile' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/support', label: 'Support' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/community', label: 'Community' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms' },
    { href: '/refund-policy', label: 'Refund Policy' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-card px-6 pb-6 pt-12">
      <div className="mx-auto grid max-w-[1240px] gap-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-heading text-sm font-extrabold text-gold">
            <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
              <path d="M4 24L10 8L16 20L22 6L28 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity=".3" />
            </svg>
            BullBear
          </Link>
          <p className="mt-3 max-w-[240px] text-xs leading-relaxed text-text-secondary">
            India&apos;s premium trading education platform. Learn, manage risk, trade with actual discipline.
          </p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-3 text-[0.72rem] font-bold uppercase tracking-wider text-text-muted">{title}</h4>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-1 text-[0.82rem] text-text-secondary transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 flex max-w-[1240px] flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-[0.75rem] text-text-muted">
        <span>&copy; 2026 BullBear Academy. Trading involves risk.</span>
        <span>Made in India 🇮🇳</span>
      </div>
    </footer>
  )
}
