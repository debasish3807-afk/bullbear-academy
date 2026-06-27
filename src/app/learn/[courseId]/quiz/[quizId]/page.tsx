'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { QuizRunner } from '@/components/lms'
import { useAuth } from '@/contexts/AuthContext'
import { getQuiz } from '@/lib/lms'
import type { Quiz, QuizSubmission } from '@/lib/lms/types'

interface Props {
  params: Promise<{ courseId: string; quizId: string }>
}

export default function QuizPage({ params }: Props) {
  const { courseId, quizId } = use(params)
  const { user } = useAuth()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getQuiz(quizId).then(setQuiz).finally(() => setLoading(false))
  }, [quizId])

  const handleComplete = (submission: QuizSubmission) => {
    // Could trigger certificate generation if course is complete
    console.log('Quiz completed:', submission)
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center"><p className="text-text-muted">Loading quiz...</p></div>
  if (!quiz) return <div className="flex min-h-screen items-center justify-center"><p className="text-text-muted">Quiz not found.</p></div>

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[680px]">
        <h1 className="mb-2 text-xl font-bold">{quiz.title}</h1>
        <p className="mb-6 text-sm text-text-secondary">{quiz.questions.length} questions · {quiz.timeLimit} min · Pass: {quiz.passingScore}%</p>
        <QuizRunner quiz={quiz} onComplete={handleComplete} />
      </div>
    </div>
  )
}
