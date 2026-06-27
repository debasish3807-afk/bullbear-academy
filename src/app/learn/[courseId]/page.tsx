'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { VideoPlayer, CourseProgress } from '@/components/lms'
import { Card, Button, Badge } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { getCourse, getEnrollment, updateProgress, updateCurrentLesson, addTimeSpent, updateStreak } from '@/lib/lms'
import type { Course, Enrollment, Section, Lesson } from '@/lib/lms/types'

interface Props {
  params: Promise<{ courseId: string }>
}

export default function LearnPage({ params }: Props) {
  const { courseId } = use(params)
  const { user } = useAuth()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    Promise.all([getCourse(courseId), getEnrollment(user.uid, courseId)]).then(([c, e]) => {
      if (!c) { router.push('/courses'); return }
      if (!e) { router.push(`/courses/${c.slug}`); return }
      setCourse(c)
      setEnrollment(e)
      // Find current lesson
      for (const section of c.sections) {
        const lesson = section.lessons.find((l) => l.id === e.currentLessonId)
        if (lesson) { setCurrentLesson(lesson); break }
      }
      setLoading(false)
    })
  }, [user, courseId, router])

  const handleLessonClick = (lessonId: string, sectionId: string) => {
    if (!course || !user) return
    for (const section of course.sections) {
      const lesson = section.lessons.find((l) => l.id === lessonId)
      if (lesson) {
        setCurrentLesson(lesson)
        updateCurrentLesson(user.uid, courseId, lessonId, sectionId)
        break
      }
    }
  }

  const handleLessonComplete = () => {
    if (!user || !course || !currentLesson) return
    updateProgress(user.uid, courseId, currentLesson.id, course.totalLessons)
    updateStreak(user.uid)
    // Refresh enrollment
    getEnrollment(user.uid, courseId).then(setEnrollment)
  }

  const handleNextLesson = () => {
    if (!course || !currentLesson) return
    const allLessons = course.sections.flatMap((s) => s.lessons)
    const idx = allLessons.findIndex((l) => l.id === currentLesson.id)
    if (idx < allLessons.length - 1) {
      const next = allLessons[idx + 1]
      const section = course.sections.find((s) => s.lessons.some((l) => l.id === next.id))
      if (section) handleLessonClick(next.id, section.id)
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center"><p className="text-text-muted">Loading course...</p></div>
  if (!course || !enrollment || !currentLesson) return null

  return (
    <div className="px-6 pb-16 pt-[92px]">
      <div className="container-main">
        <div className="mb-4">
          <h1 className="text-lg font-bold">{course.title}</h1>
          <p className="text-sm text-text-muted">Lesson: {currentLesson.title}</p>
        </div>
        <div className="grid items-start gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-4">
            {currentLesson.type === 'video' && currentLesson.videoUrl ? (
              <VideoPlayer
                videoUrl={currentLesson.videoUrl}
                lessonId={currentLesson.id}
                courseId={courseId}
                onComplete={handleLessonComplete}
                onNextLesson={handleNextLesson}
              />
            ) : (
              <Card>
                <h3 className="mb-3 font-semibold">{currentLesson.title}</h3>
                {currentLesson.type === 'pdf' && currentLesson.pdfUrl && (
                  <a href={currentLesson.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline">Open PDF</a>
                )}
                {currentLesson.content && <div className="text-sm leading-relaxed text-text-secondary" dangerouslySetInnerHTML={{ __html: currentLesson.content }} />}
                <Button className="mt-4" onClick={handleLessonComplete}>Mark Complete</Button>
              </Card>
            )}
            {currentLesson.attachments.length > 0 && (
              <Card>
                <h4 className="mb-2 text-sm font-semibold">Resources</h4>
                <div className="space-y-2">
                  {currentLesson.attachments.map((att) => (
                    <a key={att.id} href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-btn bg-bg-elevated p-2.5 text-sm text-text-secondary hover:text-gold">
                      <span>{att.type === 'pdf' ? '📄' : '📎'}</span> {att.name}
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>
          <CourseProgress enrollment={enrollment} sections={course.sections} onLessonClick={handleLessonClick} />
        </div>
      </div>
    </div>
  )
}
