import { headers } from 'next/headers';

/**
 * Check if the current request is authenticated via Cloudflare Access
 * This function should be called from Server Components or Server Actions
 */
export function isAuthenticated(): boolean {
  // In development, consider authenticated for testing
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const headersList = headers();
  const jwt = headersList.get('cf-access-jwt-assertion');
  const clientId = headersList.get('cf-access-client-id');

  return !!(jwt && clientId);
}

/**
 * Get authentication information from Cloudflare Access headers
 * Returns null if not authenticated
 */
export function getAuthInfo(): {
  isAuthenticated: boolean;
  email?: string;
  userId?: string;
  groups?: string[];
} | null {
  // In development mode
  if (process.env.NODE_ENV === 'development') {
    return {
      isAuthenticated: true,
      email: 'dev@localhost',
      userId: 'dev-user',
      groups: ['admin'],
    };
  }

  const headersList = headers();
  const jwt = headersList.get('cf-access-jwt-assertion');
  const clientId = headersList.get('cf-access-client-id');

  if (!jwt || !clientId) {
    return null;
  }

  try {
    // Decode JWT payload (without verification - Cloudflare has already verified it)
    // JWT format: header.payload.signature
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      return { isAuthenticated: true }; // Malformed but authenticated
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));

    return {
      isAuthenticated: true,
      email: payload.email,
      userId: payload.sub,
      groups: payload.groups || [],
    };
  } catch (error) {
    console.error('Failed to decode Cloudflare Access JWT:', error);
    // Still authenticated, just couldn't extract user info
    return { isAuthenticated: true };
  }
}

/**
 * Get user email from Cloudflare Access JWT
 * Returns null if not authenticated or email not available
 */
export function getUserEmail(): string | null {
  const authInfo = getAuthInfo();
  return authInfo?.email || null;
}
