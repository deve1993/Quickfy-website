/**
 * Environment verification utilities
 * Tests that environment variables are accessible without process errors
 */

import { isProduction, isDevelopment, getClientEnv } from './env';
import { getProcessEnv } from './polyfills';

export function verifyEnvironmentAccess(): boolean {
  try {
    // Test client environment detection
    const prodCheck = isProduction();
    const devCheck = isDevelopment();

    // Test client environment variable access
    const nodeEnv = getClientEnv('NODE_ENV');
    const analyticsEnabled = getClientEnv('ANALYTICS_ENABLED');

    // Test polyfill environment access
    const processNodeEnv = getProcessEnv('NEXT_PUBLIC_NODE_ENV');

    console.log('Environment verification results:', {
      isProduction: prodCheck,
      isDevelopment: devCheck,
      nodeEnv,
      analyticsEnabled,
      processNodeEnv,
      timestamp: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Environment verification failed:', error);
    return false;
  }
}

// Auto-verify on client-side
if (typeof window !== 'undefined') {
  // Run verification after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(verifyEnvironmentAccess, 100);
    });
  } else {
    setTimeout(verifyEnvironmentAccess, 100);
  }
}