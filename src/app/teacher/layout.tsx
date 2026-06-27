'use client'

import Link from 'next/link'
import { ProtectedRoute } from '@/components/auth'

const teacherNav = [
  { href: '/teacher', label: 'Overview' },
  { href: '/teacher/courses', label: 'My Courses' },
  { href: '/teacher/analytics', label: 'Student Analytics' },
]

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['teacher', 'admin']}>
      <div className="border-b border-line bg-bg-card px-6 pt-[76px]">
        <div className="container-main flex gap-1 overflow-x-auto">
          {teacherNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-t-lg border-b-2 border-transparent px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-gold hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </ProtectedRoute>
  )
}
