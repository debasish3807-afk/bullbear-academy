'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, Button, Badge, Progress } from '@/components/ui'
import { submitQuiz } from '@/lib/lms/quizzes'
import { useAuth } from '@/contexts/AuthContext'
import type { Quiz, QuizSubmission } from '@/lib/lms/types'

interface QuizRunnerProps {
  quiz: Quiz
  onComplete: (submission: QuizSubmission) => void
}

export function QuizRunner({ quiz, onComplete }: QuizRunnerProps) {
  const { user } = useAuth()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<QuizSubmission | null>(null)

  useEffect(() => {
    if (submitted || timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [submitted, timeLeft])

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) handleSubmit()
  }, [timeLeft])

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[current] = optionIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = useCallback(async () => {
    if (!user || submitted) return
    setSubmitted(true)
    const finalAnswers = answers.map((a) => a ?? -1)
    const submission = await submitQuiz(user.uid, quiz.id, quiz.courseId, finalAnswers, quiz)
    setResult(submission)
    onComplete(submission)
  }, [user, answers, quiz, submitted, onComplete])

  const formatTimer = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
  const question = quiz.questions[current]
  const progress = ((current + 1) / quiz.questions.length) * 100

  if (result) {
    return (
      <Card className="text-center">
        <div className="mb-3 text-4xl">{result.passed ? '🎉' : '💪'}</div>
        <h3 className="mb-2 text-xl font-bold">{result.passed ? 'Congratulations!' : 'Keep Practicing'}</h3>
        <p className="mb-4 text-text-secondary">
          You scored {result.score}/{result.totalPoints} ({result.percentage}%)
        </p>
        <Badge variant={result.passed ? 'green' : 'red'}>{result.passed ? 'PASSED' : 'FAILED'}</Badge>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-btn bg-bg-elevated p-3 text-center"><strong>{result.percentage}%</strong><div className="text-xs text-text-muted">Score</div></div>
          <div className="rounded-btn bg-bg-elevated p-3 text-center"><strong>{quiz.passingScore}%</strong><div className="text-xs text-text-muted">Required</div></div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="gold">Q{current + 1} of {quiz.questions.length}</Badge>
        <span className={`text-sm font-mono font-bold ${timeLeft < 60 ? 'text-danger' : 'text-text-muted'}`}>{formatTimer(timeLeft)}</span>
      </div>
      <Progress value={progress} className="mb-5" />
      <h3 className="mb-5 text-base font-semibold leading-relaxed">{question.question}</h3>
      <div className="space-y-2.5" role="radiogroup" aria-label="Quiz options">
        {question.options.map((option, i) => (
          <button
            key={i}
            role="radio"
            aria-checked={answers[current] === i}
            onClick={() => selectAnswer(i)}
            className={`w-full rounded-[14px] border p-3.5 text-left text-sm transition-colors ${
              answers[current] === i
                ? 'border-gold bg-gold-dim font-semibold text-gold'
                : 'border-line hover:border-line-hover hover:bg-gold-dim'
            }`}
          >
            {String.fromCharCode(65 + i)}. {option}
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        <Button variant="ghost" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>Previous</Button>
        {current === quiz.questions.length - 1 ? (
          <Button onClick={handleSubmit} disabled={answers.includes(null)}>Submit Quiz</Button>
        ) : (
          <Button onClick={() => setCurrent(current + 1)}>Next</Button>
        )}
      </div>
    </Card>
  )
}
