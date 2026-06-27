'use client'

import { ProtectedRoute } from '@/components/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={['admin']}>{children}</ProtectedRoute>
}
