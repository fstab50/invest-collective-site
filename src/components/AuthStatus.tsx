import { getAuthInfo } from '@/lib/auth';
import { User, Shield } from 'lucide-react';

/**
 * Server Component that displays authentication status
 * Add this to any page to show if the user is authenticated via Cloudflare Access
 */
export function AuthStatus() {
  const authInfo = getAuthInfo();

  if (!authInfo?.isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-lg flex items-center gap-2 text-sm">
        <Shield className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600">Not authenticated</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-50 border border-green-300 rounded-lg px-4 py-2 shadow-lg">
      <div className="flex items-center gap-2 text-sm">
        <Shield className="w-4 h-4 text-green-600" />
        <div>
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-green-700" />
            <span className="font-medium text-green-900">
              {authInfo.email || 'Authenticated'}
            </span>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <span className="text-xs text-green-600">(dev mode)</span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal version - just shows authenticated badge
 */
export function AuthBadge() {
  const authInfo = getAuthInfo();

  if (!authInfo?.isAuthenticated) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
      <Shield className="w-3 h-3" />
      <span>Authenticated</span>
    </div>
  );
}

/**
 * Header version - shows in top navigation
 */
export function AuthHeader() {
  const authInfo = getAuthInfo();

  if (!authInfo?.isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg">
        <User className="w-4 h-4" />
        <span className="font-medium">{authInfo.email || 'Admin'}</span>
      </div>
    </div>
  );
}
