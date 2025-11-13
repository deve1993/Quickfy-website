/**
 * Application initialization
 * Simplified for Next.js 15 - no auto-initialization
 */

import { validateEnv } from './env';

export function initializeApp() {
  // Validate environment variables (server-side only)
  try {
    validateEnv();
  } catch (error) {
    console.error('Environment validation failed:', error);
    // Don't throw in production to avoid breaking the app
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
  }
}

// NOTE: No auto-initialization - must be called explicitly if needed
// This prevents issues with module loading order and SSR
