import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MarketTicker } from '@/components/layout/MarketTicker'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'BullBear Academy | Premium Trading Education Platform',
    template: '%s | BullBear Academy',
  },
  description:
    'Master stock market trading with AI-powered courses, live mentorship, professional tools, and a community of 50,000+ Indian traders.',
  keywords: ['trading education', 'stock market courses', 'options trading', 'nifty', 'Indian stock market'],
  authors: [{ name: 'BullBear Academy' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bullbearacademy.in',
    siteName: 'BullBear Academy',
    title: 'BullBear Academy | Premium Trading Education',
    description: 'India\'s most advanced trading education platform.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="fixed left-4 top-[-60px] z-[999] rounded-btn bg-gold px-4 py-2 font-bold text-bg transition-all focus:top-12">
          Skip to content
        </a>
        <MarketTicker />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
