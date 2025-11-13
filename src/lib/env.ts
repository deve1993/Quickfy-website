/**
 * Environment configuration utility
 * Provides safe access to environment variables on both client and server
 */

// Server-side environment variables
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  ANALYZE: process.env.ANALYZE === 'true',
} as const;

// Client-side environment variables (must be prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV || process.env.NODE_ENV || 'development',
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
  PERFORMANCE_MONITORING: process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING === 'true',
  SERVICE_WORKER_ENABLED: process.env.NEXT_PUBLIC_SERVICE_WORKER_ENABLED === 'true',
  DEBUG_SCRIPTS: process.env.NEXT_PUBLIC_DEBUG_SCRIPTS === 'true',
} as const;

// Runtime environment detection
export const isProduction = () => {
  // Client-side check
  if (typeof window !== 'undefined') {
    return clientEnv.NODE_ENV === 'production';
  }
  // Server-side check
  return serverEnv.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  // Client-side check
  if (typeof window !== 'undefined') {
    return clientEnv.NODE_ENV === 'development';
  }
  // Server-side check
  return serverEnv.NODE_ENV === 'development';
};

export const isLocalhost = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }
  return false;
};

// Safe environment variable access for client components
export const getClientEnv = (key: keyof typeof clientEnv) => {
  if (typeof window === 'undefined') {
    // Server-side rendering - return default values
    return clientEnv[key];
  }
  return clientEnv[key];
};

// Environment validation
export const validateEnv = () => {
  const errors: string[] = [];

  // Add any required environment variable validations here
  if (isProduction() && !clientEnv.ANALYTICS_ENABLED) {
    console.warn('Analytics is disabled in production');
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }
};

// Type definitions for environment variables
export type ServerEnv = typeof serverEnv;
export type ClientEnv = typeof clientEnv;