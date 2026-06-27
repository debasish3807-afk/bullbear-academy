import { notFound } from 'next/navigation'
import { courses } from '@/lib/constants'
import { Card, Badge, Button, Progress } from '@/components/ui'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  return { title: course?.title || 'Course' }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="text-gold hover:underline">Home</Link> /
            <Link href="/courses" className="text-gold hover:underline">Courses</Link> /
            <span>{course.title}</span>
          </div>
          <h1 className="mb-2 text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold">{course.title}</h1>
          <p className="max-w-[600px] text-text-secondary">{course.description}</p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <Card>
              <h3 className="mb-3 font-semibold">What you&apos;ll learn</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Understand core concepts from scratch with real market examples</li>
                <li>• Build practical skills through hands-on assignments and quizzes</li>
                <li>• Apply strategies to live Indian market conditions</li>
                <li>• Develop risk-first thinking and capital protection habits</li>
              </ul>
            </Card>
            <Card>
              <h3 className="mb-3 font-semibold">Curriculum</h3>
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="rounded-btn border border-line bg-bg-elevated p-3">
                    <strong className="text-sm">Module {i + 1}: {['Foundations', 'Core Concepts', 'Advanced Techniques', 'Live Application'][i]}</strong>
                    <div className="text-xs text-text-muted">{Math.floor(course.lessons / 4)} lessons · {Math.floor(course.hours / 4)} hrs</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="mb-3 font-semibold">Student Reviews</h3>
              <div className="space-y-3">
                <div><strong className="text-sm">Rahul Kumar</strong> <span className="text-xs text-gold">★★★★★</span><p className="text-sm text-text-secondary">Clear explanations with real market examples. Worth every rupee.</p></div>
                <div><strong className="text-sm">Sanjana Das</strong> <span className="text-xs text-gold">★★★★★</span><p className="text-sm text-text-secondary">The assignments forced me to actually apply what I learned. Changed my trading.</p></div>
              </div>
            </Card>
          </div>
          <div className="space-y-5">
            <Card>
              <div className="mb-4 flex h-[160px] items-center justify-center rounded-[14px] bg-gradient-to-br from-bg-elevated to-bg">
                <Link href="/dashboard"><Button>Preview Lesson</Button></Link>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Badge variant={course.level === 'Beginner' ? 'green' : course.level === 'Intermediate' ? 'blue' : 'gold'}>{course.level}</Badge>
                <span className="font-heading text-xl font-extrabold text-gold">₹{course.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="mb-4 space-y-1.5 text-sm text-text-secondary">
                <div>{course.hours} hours of video content</div>
                <div>{course.lessons} lessons</div>
                <div>Certificate on completion</div>
                <div>Lifetime access for subscribers</div>
              </div>
              <div className="flex gap-3">
                <Link href="/signup" className="flex-1"><Button className="w-full">Enroll Now</Button></Link>
                <Button variant="outline">Wishlist</Button>
              </div>
            </Card>
            <Card>
              <h4 className="mb-2 text-sm font-semibold">Instructor</h4>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-dim font-bold text-gold">{course.instructor.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <strong className="text-sm">{course.instructor}</strong>
                  <div className="text-xs text-text-muted">{course.enrolled} students · {course.rating}★ rating</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
