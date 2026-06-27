'use client'

import { useState, useEffect } from 'react'
import { Card, Badge, Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { getInstructorCourses, createCourse, updateCourse, deleteCourse } from '@/lib/lms'
import type { Course } from '@/lib/lms/types'

export default function TeacherCoursesPage() {
  const { user, profile } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', description: '', shortDescription: '', category: 'stock-basics', level: 'beginner', price: 0 })

  useEffect(() => {
    if (!user) return
    getInstructorCourses(user.uid).then(setCourses).finally(() => setLoading(false))
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !profile) return
    if (editingId) {
      await updateCourse(editingId, { ...form, level: form.level as any, category: form.category as any })
    } else {
      await createCourse({
        ...form,
        level: form.level as any,
        category: form.category as any,
        currency: 'INR',
        instructorId: user.uid,
        instructorName: profile.displayName,
        totalLessons: 0,
        totalDuration: 0,
        status: 'draft',
        tags: [],
        sections: [],
      })
    }
    setShowForm(false)
    setEditingId(null)
    setForm({ title: '', slug: '', description: '', shortDescription: '', category: 'stock-basics', level: 'beginner', price: 0 })
    const updated = await getInstructorCourses(user.uid)
    setCourses(updated)
  }

  const handleEdit = (course: Course) => {
    setForm({ title: course.title, slug: course.slug, description: course.description, shortDescription: course.shortDescription, category: course.category, level: course.level, price: course.price })
    setEditingId(course.id)
    setShowForm(true)
  }

  const handleDelete = async (courseId: string) => {
    if (!confirm('Delete this course? This cannot be undone.')) return
    await deleteCourse(courseId)
    setCourses(courses.filter((c) => c.id !== courseId))
  }

  if (loading) return <div className="px-6 pt-[100px]"><p className="text-text-muted">Loading courses...</p></div>

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <div className="mb-6 flex items-center justify-between">
          <div><h1 className="text-2xl font-bold">My Courses</h1><p className="text-sm text-text-secondary">{courses.length} courses</p></div>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null) }}>{showForm ? 'Cancel' : '+ New Course'}</Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <h3 className="mb-4 font-semibold">{editingId ? 'Edit Course' : 'Create Course'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" placeholder="Course title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <input className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" placeholder="URL slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <input className="w-full rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" placeholder="Short description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
              <textarea className="w-full rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" rows={3} placeholder="Full description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="stock-basics">Stock Basics</option><option value="technical-analysis">Technical Analysis</option><option value="options">Options</option><option value="futures">Futures</option><option value="intraday">Intraday</option><option value="swing-trading">Swing Trading</option><option value="risk-management">Risk Management</option><option value="psychology">Psychology</option>
                </select>
                <select className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                  <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
                </select>
                <input type="number" className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" placeholder="Price (INR)" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <Button type="submit">{editingId ? 'Update Course' : 'Create Course'}</Button>
            </form>
          </Card>
        )}

        <div className="space-y-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{course.title}</h3>
                  <Badge variant={course.status === 'published' ? 'green' : 'gold'}>{course.status}</Badge>
                </div>
                <p className="text-sm text-text-muted">{course.totalLessons} lessons · {course.enrollmentCount} students · ₹{course.price}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => updateCourse(course.id, { status: course.status === 'published' ? 'draft' : 'published' }).then(() => getInstructorCourses(user!.uid).then(setCourses))}>
                  {course.status === 'published' ? 'Unpublish' : 'Publish'}
                </Button>
                <Button variant="ghost" size="sm" className="text-danger" onClick={() => handleDelete(course.id)}>Delete</Button>
              </div>
            </Card>
          ))}
          {courses.length === 0 && <div className="rounded-card border border-dashed border-line p-8 text-center text-text-secondary">No courses yet. Create your first course above.</div>}
        </div>
      </div>
    </div>
  )
}
