import type { Metadata } from 'next'
import { Card, Badge, Button } from '@/components/ui'

export const metadata: Metadata = { title: 'Assignments' }

export default function AssignmentsPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[700px]">
        <h1 className="mb-2 text-2xl font-bold">Assignments</h1>
        <p className="mb-6 text-sm text-text-secondary">Practical exercises graded by mentors within 48 hours.</p>
        <div className="space-y-4">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><strong>Weekly Market Journal</strong><div className="text-xs text-text-muted">Due Jul 2 · Beginner Track</div></div>
              <Badge variant="green">Submitted · 88/100</Badge>
            </div>
            <p className="mt-2 text-sm text-text-secondary">Feedback: Solid trade selection. Improve post-trade review quality.</p>
          </Card>
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><strong>Options Strategy Build</strong><div className="text-xs text-text-muted">Due Jul 5 · Options Track</div></div>
              <Badge variant="gold">In Progress</Badge>
            </div>
            <p className="mt-2 text-sm text-text-secondary">Design a bull call spread on Nifty weekly. Document max loss, profit, breakeven, exits.</p>
            <Button className="mt-3" size="sm">Upload Submission</Button>
          </Card>
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><strong>Risk Plan Template</strong><div className="text-xs text-text-muted">Due Jul 8 · Risk Management</div></div>
              <Badge variant="blue">Not Started</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
