import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/quickstart', '/demo', '/contact', '/api/auth/login', '/api/auth/callback', '/api/auth/logout', '/unauthorized'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to public routes without authentication check
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, check authentication
  try {
    const session = await getSession(req, NextResponse.next());
    if (!session) {
      const redirectUrl = new URL('/unauthorized', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  } catch (error) {
    const redirectUrl = new URL('/unauthorized', req.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    // Match all routes except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
