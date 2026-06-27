'use client'

import { useState } from 'react'
import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'

export default function VideoPage() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="px-6 pb-16 pt-[92px]">
      <div className="container-main">
        <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="flex aspect-video items-center justify-center rounded-card bg-gradient-to-br from-bg-elevated to-bg">
              <Button onClick={() => setPlaying(!playing)}>
                {playing ? '⏸ Pause' : '▶ Play Lesson'}
              </Button>
            </div>
            <div className="mt-4">
              <h1 className="text-xl font-bold">Understanding Delta and Gamma</h1>
              <p className="text-sm text-text-secondary">Options Trading: Zero to Pro, Chapter 4, Lesson 2</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="ghost" size="sm">Bookmark</Button>
                <Button variant="ghost" size="sm">Add Note</Button>
                <Link href="/dashboard/quiz"><Button variant="outline" size="sm">Take Quiz</Button></Link>
                <Button size="sm">Next Lesson</Button>
              </div>
            </div>
          </div>
          <Card>
            <h3 className="mb-3 font-semibold">Course Progress</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">Ch 1: Introduction <Badge variant="green">Done</Badge></div>
              <div className="flex justify-between">Ch 2: Premium Basics <Badge variant="green">Done</Badge></div>
              <div className="flex justify-between">Ch 3: Intrinsic vs Time <Badge variant="green">Done</Badge></div>
              <div className="flex justify-between font-semibold text-gold">Ch 4: Greeks <Badge variant="gold">Current</Badge></div>
              <div className="flex justify-between text-text-muted">Ch 5: Strategies <span>Locked</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
