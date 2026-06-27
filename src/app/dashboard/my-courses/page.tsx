'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, Badge, Progress, Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { getUserEnrollments } from '@/lib/lms'
import type { Enrollment } from '@/lib/lms/types'

export default function MyCoursesPage() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserEnrollments(user.uid).then(setEnrollments).finally(() => setLoading(false))
  }, [user])

  if (loading) return <div className="px-6 pt-[100px]"><p className="text-text-muted">Loading...</p></div>

  const active = enrollments.filter((e) => e.status === 'active')
  const completed = enrollments.filter((e) => e.status === 'completed')

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-6 text-2xl font-bold">My Courses</h1>
        {active.length > 0 && (
          <>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">In Progress</h2>
            <div className="mb-8 space-y-3">
              {active.map((e) => (
                <Link key={e.id} href={`/learn/${e.courseId}`}>
                  <Card className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-bg-elevated text-lg">📚</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{e.courseTitle}</h3>
                      <Progress value={e.progress} className="mt-2 max-w-[280px]" />
                    </div>
                    <div className="text-right">
                      <Badge variant="gold">{e.progress}%</Badge>
                      <div className="mt-1 text-xs text-text-muted">{e.completedLessons.length} lessons done</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
        {completed.length > 0 && (
          <>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">Completed</h2>
            <div className="space-y-3">
              {completed.map((e) => (
                <Card key={e.id} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-emerald-dim text-lg">✓</div>
                  <div className="flex-1"><h3 className="text-sm font-semibold">{e.courseTitle}</h3><p className="text-xs text-text-muted">Completed</p></div>
                  <Badge variant="green">100%</Badge>
                </Card>
              ))}
            </div>
          </>
        )}
        {enrollments.length === 0 && (
          <div className="rounded-card border border-dashed border-line p-10 text-center">
            <p className="mb-3 text-text-secondary">You haven't enrolled in any courses yet.</p>
            <Link href="/courses"><Button>Browse Courses</Button></Link>
          </div>
        )}
      </div>
    </div>
  )
}
