'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserCertificates } from '@/lib/lms'
import { CertificateCard } from '@/components/lms'
import type { Certificate } from '@/lib/lms/types'

export default function CertificatesPage() {
  const { user } = useAuth()
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserCertificates(user.uid).then(setCerts).finally(() => setLoading(false))
  }, [user])

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-2 text-2xl font-bold">My Certificates</h1>
        <p className="mb-6 text-sm text-text-secondary">Verified credentials earned through course completion.</p>
        {loading ? <p className="text-text-muted">Loading...</p> : (
          certs.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((cert) => <CertificateCard key={cert.id} certificate={cert} />)}
            </div>
          ) : (
            <div className="rounded-card border border-dashed border-line p-10 text-center text-text-secondary">
              Complete a course to earn your first certificate.
            </div>
          )
        )}
      </div>
    </div>
  )
}
