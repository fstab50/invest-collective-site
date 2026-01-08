import { headers, cookies } from 'next/headers';

/**
 * Check if the current request is authenticated via Cloudflare Access
 * This function should be called from Server Components or Server Actions
 */
export async function isAuthenticated(): Promise<boolean> {
  // In development, consider authenticated for testing
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const headersList = await headers();
  const jwt = headersList.get('cf-access-jwt-assertion');
  const email = headersList.get('cf-access-authenticated-user-email');

  return !!(jwt && email);
}

/**
 * Get authentication information from Cloudflare Access headers or cookies
 * Returns null if not authenticated
 */
export async function getAuthInfo(): Promise<{
  isAuthenticated: boolean;
  email?: string;
  userId?: string;
  groups?: string[];
} | null> {
  // In development mode
  if (process.env.NODE_ENV === 'development') {
    return {
      isAuthenticated: true,
      email: 'dev@localhost',
      userId: 'dev-user',
      groups: ['admin'],
    };
  }

  const headersList = await headers();
  const jwt = headersList.get('cf-access-jwt-assertion');
  const email = headersList.get('cf-access-authenticated-user-email');

  // If we have Cloudflare Access headers, use them and update cookie
  if (jwt && email) {
    try {
      // Decode JWT payload (without verification - Cloudflare has already verified it)
      // JWT format: header.payload.signature
      const parts = jwt.split('.');
      let authInfo: {
        isAuthenticated: boolean;
        email: string;
        userId?: string;
        groups?: string[];
      };

      if (parts.length !== 3) {
        // Malformed JWT but we have email from header
        authInfo = {
          isAuthenticated: true,
          email: email,
        };
      } else {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
        authInfo = {
          isAuthenticated: true,
          email: email, // Use email from header (more reliable)
          userId: payload.sub,
          groups: payload.groups || [],
        };
      }

      // Store auth info in cookie for persistence across non-protected pages
      const cookieStore = await cookies();
      cookieStore.set('cf-auth-info', JSON.stringify(authInfo), {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return authInfo;
    } catch (error) {
      console.error('Failed to decode Cloudflare Access JWT:', error);
      // Still authenticated, use email from header
      const authInfo = {
        isAuthenticated: true,
        email: email,
      };

      // Store in cookie
      const cookieStore = await cookies();
      cookieStore.set('cf-auth-info', JSON.stringify(authInfo), {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return authInfo;
    }
  }

  // No headers present, check cookie for previously authenticated state
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('cf-auth-info');

  if (authCookie?.value) {
    try {
      return JSON.parse(authCookie.value);
    } catch (error) {
      console.error('Failed to parse auth cookie:', error);
      return null;
    }
  }

  return null;
}

/**
 * Get user email from Cloudflare Access JWT
 * Returns null if not authenticated or email not available
 */
export async function getUserEmail(): Promise<string | null> {
  const authInfo = await getAuthInfo();
  return authInfo?.email || null;
}
