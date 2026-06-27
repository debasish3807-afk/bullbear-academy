'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { logout } from '@/lib/firebase'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/live', label: 'Live Classes' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/tools', label: 'Tools' },
  { href: '/market-analysis', label: 'Markets' },
  { href: '/blog', label: 'Blog' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, profile, loading } = useAuth()
  const router = useRouter()

  async function handleLogout() {
    await logout()
    router.push('/')
  }

  return (
    <nav className="fixed left-0 right-0 top-7 z-[200] border-b border-line bg-bg/95 px-6 py-3 backdrop-blur-xl" role="navigation" aria-label="Primary navigation">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold text-gold">
          <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
            <path d="M4 24L10 8L16 20L22 6L28 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity=".3" />
          </svg>
          BullBear
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[0.82rem] font-medium text-text-secondary transition-colors hover:bg-gold-dim hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!loading && (
            isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    {profile?.displayName?.split(' ')[0] || 'Dashboard'}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
                <Link href="/signup"><Button size="sm">Start Free</Button></Link>
              </>
            )
          )}
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="h-0.5 w-[18px] rounded bg-text-primary" />
            <span className="h-0.5 w-[18px] rounded bg-text-primary" />
            <span className="h-0.5 w-[18px] rounded bg-text-primary" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-line bg-bg-card p-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-gold-dim hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link href="/dashboard" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-gold" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          )}
        </div>
      )}
    </nav>
  )
}
