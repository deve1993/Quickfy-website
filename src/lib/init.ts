/**
 * Application initialization
 * Sets up environment and polyfills
 */

import { initializePolyfills } from './polyfills';
import { validateEnv } from './env';

export function initializeApp() {
  // Initialize polyfills for browser environment
  if (typeof window !== 'undefined') {
    initializePolyfills();
  }

  // Validate environment variables
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

// Auto-initialize when module is imported on client-side
if (typeof window !== 'undefined') {
  initializeApp();
}