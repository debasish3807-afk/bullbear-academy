import type { Metadata } from 'next'
import { Card, Badge, Button, Progress } from '@/components/ui'

export const metadata: Metadata = { title: 'Certificates' }

const certs = [
  { name: 'Risk Management Essentials', date: 'Jun 14, 2026', id: 'BBA-CERT-2847', earned: true },
  { name: 'Stock Market Fundamentals', date: 'May 22, 2026', id: 'BBA-CERT-2201', earned: true },
  { name: 'Candlestick Patterns', date: 'Apr 8, 2026', id: 'BBA-CERT-1847', earned: true },
  { name: 'Technical Analysis Masterclass', date: '', id: '', earned: false, progress: 68 },
]

export default function CertificatesPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-2 text-2xl font-bold">Certificates</h1>
        <p className="mb-6 text-sm text-text-secondary">Verified credentials, shareable on LinkedIn.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <Card key={cert.name} className={`text-center ${!cert.earned ? 'opacity-60' : ''}`}>
              <div className="mb-3 text-4xl">{cert.earned ? '🏅' : '🔒'}</div>
              <h3 className="mb-1 text-sm font-semibold">{cert.name}</h3>
              {cert.earned ? (
                <>
                  <p className="text-xs text-text-muted">Completed {cert.date}</p>
                  <p className="text-xs text-text-muted">{cert.id}</p>
                  <div className="mt-3 flex justify-center gap-2">
                    <Button variant="outline" size="sm">Download</Button>
                    <Button variant="ghost" size="sm">Share</Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-text-muted">{cert.progress}% complete</p>
                  <Progress value={cert.progress!} className="mx-auto mt-2 max-w-[140px]" />
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
