'use client'

import { ProtectedRoute } from '@/components/auth'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={['teacher', 'admin']}>{children}</ProtectedRoute>
}
