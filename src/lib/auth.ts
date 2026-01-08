import { headers } from 'next/headers';

/**
 * Get authentication information from Cloudflare Access headers
 * Returns null if not authenticated
 *
 * Note: Cloudflare Access only sends headers on protected routes (/admin*).
 * This means auth status will only show when on admin pages.
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
