import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Note: Firebase Auth state is client-side only.
// This middleware handles basic redirect logic for non-authenticated routes.
// Actual auth protection happens via the ProtectedRoute component.
// For SSR auth, consider Firebase Admin SDK with session cookies.

const publicPaths = [
  '/',
  '/courses',
  '/pricing',
  '/tools',
  '/market-analysis',
  '/blog',
  '/community',
  '/about',
  '/contact',
  '/faq',
  '/support',
  '/search',
  '/login',
  '/signup',
  '/forgot-password',
  '/verify-email',
  '/onboarding',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/live',
]

export function middleware(request: NextRequest) {
  // Allow all paths through - auth is handled client-side via ProtectedRoute
  // This file exists as a placeholder for future server-side auth with session cookies
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
