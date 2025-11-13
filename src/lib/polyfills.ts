/**
 * Polyfills for browser environment
 * Provides safe fallbacks for browser APIs
 * Simplified for Next.js 15 compatibility
 */

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
