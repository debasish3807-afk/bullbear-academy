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
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from './config'

// Generic CRUD helpers for Firestore

export async function getDocument<T = DocumentData>(collectionName: string, docId: string): Promise<T | null> {
  const ref = doc(db, collectionName, docId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as T
}

export async function queryDocuments<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[]
): Promise<T[]> {
  const ref = collection(db, collectionName)
  const q = query(ref, ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T))
}

export async function createDocument(collectionName: string, docId: string, data: DocumentData): Promise<void> {
  const ref = doc(db, collectionName, docId)
  await setDoc(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateDocument(collectionName: string, docId: string, data: Partial<DocumentData>): Promise<void> {
  const ref = doc(db, collectionName, docId)
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  const ref = doc(db, collectionName, docId)
  await deleteDoc(ref)
}

export { collection, doc, query, where, orderBy, limit, serverTimestamp }
