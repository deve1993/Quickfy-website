/**
 * Environment variable type definitions
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server-side environment variables
      NODE_ENV: 'development' | 'production' | 'test';
      ANALYZE?: 'true' | 'false';

      // Public environment variables (available on client-side)
      NEXT_PUBLIC_NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
      NEXT_PUBLIC_ANALYTICS_ENABLED?: 'true' | 'false';
      NEXT_PUBLIC_PERFORMANCE_MONITORING?: 'true' | 'false';

      // Optional environment variables
      NEXT_PUBLIC_API_URL?: string;
      NEXT_PUBLIC_ANALYTICS_ID?: string;
    }
  }
}

// Export empty object to make this a module
export {};