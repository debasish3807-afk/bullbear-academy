import { Card, Progress, Badge } from '@/components/ui'
import type { Enrollment, Section } from '@/lib/lms/types'

interface CourseProgressProps {
  enrollment: Enrollment
  sections: Section[]
  onLessonClick: (lessonId: string, sectionId: string) => void
}

export function CourseProgress({ enrollment, sections, onLessonClick }: CourseProgressProps) {
  const completedCount = enrollment.completedLessons.length
  const totalLessons = sections.reduce((sum, s) => sum + s.lessons.length, 0)
  const remaining = totalLessons - completedCount
  const hours = Math.floor(enrollment.totalTimeSpent / 60)
  const mins = enrollment.totalTimeSpent % 60

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Course Progress</h3>
        <Badge variant={enrollment.progress >= 100 ? 'green' : 'gold'}>{enrollment.progress}%</Badge>
      </div>
      <Progress value={enrollment.progress} className="mb-4" />
      <div className="mb-4 grid grid-cols-3 gap-3 text-center text-xs">
        <div><strong className="text-base">{completedCount}</strong><div className="text-text-muted">Completed</div></div>
        <div><strong className="text-base">{remaining}</strong><div className="text-text-muted">Remaining</div></div>
        <div><strong className="text-base">{hours}h {mins}m</strong><div className="text-text-muted">Time spent</div></div>
      </div>
      <div className="max-h-[360px] space-y-2 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id}>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-text-muted">{section.title}</h4>
            {section.lessons.map((lesson) => {
              const isCompleted = enrollment.completedLessons.includes(lesson.id)
              const isCurrent = enrollment.currentLessonId === lesson.id
              return (
                <button
                  key={lesson.id}
                  onClick={() => onLessonClick(lesson.id, section.id)}
                  className={`flex w-full items-center gap-2 rounded-btn px-3 py-2 text-left text-sm transition-colors ${
                    isCurrent ? 'bg-gold-dim font-semibold text-gold' : isCompleted ? 'text-emerald' : 'text-text-secondary hover:bg-bg-elevated'
                  }`}
                >
                  <span className="flex-shrink-0">{isCompleted ? '✓' : isCurrent ? '▶' : '○'}</span>
                  <span className="flex-1 truncate">{lesson.title}</span>
                  <span className="text-xs text-text-muted">{lesson.duration}m</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </Card>
  )
}
