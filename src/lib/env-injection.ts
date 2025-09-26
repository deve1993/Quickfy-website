/**
 * Environment injection utility for external scripts
 * Safely passes environment variables to client-side scripts
 */

import { clientEnv } from './env';

// Define which environment variables are safe to expose to external scripts
export const SAFE_CLIENT_ENV_VARS = {
  NODE_ENV: clientEnv.NODE_ENV,
  APP_ENV: clientEnv.APP_ENV,
  ANALYTICS_ENABLED: clientEnv.ANALYTICS_ENABLED ? 'true' : 'false',
  PERFORMANCE_MONITORING: clientEnv.PERFORMANCE_MONITORING ? 'true' : 'false',
  SERVICE_WORKER_ENABLED: clientEnv.SERVICE_WORKER_ENABLED || (clientEnv.NODE_ENV === 'production') ? 'true' : 'false',
  DEBUG_SCRIPTS: clientEnv.DEBUG_SCRIPTS ? 'true' : 'false',
} as const;

/**
 * Generate a script tag that injects environment variables into window.__QUICKFY_ENV__
 * This allows external scripts to access environment variables safely
 */
export function generateEnvInjectionScript(): string {
  const envVars = JSON.stringify(SAFE_CLIENT_ENV_VARS);

  return `
    <script>
      window.__QUICKFY_ENV__ = ${envVars};
    </script>
  `;
}

/**
 * Generate inline script content for environment injection
 * Use this when you need the script content as a string
 */
export function getEnvInjectionScriptContent(): string {
  const envVars = JSON.stringify(SAFE_CLIENT_ENV_VARS);

  return `window.__QUICKFY_ENV__ = ${envVars};`;
}

/**
 * Safe environment variable getter for client-side usage
 * This can be used in external scripts to safely access environment variables
 */
export function getClientEnvVar(key: keyof typeof SAFE_CLIENT_ENV_VARS): string | boolean | undefined {
  if (typeof window !== 'undefined' && window.__QUICKFY_ENV__) {
    return window.__QUICKFY_ENV__[key];
  }
  return undefined;
}

/**
 * Environment detection utilities for external scripts
 */
export const envUtils = {
  isProduction: () => getClientEnvVar('NODE_ENV') === 'production',
  isDevelopment: () => getClientEnvVar('NODE_ENV') === 'development',
  isAnalyticsEnabled: () => getClientEnvVar('ANALYTICS_ENABLED') === 'true',
  isPerformanceMonitoringEnabled: () => getClientEnvVar('PERFORMANCE_MONITORING') === 'true',
  isServiceWorkerEnabled: () => getClientEnvVar('SERVICE_WORKER_ENABLED') === 'true',
};

// Type definitions for global environment object
declare global {
  interface Window {
    __QUICKFY_ENV__: typeof SAFE_CLIENT_ENV_VARS;
  }
}