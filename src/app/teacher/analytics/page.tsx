'use client'

import { Card, Badge } from '@/components/ui'

export default function TeacherAnalyticsPage() {
  // In production: fetch from Firestore aggregations
  const stats = { students: 4210, courses: 6, revenue: 184000, rating: 4.9, completionRate: 72 }

  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-2 text-2xl font-bold">Student Analytics</h1>
        <p className="mb-6 text-sm text-text-secondary">Performance metrics across all your courses.</p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card><strong className="font-heading text-xl">{stats.students.toLocaleString()}</strong><div className="text-xs text-text-muted">Total Students</div></Card>
          <Card><strong className="font-heading text-xl">{stats.courses}</strong><div className="text-xs text-text-muted">Courses</div></Card>
          <Card><strong className="font-heading text-xl">₹{(stats.revenue / 1000).toFixed(0)}k</strong><div className="text-xs text-text-muted">Revenue</div></Card>
          <Card><strong className="font-heading text-xl">{stats.rating}★</strong><div className="text-xs text-text-muted">Avg Rating</div></Card>
          <Card><strong className="font-heading text-xl">{stats.completionRate}%</strong><div className="text-xs text-text-muted">Completion</div></Card>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="mb-3 font-semibold">Top Performing Courses</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between rounded-btn bg-bg-elevated p-3"><span>Options Trading: Zero to Pro</span><Badge variant="green">72% completion</Badge></div>
              <div className="flex justify-between rounded-btn bg-bg-elevated p-3"><span>Nifty Expiry Strategies</span><Badge variant="gold">58% completion</Badge></div>
              <div className="flex justify-between rounded-btn bg-bg-elevated p-3"><span>Bank Nifty Masterclass</span><Badge variant="green">64% completion</Badge></div>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Recent Student Activity</h3>
            <div className="space-y-2 text-sm">
              <div className="rounded-btn bg-bg-elevated p-3">Aarav Mehta completed Module 4 in Options Trading</div>
              <div className="rounded-btn bg-bg-elevated p-3">Sanjana Das scored 94% on Greeks quiz</div>
              <div className="rounded-btn bg-bg-elevated p-3">Vivek Jain enrolled in Expiry Strategies</div>
              <div className="rounded-btn bg-bg-elevated p-3">12 new reviews this week (avg 4.8★)</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
