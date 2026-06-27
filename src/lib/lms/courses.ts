import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Course, CourseCategory } from './types'

const COLLECTION = 'courses'

export async function createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrollmentCount' | 'rating' | 'reviewCount'>): Promise<string> {
  const ref = doc(collection(db, COLLECTION))
  const course = {
    ...data,
    id: ref.id,
    enrollmentCount: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  await setDoc(ref, course)
  return ref.id
}

export async function getCourse(courseId: string): Promise<Course | null> {
  const snap = await getDoc(doc(db, COLLECTION, courseId))
  return snap.exists() ? (snap.data() as Course) : null
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const q = query(collection(db, COLLECTION), where('slug', '==', slug), limit(1))
  const snap = await getDocs(q)
  return snap.empty ? null : (snap.docs[0].data() as Course)
}

export async function getPublishedCourses(category?: CourseCategory): Promise<Course[]> {
  const constraints = [where('status', '==', 'published'), orderBy('enrollmentCount', 'desc')]
  if (category) constraints.push(where('category', '==', category))
  const q = query(collection(db, COLLECTION), ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Course)
}

export async function getInstructorCourses(instructorId: string): Promise<Course[]> {
  const q = query(collection(db, COLLECTION), where('instructorId', '==', instructorId), orderBy('updatedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Course)
}

export async function updateCourse(courseId: string, data: Partial<Course>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, courseId), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteCourse(courseId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, courseId))
}

export async function incrementEnrollment(courseId: string): Promise<void> {
  await updateDoc(doc(db, COLLECTION, courseId), { enrollmentCount: increment(1) })
}
