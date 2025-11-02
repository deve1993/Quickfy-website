import { Component, ReactNode, ErrorInfo } from 'react'
import * as Sentry from '@sentry/react'

// Error Boundary Props
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: Array<string | number>
  resetOnPropsChange?: boolean
}

// Error Boundary State
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * PATTERN 1: Basic Error Boundary
 *
 * Catches errors in component tree and shows fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error monitoring service
    console.error('Error Boundary caught error:', error, errorInfo)

    // Send to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    })

    // Custom error callback
    this.props.onError?.(error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error boundary when reset keys change
    if (
      this.props.resetKeys &&
      !areArraysEqual(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.reset()
    }

    // Reset on any prop change
    if (this.props.resetOnPropsChange && prevProps !== this.props) {
      this.reset()
    }
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.reset)
        }
        return this.props.fallback
      }

      // Default fallback
      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />
    }

    return this.props.children
  }
}

// Default fallback UI
function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={errorContainerStyles}>
      <div style={errorCardStyles}>
        <h1 style={titleStyles}>Something went wrong</h1>
        <p style={messageStyles}>
          We're sorry for the inconvenience. An error occurred while loading this
          section.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details style={detailsStyles}>
            <summary style={summaryStyles}>Error Details</summary>
            <pre style={preStyles}>{error.message}</pre>
            <pre style={preStyles}>{error.stack}</pre>
          </details>
        )}

        <div style={actionsStyles}>
          <button onClick={reset} style={buttonStyles}>
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            style={{ ...buttonStyles, ...secondaryButtonStyles }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * PATTERN 2: Nested Error Boundaries
 *
 * Use multiple boundaries at different levels for granular error handling
 */
export function AppWithErrorBoundaries() {
  return (
    <ErrorBoundary
      fallback={<FullPageError />}
      onError={(error) => console.error('App-level error:', error)}
    >
      <Header />

      <main>
        <ErrorBoundary
          fallback={<SectionError section="sidebar" />}
          resetKeys={[/* deps */]}
        >
          <Sidebar />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<SectionError section="content" />}
          resetKeys={[/* deps */]}
        >
          <Content />
        </ErrorBoundary>
      </main>

      <Footer />
    </ErrorBoundary>
  )
}

function FullPageError() {
  return <div>Full page error - something critical failed</div>
}

function SectionError({ section }: { section: string }) {
  return <div>Error in {section} section</div>
}

function Header() {
  return <div>Header</div>
}
function Sidebar() {
  return <div>Sidebar</div>
}
function Content() {
  return <div>Content</div>
}
function Footer() {
  return <div>Footer</div>
}

/**
 * PATTERN 3: Error Boundary with Retry Logic
 *
 * Automatically retry failed operations
 */
interface RetryErrorBoundaryProps extends ErrorBoundaryProps {
  maxRetries?: number
  retryDelay?: number
}

interface RetryErrorBoundaryState extends ErrorBoundaryState {
  retryCount: number
}

export class RetryErrorBoundary extends Component<
  RetryErrorBoundaryProps,
  RetryErrorBoundaryState
> {
  constructor(props: RetryErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<RetryErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      contexts: { react: { componentStack: errorInfo.componentStack } },
    })

    this.props.onError?.(error, errorInfo)

    // Auto-retry if under max retries
    const maxRetries = this.props.maxRetries || 3
    if (this.state.retryCount < maxRetries) {
      const delay = this.props.retryDelay || 1000
      setTimeout(() => {
        this.setState((prev) => ({
          hasError: false,
          error: null,
          errorInfo: null,
          retryCount: prev.retryCount + 1,
        }))
      }, delay)
    }
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const maxRetries = this.props.maxRetries || 3
      const isMaxRetries = this.state.retryCount >= maxRetries

      if (!isMaxRetries) {
        return (
          <div>
            Retrying... (Attempt {this.state.retryCount + 1}/{maxRetries})
          </div>
        )
      }

      return (
        <div>
          <p>Failed after {maxRetries} attempts</p>
          <button onClick={this.reset}>Try Again</button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * PATTERN 4: Route-Level Error Boundaries
 *
 * Wrap each route with error boundary
 */
import { Routes, Route } from 'react-router-dom'

export function RoutesWithErrorBoundaries() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary
            fallback={<div>Error on Home page</div>}
            resetKeys={['home']}
          >
            <HomePage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ErrorBoundary
            fallback={<div>Error on Dashboard</div>}
            resetKeys={['dashboard']}
          >
            <DashboardPage />
          </ErrorBoundary>
        }
      />
    </Routes>
  )
}

function HomePage() {
  return <div>Home</div>
}
function DashboardPage() {
  return <div>Dashboard</div>
}

// Helper function
function areArraysEqual(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((val, index) => val === b[index])
}

// Styles
const errorContainerStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  padding: '2rem',
}

const errorCardStyles: React.CSSProperties = {
  maxWidth: '600px',
  width: '100%',
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}

const titleStyles: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#d32f2f',
}

const messageStyles: React.CSSProperties = {
  fontSize: '1rem',
  color: '#666',
  marginBottom: '1.5rem',
}

const detailsStyles: React.CSSProperties = {
  marginBottom: '1.5rem',
  padding: '1rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  border: '1px solid #ddd',
}

const summaryStyles: React.CSSProperties = {
  cursor: 'pointer',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
}

const preStyles: React.CSSProperties = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: '0.875rem',
  color: '#d32f2f',
  marginTop: '0.5rem',
}

const actionsStyles: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
}

const buttonStyles: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#1976d2',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}

const secondaryButtonStyles: React.CSSProperties = {
  backgroundColor: '#757575',
}
