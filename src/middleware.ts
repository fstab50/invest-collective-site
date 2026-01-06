import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes with Cloudflare Access
  if (path.startsWith('/admin')) {
    // Cloudflare Access adds headers when authenticated
    const cfAccessJwt = request.headers.get('cf-access-jwt-assertion');

    // In development, allow access (Cloudflare Access only works in production)
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }

    // In production, require Cloudflare Access authentication
    if (!cfAccessJwt) {
      // Redirect to Cloudflare Access login
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
