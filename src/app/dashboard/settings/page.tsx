'use client'

import { Card, Button } from '@/components/ui'

export default function SettingsPage() {
  return (
    <div className="px-6 pb-16 pt-[100px]">
      <div className="mx-auto max-w-[620px]">
        <h1 className="mb-6 text-2xl font-bold">Settings</h1>
        <Card className="mb-4">
          <h3 className="mb-3 font-semibold">Personal Information</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input defaultValue="Sona Biswas" className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
            <input defaultValue="debasishbiswas9378@gmail.com" className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
            <input defaultValue="+91 98765 43210" className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
            <input defaultValue="India" className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
          </div>
          <Button className="mt-4" size="sm">Save Changes</Button>
        </Card>
        <Card className="mb-4">
          <h3 className="mb-3 font-semibold">Notifications</h3>
          <div className="space-y-2.5 text-sm">
            {['Course updates', 'Live class reminders', 'Streak reminders', 'Community replies'].map((item) => (
              <label key={item} className="flex items-center gap-3"><input type="checkbox" defaultChecked className="accent-gold" /> {item}</label>
            ))}
            <label className="flex items-center gap-3"><input type="checkbox" className="accent-gold" /> Promotional emails</label>
          </div>
        </Card>
        <Card className="mb-4">
          <h3 className="mb-3 font-semibold">Security</h3>
          <input type="password" placeholder="Current password" className="mb-3 w-full rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="password" placeholder="New password" className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
            <input type="password" placeholder="Confirm" className="rounded-btn border border-line bg-bg-elevated px-3 py-2.5 text-sm" />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm">Update Password</Button>
            <Button variant="outline" size="sm">Enable 2FA</Button>
          </div>
        </Card>
        <Card>
          <h3 className="mb-2 font-semibold text-danger">Danger Zone</h3>
          <p className="mb-3 text-sm text-text-secondary">Delete your account and all data permanently.</p>
          <Button variant="ghost" size="sm" className="border-danger text-danger">Delete Account</Button>
        </Card>
      </div>
    </div>
  )
}
