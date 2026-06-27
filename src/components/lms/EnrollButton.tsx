'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { enrollStudent, getEnrollment } from '@/lib/lms'
import type { Course } from '@/lib/lms/types'

interface EnrollButtonProps {
  course: Course
  className?: string
}

export function EnrollButton({ course, className }: EnrollButtonProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  const handleEnroll = async () => {
    if (!isAuthenticated || !user) {
      router.push('/login')
      return
    }
    setLoading(true)
    try {
      // Check existing enrollment
      const existing = await getEnrollment(user.uid, course.id)
      if (existing) {
        router.push(`/learn/${course.id}`)
        return
      }
      // Get first lesson
      const firstSection = course.sections[0]
      const firstLesson = firstSection?.lessons[0]
      if (!firstSection || !firstLesson) return

      await enrollStudent(user.uid, course.id, course.title, firstLesson.id, firstSection.id)
      setEnrolled(true)
      router.push(`/learn/${course.id}`)
    } catch (err) {
      console.error('Enrollment failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className={className} onClick={handleEnroll} disabled={loading}>
      {loading ? 'Enrolling...' : enrolled ? 'Go to Course' : course.price === 0 ? 'Enroll Free' : `Enroll (₹${course.price.toLocaleString('en-IN')})`}
    </Button>
  )
}
