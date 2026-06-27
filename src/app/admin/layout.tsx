'use client'

import Link from 'next/link'
import { ProtectedRoute } from '@/components/auth'

const adminNav = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/courses', label: 'Courses' },
  { href: '/admin/students', label: 'Users' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="border-b border-line bg-bg-card px-6 pt-[76px]">
        <div className="container-main flex gap-1 overflow-x-auto">
          {adminNav.map((item) => (
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
