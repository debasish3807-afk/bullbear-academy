import type { Metadata } from 'next'
import { Card, Badge } from '@/components/ui'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default function AdminPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="container-main">
        <h1 className="mb-1 text-2xl font-bold">Admin Dashboard</h1>
        <p className="mb-6 text-sm text-text-secondary">Revenue, learners, operations, and platform health.</p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <div className="text-xs text-text-muted">Monthly Revenue</div>
            <div className="font-heading text-2xl font-extrabold">₹18.42L</div>
            <Badge variant="green" className="mt-2">+18.6%</Badge>
          </Card>
          <Card>
            <div className="text-xs text-text-muted">Active Students</div>
            <div className="font-heading text-2xl font-extrabold">12,486</div>
            <Badge variant="green" className="mt-2">+11.4%</Badge>
          </Card>
          <Card>
            <div className="text-xs text-text-muted">Completion Rate</div>
            <div className="font-heading text-2xl font-extrabold">68.2%</div>
            <Badge variant="blue" className="mt-2">+2.1 pts</Badge>
          </Card>
          <Card>
            <div className="text-xs text-text-muted">Open Tickets</div>
            <div className="font-heading text-2xl font-extrabold">43</div>
            <Badge variant="red" className="mt-2">7 overdue</Badge>
          </Card>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="mb-3 font-semibold">Recent Students</h3>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-line text-xs text-text-muted"><th className="pb-2 text-left">Name</th><th className="pb-2 text-left">Plan</th><th className="pb-2 text-left">Progress</th><th className="pb-2 text-left">Status</th></tr></thead>
                <tbody>
                  <tr className="border-b border-line"><td className="py-2">Aarav Mehta</td><td>Elite</td><td>82%</td><td><Badge variant="green">Active</Badge></td></tr>
                  <tr className="border-b border-line"><td className="py-2">Riya Sharma</td><td>Pro</td><td>46%</td><td><Badge variant="green">Active</Badge></td></tr>
                  <tr className="border-b border-line"><td className="py-2">Nikhil Iyer</td><td>Starter</td><td>31%</td><td><Badge variant="red">At Risk</Badge></td></tr>
                  <tr className="border-b border-line"><td className="py-2">Sanjana Das</td><td>Elite</td><td>93%</td><td><Badge variant="green">Active</Badge></td></tr>
                  <tr><td className="py-2">Vivek Jain</td><td>Pro</td><td>64%</td><td><Badge variant="gold">KYC</Badge></td></tr>
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Activity Timeline</h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3"><div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gold" /><div><strong>Refund approved</strong> for order BBA-10428<div className="text-xs text-text-muted">8 min ago</div></div></div>
              <div className="flex gap-3"><div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald" /><div><strong>Course v2.4 published</strong> Options Trading<div className="text-xs text-text-muted">24 min ago</div></div></div>
              <div className="flex gap-3"><div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-info" /><div><strong>2FA enforced</strong> for finance roles<div className="text-xs text-text-muted">1 hr ago</div></div></div>
              <div className="flex gap-3"><div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-danger" /><div><strong>Ticket escalation</strong> certificate mismatch<div className="text-xs text-text-muted">2 hrs ago</div></div></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
