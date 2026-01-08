import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // /admin routes are protected by Cloudflare Zero Trust at the edge
  // If a request reaches this middleware, Zero Trust has already authenticated the user
  // This middleware just logs access for debugging purposes
  if (path.startsWith('/admin')) {
    // In development, allow unrestricted access
    if (process.env.NODE_ENV === 'development') {
      console.log('Admin access granted (development mode)');
      return NextResponse.next();
    }

    // In production, Cloudflare Zero Trust handles authentication
    // Log the access for monitoring
    console.log('Admin access:', {
      path,
      timestamp: new Date().toISOString(),
      hasJWT: !!request.headers.get('cf-access-jwt-assertion'),
      hasClientId: !!request.headers.get('cf-access-client-id'),
    });

    // Allow access - Cloudflare Zero Trust has already verified the user
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
