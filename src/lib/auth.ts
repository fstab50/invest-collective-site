import { headers } from 'next/headers';

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
 * Get authentication information from Cloudflare Access headers
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

  // Debug logging in production
  console.log('[Auth Debug] Headers check:', {
    hasJwt: !!jwt,
    hasEmail: !!email,
    email: email || 'none',
    allHeaders: Array.from(headersList.entries()).map(([key]) => key).filter(k => k.startsWith('cf-')),
  });

  if (!jwt || !email) {
    return null;
  }

  try {
    // Decode JWT payload (without verification - Cloudflare has already verified it)
    // JWT format: header.payload.signature
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      // Malformed JWT but we have email from header
      return {
        isAuthenticated: true,
        email: email,
      };
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));

    return {
      isAuthenticated: true,
      email: email, // Use email from header (more reliable)
      userId: payload.sub,
      groups: payload.groups || [],
    };
  } catch (error) {
    console.error('Failed to decode Cloudflare Access JWT:', error);
    // Still authenticated, use email from header
    return {
      isAuthenticated: true,
      email: email,
    };
  }
}

/**
 * Get user email from Cloudflare Access JWT
 * Returns null if not authenticated or email not available
 */
export async function getUserEmail(): Promise<string | null> {
  const authInfo = await getAuthInfo();
  return authInfo?.email || null;
}
