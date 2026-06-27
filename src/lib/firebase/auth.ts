import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

export type UserRole = 'student' | 'teacher' | 'admin'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL: string | null
  role: UserRole
  plan: 'starter' | 'pro' | 'elite'
  xp: number
  streak: number
  createdAt: Date
  emailVerified: boolean
}

const googleProvider = new GoogleAuthProvider()

export async function signUpWithEmail(email: string, password: string, displayName: string): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(user)
  await createUserProfile(user, displayName)
  return user
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export async function signInWithGoogle(): Promise<User> {
  const { user } = await signInWithPopup(auth, googleProvider)
  const profileExists = await checkProfileExists(user.uid)
  if (!profileExists) {
    await createUserProfile(user, user.displayName || 'User')
  }
  return user
}

export async function logout(): Promise<void> {
  await signOut(auth)
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

export async function resendVerification(): Promise<void> {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser)
  }
}

export async function createUserProfile(user: User, displayName: string): Promise<void> {
  const userRef = doc(db, 'users', user.uid)
  const profile: Omit<UserProfile, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
    uid: user.uid,
    email: user.email || '',
    displayName,
    photoURL: user.photoURL,
    role: 'student',
    plan: 'starter',
    xp: 0,
    streak: 0,
    emailVerified: user.emailVerified,
    createdAt: serverTimestamp(),
  }
  await setDoc(userRef, profile, { merge: true })
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', uid)
  const snap = await getDoc(userRef)
  if (!snap.exists()) return null
  return snap.data() as UserProfile
}

export async function checkProfileExists(uid: string): Promise<boolean> {
  const userRef = doc(db, 'users', uid)
  const snap = await getDoc(userRef)
  return snap.exists()
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
