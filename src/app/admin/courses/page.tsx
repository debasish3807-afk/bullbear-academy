'use client'

import { useState, useEffect } from 'react'
import { Card, Badge, Button } from '@/components/ui'
import { getPublishedCourses, updateCourse, deleteCourse } from '@/lib/lms'
import type { Course } from '@/lib/lms/types'

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPublishedCourses().then(setCourses).finally(() => setLoading(false))
  }, [])

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))

  const toggleStatus = async (course: Course) => {
    const newStatus = course.status === 'published' ? 'archived' : 'published'
    await updateCourse(course.id, { status: newStatus })
    setCourses(courses.map((c) => c.id === course.id ? { ...c, status: newStatus } : c))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this course?')) return
    await deleteCourse(id)
    setCourses(courses.filter((c) => c.id !== id))
  }

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Manage Courses</h1>
          <input className="rounded-btn border border-line bg-bg-elevated px-4 py-2.5 text-sm" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {loading ? <p className="text-text-muted">Loading...</p> : (
          <div className="overflow-auto rounded-card border border-line">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-line text-xs text-text-muted"><th className="px-4 py-3 text-left">Course</th><th className="px-4 py-3 text-left">Instructor</th><th className="px-4 py-3 text-left">Level</th><th className="px-4 py-3 text-left">Students</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-line">
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3 text-text-secondary">{c.instructorName}</td>
                    <td className="px-4 py-3"><Badge variant={c.level === 'beginner' ? 'green' : c.level === 'intermediate' ? 'blue' : 'gold'}>{c.level}</Badge></td>
                    <td className="px-4 py-3">{c.enrollmentCount}</td>
                    <td className="px-4 py-3"><Badge variant={c.status === 'published' ? 'green' : 'red'}>{c.status}</Badge></td>
                    <td className="px-4 py-3"><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => toggleStatus(c)}>{c.status === 'published' ? 'Archive' : 'Publish'}</Button><Button variant="ghost" size="sm" className="text-danger" onClick={() => handleDelete(c.id)}>Delete</Button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
