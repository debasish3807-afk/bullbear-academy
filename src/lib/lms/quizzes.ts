import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Quiz, QuizSubmission } from './types'

export async function getQuiz(quizId: string): Promise<Quiz | null> {
  const snap = await getDoc(doc(db, 'quizzes', quizId))
  return snap.exists() ? (snap.data() as Quiz) : null
}

export async function getCourseQuizzes(courseId: string): Promise<Quiz[]> {
  const q = query(collection(db, 'quizzes'), where('courseId', '==', courseId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Quiz)
}

export async function createQuiz(data: Omit<Quiz, 'id'>): Promise<string> {
  const ref = doc(collection(db, 'quizzes'))
  await setDoc(ref, { ...data, id: ref.id })
  return ref.id
}

export async function submitQuiz(userId: string, quizId: string, courseId: string, answers: number[], quiz: Quiz): Promise<QuizSubmission> {
  let score = 0
  let totalPoints = 0
  quiz.questions.forEach((q, i) => {
    totalPoints += q.points
    if (answers[i] === q.correctAnswer) score += q.points
  })

  const percentage = Math.round((score / totalPoints) * 100)
  const submission: QuizSubmission = {
    id: '',
    quizId,
    userId,
    courseId,
    answers,
    score,
    totalPoints,
    percentage,
    passed: percentage >= quiz.passingScore,
    timeTaken: 0,
    submittedAt: serverTimestamp() as any,
  }

  const ref = doc(collection(db, 'quizSubmissions'))
  submission.id = ref.id
  await setDoc(ref, submission)
  return submission
}

export async function getUserQuizHistory(userId: string, courseId?: string): Promise<QuizSubmission[]> {
  const constraints = [where('userId', '==', userId), orderBy('submittedAt', 'desc')]
  if (courseId) constraints.push(where('courseId', '==', courseId))
  const q = query(collection(db, 'quizSubmissions'), ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as QuizSubmission)
}
