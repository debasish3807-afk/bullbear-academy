'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Skeleton } from '@/components/ui'
import type { UserRole } from '@/lib/firebase'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requireVerified?: boolean
}

export function ProtectedRoute({ children, allowedRoles, requireVerified = false }: ProtectedRouteProps) {
  const { user, profile, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    if (requireVerified && user && !user.emailVerified) {
      router.push('/verify-email')
      return
    }
    if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
      router.push('/dashboard')
    }
  }, [loading, isAuthenticated, user, profile, router, allowedRoles, requireVerified])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="w-full max-w-[400px] space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null
  if (requireVerified && user && !user.emailVerified) return null
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) return null

  return <>{children}</>
}
