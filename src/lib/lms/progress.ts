import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { LessonProgress, LessonNote, DailyStreak } from './types'

export async function getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
  const id = `${userId}_${lessonId}`
  const snap = await getDoc(doc(db, 'lessonProgress', id))
  return snap.exists() ? (snap.data() as LessonProgress) : null
}

export async function saveVideoPosition(userId: string, lessonId: string, courseId: string, position: number, duration: number): Promise<void> {
  const id = `${userId}_${lessonId}`
  const ref = doc(db, 'lessonProgress', id)
  const snap = await getDoc(ref)

  if (snap.exists()) {
    await updateDoc(ref, { lastPosition: position, videoProgress: position, videoDuration: duration })
  } else {
    await setDoc(ref, {
      lessonId,
      courseId,
      userId,
      completed: false,
      videoProgress: position,
      videoDuration: duration,
      lastPosition: position,
      notes: [],
    })
  }
}

export async function markLessonComplete(userId: string, lessonId: string, courseId: string): Promise<void> {
  const id = `${userId}_${lessonId}`
  const ref = doc(db, 'lessonProgress', id)
  const snap = await getDoc(ref)

  if (snap.exists()) {
    await updateDoc(ref, { completed: true, completedAt: serverTimestamp() })
  } else {
    await setDoc(ref, {
      lessonId, courseId, userId, completed: true, completedAt: serverTimestamp(),
      videoProgress: 0, videoDuration: 0, lastPosition: 0, notes: [],
    })
  }
}

export async function addLessonNote(userId: string, lessonId: string, note: Omit<LessonNote, 'id' | 'createdAt'>): Promise<void> {
  const id = `${userId}_${lessonId}`
  const ref = doc(db, 'lessonProgress', id)
  const snap = await getDoc(ref)
  const noteObj = { ...note, id: crypto.randomUUID(), createdAt: serverTimestamp() }

  if (snap.exists()) {
    const existing = snap.data() as LessonProgress
    await updateDoc(ref, { notes: [...existing.notes, noteObj] })
  } else {
    await setDoc(ref, {
      lessonId, courseId: '', userId, completed: false,
      videoProgress: 0, videoDuration: 0, lastPosition: 0, notes: [noteObj],
    })
  }
}

export async function updateStreak(userId: string): Promise<DailyStreak> {
  const ref = doc(db, 'streaks', userId)
  const snap = await getDoc(ref)
  const today = new Date().toISOString().split('T')[0]

  if (!snap.exists()) {
    const streak: DailyStreak = { userId, currentStreak: 1, longestStreak: 1, lastActiveDate: today, streakHistory: [today] }
    await setDoc(ref, streak)
    return streak
  }

  const data = snap.data() as DailyStreak
  if (data.lastActiveDate === today) return data

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const isConsecutive = data.lastActiveDate === yesterday
  const newStreak = isConsecutive ? data.currentStreak + 1 : 1
  const longest = Math.max(data.longestStreak, newStreak)

  const updated: DailyStreak = {
    ...data,
    currentStreak: newStreak,
    longestStreak: longest,
    lastActiveDate: today,
    streakHistory: [...data.streakHistory.slice(-90), today],
  }
  await updateDoc(ref, updated)
  return updated
}
