import { getAuthInfo } from '@/lib/auth';
import { Navigation } from '@/app/components/layout/Navigation';

/**
 * Server Component wrapper that passes auth status to the client Navigation component
 */
export function NavigationWrapper() {
  const authInfo = getAuthInfo();

  return <Navigation authInfo={authInfo} />;
}
