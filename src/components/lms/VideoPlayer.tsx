'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui'
import { saveVideoPosition, markLessonComplete, addLessonNote } from '@/lib/lms/progress'
import { useAuth } from '@/contexts/AuthContext'

interface VideoPlayerProps {
  videoUrl: string
  lessonId: string
  courseId: string
  initialPosition?: number
  duration?: number
  onComplete?: () => void
  onNextLesson?: () => void
}

export function VideoPlayer({ videoUrl, lessonId, courseId, initialPosition = 0, onComplete, onNextLesson }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [showNotes, setShowNotes] = useState(false)
  const [note, setNote] = useState('')
  const [completed, setCompleted] = useState(false)
  const { user } = useAuth()
  const saveInterval = useRef<NodeJS.Timeout>()

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (initialPosition > 0) video.currentTime = initialPosition
  }, [initialPosition])

  useEffect(() => {
    // Auto-save position every 10 seconds
    saveInterval.current = setInterval(() => {
      if (videoRef.current && user && playing) {
        saveVideoPosition(user.uid, lessonId, courseId, videoRef.current.currentTime, videoRef.current.duration)
      }
    }, 10000)
    return () => clearInterval(saveInterval.current)
  }, [user, lessonId, courseId, playing])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { video.play(); setPlaying(true) }
    else { video.pause(); setPlaying(false) }
  }, [])

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)
    // Mark complete at 90%
    if (!completed && videoRef.current.currentTime / videoRef.current.duration > 0.9) {
      setCompleted(true)
      if (user) {
        markLessonComplete(user.uid, lessonId, courseId)
        onComplete?.()
      }
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    if (onNextLesson) onNextLesson()
  }

  const changeSpeed = () => {
    const idx = speeds.indexOf(speed)
    const next = speeds[(idx + 1) % speeds.length]
    setSpeed(next)
    if (videoRef.current) videoRef.current.playbackRate = next
  }

  const togglePiP = async () => {
    if (!videoRef.current) return
    if (document.pictureInPictureElement) await document.exitPictureInPicture()
    else await videoRef.current.requestPictureInPicture()
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return
    if (document.fullscreenElement) document.exitFullscreen()
    else videoRef.current.requestFullscreen()
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (videoRef.current) videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  const saveNote = async () => {
    if (!user || !note.trim()) return
    await addLessonNote(user.uid, lessonId, { content: note, timestamp: currentTime })
    setNote('')
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="overflow-hidden rounded-card border border-line bg-bg-card">
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onEnded={handleEnded}
          onClick={togglePlay}
          playsInline
        />
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            aria-label="Play video"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B0F19"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="border-t border-line p-4">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={seek}
          className="mb-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-bg-muted [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
          aria-label="Video progress"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={togglePlay}>{playing ? '⏸' : '▶'}</Button>
            <span className="text-xs font-medium tabular-nums text-text-muted">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={changeSpeed}>{speed}x</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowNotes(!showNotes)}>📝 Notes</Button>
            <Button variant="ghost" size="sm" onClick={togglePiP}>PiP</Button>
            <Button variant="ghost" size="sm" onClick={toggleFullscreen}>⛶</Button>
            {onNextLesson && <Button size="sm" onClick={onNextLesson}>Next →</Button>}
          </div>
        </div>
      </div>

      {/* Notes Panel */}
      {showNotes && (
        <div className="border-t border-line p-4">
          <h4 className="mb-2 text-sm font-semibold">Notes at {formatTime(currentTime)}</h4>
          <div className="flex gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 rounded-btn border border-line bg-bg-elevated px-3 py-2 text-sm"
              placeholder="Add a note at this timestamp..."
              onKeyDown={(e) => e.key === 'Enter' && saveNote()}
            />
            <Button size="sm" onClick={saveNote}>Save</Button>
          </div>
        </div>
      )}

      {completed && (
        <div className="border-t border-line bg-emerald-dim p-3 text-center text-sm font-semibold text-emerald">
          ✓ Lesson completed
        </div>
      )}
    </div>
  )
}
