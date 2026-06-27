import type { Timestamp } from 'firebase/firestore'

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  category: CourseCategory
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  discountPrice?: number
  currency: 'INR'
  instructorId: string
  instructorName: string
  thumbnail?: string
  previewVideoUrl?: string
  totalLessons: number
  totalDuration: number // in minutes
  enrollmentCount: number
  rating: number
  reviewCount: number
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  sections: Section[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type CourseCategory =
  | 'stock-basics'
  | 'technical-analysis'
  | 'options'
  | 'futures'
  | 'intraday'
  | 'swing-trading'
  | 'risk-management'
  | 'psychology'
  | 'fundamental-analysis'
  | 'price-action'

export interface Section {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'pdf' | 'quiz' | 'assignment'
  duration: number // in minutes
  order: number
  sectionId: string
  courseId: string
  videoUrl?: string
  pdfUrl?: string
  attachments: Attachment[]
  isFreePreview: boolean
  content?: string
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: 'pdf' | 'image' | 'spreadsheet' | 'other'
  size: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  courseTitle: string
  enrolledAt: Timestamp
  completedAt?: Timestamp
  progress: number // 0-100
  completedLessons: string[]
  currentLessonId: string
  currentSectionId: string
  lastAccessedAt: Timestamp
  totalTimeSpent: number // in minutes
  status: 'active' | 'completed' | 'expired'
  certificateId?: string
}

export interface LessonProgress {
  lessonId: string
  courseId: string
  userId: string
  completed: boolean
  completedAt?: Timestamp
  videoProgress: number // seconds watched
  videoDuration: number // total seconds
  notes: LessonNote[]
  lastPosition: number // resume point in seconds
}

export interface LessonNote {
  id: string
  content: string
  timestamp: number // video timestamp in seconds
  createdAt: Timestamp
}

export interface Quiz {
  id: string
  courseId: string
  lessonId: string
  title: string
  questions: QuizQuestion[]
  timeLimit: number // in minutes
  passingScore: number // percentage
  attempts: number // max attempts allowed
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // index
  explanation: string
  points: number
}

export interface QuizSubmission {
  id: string
  quizId: string
  userId: string
  courseId: string
  answers: number[]
  score: number
  totalPoints: number
  percentage: number
  passed: boolean
  timeTaken: number // in seconds
  submittedAt: Timestamp
}

export interface Certificate {
  id: string
  userId: string
  userName: string
  courseId: string
  courseTitle: string
  instructorName: string
  issuedAt: Timestamp
  verificationId: string
  downloadUrl?: string
}

export interface DailyStreak {
  userId: string
  currentStreak: number
  longestStreak: number
  lastActiveDate: string // YYYY-MM-DD
  streakHistory: string[] // dates
}

export interface TeacherStats {
  totalStudents: number
  totalCourses: number
  totalRevenue: number
  averageRating: number
  completionRate: number
}
