import { Card, Badge, Button } from '@/components/ui'
import type { Certificate } from '@/lib/lms/types'

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const downloadPDF = () => {
    // In production: generate PDF via server function or pre-generated URL
    const content = `BullBear Academy Certificate\n\nThis certifies that ${certificate.userName} has successfully completed\n${certificate.courseTitle}\n\nInstructor: ${certificate.instructorName}\nVerification ID: ${certificate.verificationId}\nIssued: ${certificate.issuedAt?.toDate?.()?.toLocaleDateString() || 'N/A'}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `BBA-Certificate-${certificate.verificationId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="text-center">
      <div className="mb-3 text-4xl">🏅</div>
      <h3 className="mb-1 text-sm font-semibold">{certificate.courseTitle}</h3>
      <p className="text-xs text-text-muted">Instructor: {certificate.instructorName}</p>
      <p className="mt-1 text-xs text-text-muted">ID: {certificate.verificationId}</p>
      <div className="mt-3 flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={downloadPDF}>Download</Button>
        <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`https://bullbearacademy.in/verify/${certificate.verificationId}`)}>Share</Button>
      </div>
    </Card>
  )
}
