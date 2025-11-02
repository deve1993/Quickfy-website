import { useState, useCallback } from 'react'
import { reportError, addBreadcrumb } from '../templates/sentry-config'

/**
 * PATTERN 1: useAsyncError Hook
 *
 * Throw async errors to be caught by Error Boundary
 */
export function useAsyncError() {
  const [, setError] = useState()

  return useCallback(
    (error: Error) => {
      setError(() => {
        throw error
      })
    },
    [setError]
  )
}

// Usage example
export function AsyncComponent() {
  const throwError = useAsyncError()

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data')
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    } catch (error) {
      throwError(error as Error)
    }
  }

  return <div>{/* Component JSX */}</div>
}

/**
 * PATTERN 2: Error Recovery Hook
 *
 * Automatically retry failed operations
 */
interface UseErrorRecoveryOptions {
  maxRetries?: number
  retryDelay?: number
  onError?: (error: Error) => void
}

export function useErrorRecovery<T>(
  asyncFn: () => Promise<T>,
  options: UseErrorRecoveryOptions = {}
) {
  const { maxRetries = 3, retryDelay = 1000, onError } = options

  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async (): Promise<T | null> => {
    try {
      const result = await asyncFn()
      setRetryCount(0)
      setError(null)
      return result
    } catch (err) {
      const error = err as Error
      setError(error)
      onError?.(error)

      if (retryCount < maxRetries) {
        setIsRetrying(true)
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        setRetryCount((prev) => prev + 1)
        setIsRetrying(false)
        return execute()
      }

      reportError(error, { retryCount, maxRetries })
      return null
    }
  }, [asyncFn, retryCount, maxRetries, retryDelay, onError])

  return { execute, retryCount, isRetrying, error }
}

/**
 * PATTERN 3: API Error Handler
 *
 * Centralized API error handling with custom error types
 */
export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public fields?: Record<string, string[]>) {
    super(message)
    this.name = 'ValidationError'
  }
}

export async function handleAPIResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))

    // Handle specific status codes
    switch (response.status) {
      case 400:
        throw new ValidationError(
          data.message || 'Validation failed',
          data.fields
        )
      case 401:
        // Redirect to login
        window.location.href = '/login'
        throw new APIError(401, 'Unauthorized')
      case 403:
        throw new APIError(403, 'Forbidden', data.code)
      case 404:
        throw new APIError(404, 'Not found', data.code)
      case 422:
        throw new ValidationError(data.message || 'Invalid input', data.errors)
      case 500:
        throw new APIError(500, 'Server error', data.code)
      default:
        throw new APIError(response.status, data.message || 'Request failed')
    }
  }

  return response.json()
}

export function handleAPIError(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message
  }

  if (error instanceof APIError) {
    switch (error.status) {
      case 401:
        return 'Please log in to continue'
      case 403:
        return 'You do not have permission to perform this action'
      case 404:
        return 'The requested resource was not found'
      case 500:
        return 'A server error occurred. Please try again later'
      default:
        return error.message
    }
  }

  if (error instanceof NetworkError) {
    return 'Network error. Please check your connection'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

/**
 * PATTERN 4: Global Error Handler
 *
 * Catch unhandled errors and promise rejections
 */
export function initGlobalErrorHandler() {
  // Handle unhandled errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)

    addBreadcrumb('Global Error', 'error', 'error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })

    reportError(event.error || new Error(event.message), {
      type: 'global-error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })

    // Prevent default browser error handling
    event.preventDefault()
  })

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)

    addBreadcrumb('Unhandled Promise Rejection', 'error', 'error', {
      reason: event.reason,
    })

    const error =
      event.reason instanceof Error ? event.reason : new Error(String(event.reason))

    reportError(error, {
      type: 'unhandled-promise-rejection',
    })

    // Prevent default browser error handling
    event.preventDefault()
  })
}

/**
 * PATTERN 5: Form Validation Error Handler
 */
interface ValidationErrors {
  [field: string]: string[]
}

export function useFormErrors() {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const handleValidationError = (error: ValidationError) => {
    if (error.fields) {
      setErrors(error.fields)
    }
  }

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const clearAllErrors = () => {
    setErrors({})
  }

  const getFieldError = (field: string): string | undefined => {
    return errors[field]?.[0]
  }

  const hasError = (field: string): boolean => {
    return !!errors[field]
  }

  return {
    errors,
    setErrors,
    clearError,
    clearAllErrors,
    getFieldError,
    hasError,
    handleValidationError,
  }
}

/**
 * PATTERN 6: Error Toast Notifications
 */
interface ToastOptions {
  duration?: number
  type?: 'error' | 'warning' | 'info' | 'success'
}

export function useErrorToast() {
  const showToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const { duration = 5000, type = 'error' } = options

      // Implement with your toast library (e.g., react-hot-toast, react-toastify)
      // Example with react-hot-toast:
      // toast[type](message, { duration })

      console.log(`[Toast ${type}]:`, message)
    },
    []
  )

  const showErrorToast = useCallback(
    (error: unknown, fallbackMessage = 'An error occurred') => {
      const message = error instanceof Error ? error.message : fallbackMessage
      showToast(message, { type: 'error' })
    },
    [showToast]
  )

  return { showToast, showErrorToast }
}

/**
 * PATTERN 7: Graceful Degradation
 *
 * Provide fallback functionality when features fail
 */
export function useFeatureWithFallback<T>(
  primaryFn: () => Promise<T>,
  fallbackFn: () => T,
  featureName: string
) {
  const [useFallback, setUseFallback] = useState(false)

  const execute = useCallback(async (): Promise<T> => {
    if (useFallback) {
      return fallbackFn()
    }

    try {
      return await primaryFn()
    } catch (error) {
      console.warn(`${featureName} failed, using fallback`, error)
      reportError(error as Error, { feature: featureName, fallback: true })
      setUseFallback(true)
      return fallbackFn()
    }
  }, [primaryFn, fallbackFn, featureName, useFallback])

  return { execute, useFallback }
}

/**
 * PATTERN 8: Error Logging Levels
 */
export enum ErrorLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export function logError(
  error: Error | string,
  level: ErrorLevel = ErrorLevel.ERROR,
  context?: Record<string, any>
) {
  const message = typeof error === 'string' ? error : error.message

  // Console logging
  switch (level) {
    case ErrorLevel.DEBUG:
    case ErrorLevel.INFO:
      console.info(`[${level}]`, message, context)
      break
    case ErrorLevel.WARNING:
      console.warn(`[${level}]`, message, context)
      break
    case ErrorLevel.ERROR:
    case ErrorLevel.CRITICAL:
      console.error(`[${level}]`, message, context)
      break
  }

  // Send to monitoring service for errors and critical
  if (level === ErrorLevel.ERROR || level === ErrorLevel.CRITICAL) {
    const err = typeof error === 'string' ? new Error(error) : error
    reportError(err, { level, ...context })
  }
}
