import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /blogs, /blogs/my-post)
  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedRoutes = ['/blogs', '/faq']

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route === '/blogs') {
      // Protect /blogs and any sub-routes like /blogs/[slug]
      return path.startsWith('/blogs')
    }
    return path === route
  })

  if (isProtectedRoute) {
    // Check if user is authenticated (has user data in localStorage)
    // Since we can't access localStorage in middleware, we'll check for a session cookie
    // For now, we'll let the client-side check handle it, but we can add server-side checks later
    // This middleware is mainly for redirecting unauthenticated users
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}