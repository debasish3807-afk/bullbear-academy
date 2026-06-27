import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { incrementEnrollment } from './courses'
import type { Enrollment } from './types'

const COLLECTION = 'enrollments'

export async function enrollStudent(userId: string, courseId: string, courseTitle: string, firstLessonId: string, firstSectionId: string): Promise<string> {
  const enrollmentId = `${userId}_${courseId}`
  const existing = await getDoc(doc(db, COLLECTION, enrollmentId))
  if (existing.exists()) return enrollmentId

  const enrollment: Omit<Enrollment, 'enrolledAt' | 'lastAccessedAt'> & { enrolledAt: any; lastAccessedAt: any } = {
    id: enrollmentId,
    userId,
    courseId,
    courseTitle,
    progress: 0,
    completedLessons: [],
    currentLessonId: firstLessonId,
    currentSectionId: firstSectionId,
    totalTimeSpent: 0,
    status: 'active',
    enrolledAt: serverTimestamp(),
    lastAccessedAt: serverTimestamp(),
  }
  await setDoc(doc(db, COLLECTION, enrollmentId), enrollment)
  await incrementEnrollment(courseId)
  return enrollmentId
}

export async function getEnrollment(userId: string, courseId: string): Promise<Enrollment | null> {
  const id = `${userId}_${courseId}`
  const snap = await getDoc(doc(db, COLLECTION, id))
  return snap.exists() ? (snap.data() as Enrollment) : null
}

export async function getUserEnrollments(userId: string): Promise<Enrollment[]> {
  const q = query(collection(db, COLLECTION), where('userId', '==', userId), orderBy('lastAccessedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Enrollment)
}

export async function updateProgress(userId: string, courseId: string, lessonId: string, totalLessons: number): Promise<void> {
  const id = `${userId}_${courseId}`
  const snap = await getDoc(doc(db, COLLECTION, id))
  if (!snap.exists()) return

  const enrollment = snap.data() as Enrollment
  const completed = enrollment.completedLessons.includes(lessonId)
    ? enrollment.completedLessons
    : [...enrollment.completedLessons, lessonId]

  const progress = Math.round((completed.length / totalLessons) * 100)
  const isComplete = progress >= 100

  await updateDoc(doc(db, COLLECTION, id), {
    completedLessons: completed,
    progress,
    currentLessonId: lessonId,
    lastAccessedAt: serverTimestamp(),
    ...(isComplete ? { status: 'completed', completedAt: serverTimestamp() } : {}),
  })
}

export async function updateCurrentLesson(userId: string, courseId: string, lessonId: string, sectionId: string): Promise<void> {
  const id = `${userId}_${courseId}`
  await updateDoc(doc(db, COLLECTION, id), {
    currentLessonId: lessonId,
    currentSectionId: sectionId,
    lastAccessedAt: serverTimestamp(),
  })
}

export async function addTimeSpent(userId: string, courseId: string, minutes: number): Promise<void> {
  const id = `${userId}_${courseId}`
  const { increment } = await import('firebase/firestore')
  await updateDoc(doc(db, COLLECTION, id), { totalTimeSpent: increment(minutes) })
}
