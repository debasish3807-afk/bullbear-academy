'use client'

import { useState, useEffect } from 'react'
import { Card, Badge, Button } from '@/components/ui'
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { UserProfile } from '@/lib/firebase'

export default function AdminStudentsPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
    getDocs(q).then((snap) => setUsers(snap.docs.map((d) => d.data() as UserProfile))).finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) => u.displayName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  const changeRole = async (uid: string, role: 'student' | 'teacher' | 'admin') => {
    await updateDoc(doc(db, 'users', uid), { role })
    setUsers(users.map((u) => u.uid === uid ? { ...u, role } : u))
  }

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <input className="rounded-btn border border-line bg-bg-elevated px-4 py-2.5 text-sm" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {loading ? <p className="text-text-muted">Loading...</p> : (
          <div className="overflow-auto rounded-card border border-line">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-line text-xs text-text-muted"><th className="px-4 py-3 text-left">User</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-left">Role</th><th className="px-4 py-3 text-left">Plan</th><th className="px-4 py-3 text-left">XP</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.uid} className="border-b border-line">
                    <td className="px-4 py-3 font-medium">{u.displayName}</td>
                    <td className="px-4 py-3 text-text-secondary">{u.email}</td>
                    <td className="px-4 py-3"><Badge variant={u.role === 'admin' ? 'red' : u.role === 'teacher' ? 'gold' : 'green'}>{u.role}</Badge></td>
                    <td className="px-4 py-3">{u.plan}</td>
                    <td className="px-4 py-3">{u.xp}</td>
                    <td className="px-4 py-3">
                      <select className="rounded border border-line bg-bg-elevated px-2 py-1 text-xs" value={u.role} onChange={(e) => changeRole(u.uid, e.target.value as any)}>
                        <option value="student">Student</option><option value="teacher">Teacher</option><option value="admin">Admin</option>
                      </select>
                    </td>
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
