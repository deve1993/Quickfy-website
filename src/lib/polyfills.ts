/**
 * Polyfills for browser environment
 * Provides safe fallbacks for Node.js globals that might be referenced in client code
 */

// Process polyfill for client-side
declare global {
  interface Window {
    __NEXT_ENV__?: Record<string, string | undefined>;
  }
}

export function initializePolyfills() {
  if (typeof window !== 'undefined' && !window.__NEXT_ENV__) {
    // Create a safe environment object for browser
    window.__NEXT_ENV__ = {
      NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV || 'development',
      NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV || 'development',
      NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
      NEXT_PUBLIC_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
      NEXT_PUBLIC_PERFORMANCE_MONITORING: process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING,
    };
  }
}

// Safe environment access function
export function getProcessEnv(key: string): string | undefined {
  if (typeof window !== 'undefined') {
    // Client-side: use our safe environment object
    return window.__NEXT_ENV__?.[key];
  } else {
    // Server-side: use actual process.env
    return process.env[key];
  }
}

// Environment detection utilities
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}

// Safe console methods that work in all environments
export const safeConsole = {
  log: (...args: unknown[]) => {
    if (typeof console !== 'undefined' && console.log) {
      console.log(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (typeof console !== 'undefined' && console.error) {
      console.error(...args);
    }
  },
  info: (...args: unknown[]) => {
    if (typeof console !== 'undefined' && console.info) {
      console.info(...args);
    }
  }
};