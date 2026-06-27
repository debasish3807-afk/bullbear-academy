import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Certificate } from './types'

function generateVerificationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = 'BBA-'
  for (let i = 0; i < 8; i++) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export async function issueCertificate(
  userId: string,
  userName: string,
  courseId: string,
  courseTitle: string,
  instructorName: string
): Promise<Certificate> {
  // Check if already issued
  const existing = await getUserCertificate(userId, courseId)
  if (existing) return existing

  const ref = doc(collection(db, 'certificates'))
  const cert: Certificate = {
    id: ref.id,
    userId,
    userName,
    courseId,
    courseTitle,
    instructorName,
    verificationId: generateVerificationId(),
    issuedAt: serverTimestamp() as any,
  }
  await setDoc(ref, cert)
  return cert
}

export async function getUserCertificates(userId: string): Promise<Certificate[]> {
  const q = query(collection(db, 'certificates'), where('userId', '==', userId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Certificate)
}

export async function getUserCertificate(userId: string, courseId: string): Promise<Certificate | null> {
  const q = query(collection(db, 'certificates'), where('userId', '==', userId), where('courseId', '==', courseId))
  const snap = await getDocs(q)
  return snap.empty ? null : (snap.docs[0].data() as Certificate)
}

export async function verifyCertificate(verificationId: string): Promise<Certificate | null> {
  const q = query(collection(db, 'certificates'), where('verificationId', '==', verificationId))
  const snap = await getDocs(q)
  return snap.empty ? null : (snap.docs[0].data() as Certificate)
}
