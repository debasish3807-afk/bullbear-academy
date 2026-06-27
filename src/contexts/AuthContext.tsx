'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { onAuthChange, getUserProfile, type UserProfile } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isTeacher: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  isTeacher: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid)
        setProfile(userProfile)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isTeacher: profile?.role === 'teacher',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
