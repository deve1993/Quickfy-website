import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { CaptureConsole } from '@sentry/integrations'
import { useEffect } from 'react'
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom'

/**
 * SENTRY CONFIGURATION
 *
 * Complete setup for error monitoring with Sentry
 */

// Environment configuration
const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN
const ENVIRONMENT = process.env.NODE_ENV
const RELEASE = process.env.REACT_APP_VERSION || '1.0.0'

// Sample rates
const TRACES_SAMPLE_RATE = ENVIRONMENT === 'production' ? 0.1 : 1.0
const REPLAYS_SESSION_SAMPLE_RATE = 0.1
const REPLAYS_ON_ERROR_SAMPLE_RATE = 1.0

/**
 * Initialize Sentry
 */
export function initSentry() {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not found. Error monitoring is disabled.')
    return
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    release: RELEASE,

    // Integrations
    integrations: [
      // Performance monitoring
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),

      // Session replay
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),

      // Capture console errors
      new CaptureConsole({
        levels: ['error', 'assert'],
      }),
    ],

    // Performance Monitoring
    tracesSampleRate: TRACES_SAMPLE_RATE,

    // Session Replay
    replaysSessionSampleRate: REPLAYS_SESSION_SAMPLE_RATE,
    replaysOnErrorSampleRate: REPLAYS_ON_ERROR_SAMPLE_RATE,

    // Filter errors before sending
    beforeSend(event, hint) {
      // Don't send development errors
      if (ENVIRONMENT === 'development') {
        console.error('[Sentry]', hint.originalException || hint.syntheticException)
        return null
      }

      // Filter out common non-critical errors
      const error = hint.originalException as Error
      if (error?.message) {
        // Ignore network errors
        if (error.message.includes('Network request failed')) {
          return null
        }

        // Ignore cancelled requests
        if (error.message.includes('cancelled')) {
          return null
        }

        // Ignore ResizeObserver errors (browser quirk)
        if (error.message.includes('ResizeObserver')) {
          return null
        }
      }

      return event
    },

    // Add context to all events
    beforeBreadcrumb(breadcrumb, hint) {
      // Filter sensitive data from breadcrumbs
      if (breadcrumb.category === 'xhr' || breadcrumb.category === 'fetch') {
        // Remove auth tokens from URLs
        if (breadcrumb.data?.url) {
          breadcrumb.data.url = breadcrumb.data.url.replace(/token=[^&]+/, 'token=***')
        }
      }
      return breadcrumb
    },

    // Ignore certain URLs
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'chrome-extension://',
      'moz-extension://',
      // Random plugins
      'fb_xd_fragment',
      // Network errors
      'NetworkError',
      'Network request failed',
    ],

    denyUrls: [
      // Browser extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^moz-extension:\/\//i,
    ],
  })

  // Set user context if available
  const user = getUserFromAuth()
  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    })
  }

  // Set custom tags
  Sentry.setTag('app.version', RELEASE)
  Sentry.setTag('app.environment', ENVIRONMENT)
}

/**
 * Custom Error Reporting Functions
 */

// Report error manually
export function reportError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  })
}

// Report message
export function reportMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level)
}

// Add breadcrumb
export function addBreadcrumb(
  message: string,
  category?: string,
  level?: Sentry.SeverityLevel,
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
  })
}

// Set user context
export function setUserContext(user: {
  id: string
  email?: string
  username?: string
}) {
  Sentry.setUser(user)
}

// Clear user context (on logout)
export function clearUserContext() {
  Sentry.setUser(null)
}

// Add custom context
export function setCustomContext(key: string, value: any) {
  Sentry.setContext(key, value)
}

/**
 * React Error Boundary with Sentry
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary

/**
 * React Profiler for performance monitoring
 */
export function ProfiledComponent({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.Profiler name="Component">
      {children}
    </Sentry.Profiler>
  )
}

/**
 * API Error Handling
 */
export function handleAPIError(error: any, endpoint: string) {
  // Add API context
  Sentry.withScope((scope) => {
    scope.setContext('api', {
      endpoint,
      status: error.response?.status,
      method: error.config?.method,
    })

    scope.setLevel('error')

    // Add breadcrumb
    scope.addBreadcrumb({
      category: 'api',
      message: `API Error: ${endpoint}`,
      level: 'error',
      data: {
        status: error.response?.status,
        statusText: error.response?.statusText,
      },
    })

    Sentry.captureException(error)
  })
}

/**
 * Performance Monitoring
 */
export function startTransaction(name: string, op: string) {
  return Sentry.startTransaction({
    name,
    op,
  })
}

export function measurePerformance(name: string, callback: () => void) {
  const transaction = Sentry.startTransaction({
    name,
    op: 'function',
  })

  try {
    callback()
  } finally {
    transaction.finish()
  }
}

/**
 * React Hook for Error Reporting
 */
export function useSentry() {
  return {
    reportError,
    reportMessage,
    addBreadcrumb,
    setUserContext,
    clearUserContext,
    setCustomContext,
  }
}

/**
 * HOC for wrapping components with error boundary
 */
export function withSentryErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return (props: P) => (
    <SentryErrorBoundary fallback={fallback || <DefaultErrorFallback />}>
      <Component {...props} />
    </SentryErrorBoundary>
  )
}

function DefaultErrorFallback() {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>We've been notified and are working on a fix.</p>
    </div>
  )
}

/**
 * Helper to get user from authentication
 */
function getUserFromAuth() {
  try {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

/**
 * Source Maps Upload Script (Add to package.json)
 *
 * "scripts": {
 *   "build": "react-scripts build && npm run sentry:sourcemaps",
 *   "sentry:sourcemaps": "sentry-cli releases files $npm_package_version upload-sourcemaps ./build/static/js --url-prefix '~/static/js'"
 * }
 *
 * .sentryclirc file:
 * [auth]
 * token=YOUR_AUTH_TOKEN
 *
 * [defaults]
 * org=your-org
 * project=your-project
 */
