'use client'

import { useState, useEffect } from 'react'
import { getDocument, queryDocuments } from '@/lib/firebase/firestore'
import type { QueryConstraint } from 'firebase/firestore'

export function useDocument<T>(collectionName: string, docId: string | undefined) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!docId) { setLoading(false); return }
    setLoading(true)
    getDocument<T>(collectionName, docId)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [collectionName, docId])

  return { data, loading, error }
}

export function useCollection<T>(collectionName: string, constraints: QueryConstraint[]) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    queryDocuments<T>(collectionName, constraints)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName])

  return { data, loading, error }
}
