/**
 * Content Security Policy (CSP) Middleware
 *
 * Implements secure CSP headers to prevent XSS, clickjacking, and other attacks
 */

// CSP Directives Configuration
export interface CSPConfig {
  'default-src'?: string[]
  'script-src'?: string[]
  'script-src-elem'?: string[]
  'script-src-attr'?: string[]
  'style-src'?: string[]
  'style-src-elem'?: string[]
  'style-src-attr'?: string[]
  'img-src'?: string[]
  'font-src'?: string[]
  'connect-src'?: string[]
  'media-src'?: string[]
  'object-src'?: string[]
  'frame-src'?: string[]
  'frame-ancestors'?: string[]
  'base-uri'?: string[]
  'form-action'?: string[]
  'worker-src'?: string[]
  'manifest-src'?: string[]
  'upgrade-insecure-requests'?: boolean
  'block-all-mixed-content'?: boolean
}

/**
 * PATTERN 1: Strict CSP Configuration
 *
 * Recommended for maximum security
 */
export const strictCSPConfig: CSPConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    // Use nonces instead of 'unsafe-inline'
    // Nonces are generated per request
  ],
  'style-src': [
    "'self'",
    // Use nonces for inline styles
  ],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'"],
  'media-src': ["'self'"],
  'object-src': ["'none'"],
  'frame-src': ["'none'"],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': true,
  'block-all-mixed-content': true,
}

/**
 * PATTERN 2: Development-Friendly CSP
 *
 * Allows hot reloading and development tools
 */
export const developmentCSPConfig: CSPConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // For HMR
    "'unsafe-eval'", // For dev tools
    'localhost:*',
    'ws://localhost:*', // WebSocket for HMR
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", 'ws://localhost:*', 'http://localhost:*'],
  'frame-ancestors': ["'none'"],
}

/**
 * PATTERN 3: Production CSP with CDN
 *
 * Allows specific external resources
 */
export const productionCSPConfig: CSPConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    'https://cdn.jsdelivr.net',
    'https://unpkg.com',
    'https://*.cloudflare.com',
    // Google Analytics
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Many CSS-in-JS libraries require this
    'https://fonts.googleapis.com',
    'https://cdn.jsdelivr.net',
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
    'blob:',
    'https://*.cloudinary.com',
    'https://*.amazonaws.com',
  ],
  'font-src': [
    "'self'",
    'data:',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
  ],
  'connect-src': [
    "'self'",
    'https://api.example.com',
    'wss://api.example.com',
    'https://*.sentry.io',
    'https://www.google-analytics.com',
  ],
  'media-src': ["'self'", 'https:', 'blob:'],
  'object-src': ["'none'"],
  'frame-src': ["'self'", 'https://www.youtube.com', 'https://player.vimeo.com'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': true,
  'block-all-mixed-content': true,
}

/**
 * Generate CSP header string from config
 */
export function generateCSPHeader(config: CSPConfig): string {
  const directives: string[] = []

  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value)) {
      directives.push(`${key} ${value.join(' ')}`)
    } else if (value === true) {
      directives.push(key)
    }
  }

  return directives.join('; ')
}

/**
 * Express Middleware
 */
export function cspMiddleware(config?: CSPConfig) {
  const cspConfig = config || productionCSPConfig
  const cspHeader = generateCSPHeader(cspConfig)

  return (req: any, res: any, next: any) => {
    // Generate nonce for this request
    const nonce = generateNonce()

    // Replace nonce placeholders
    const cspWithNonce = cspHeader.replace(/{nonce}/g, `'nonce-${nonce}'`)

    // Set CSP header
    res.setHeader('Content-Security-Policy', cspWithNonce)

    // Also set report-only for testing
    if (process.env.CSP_REPORT_ONLY === 'true') {
      res.setHeader('Content-Security-Policy-Report-Only', cspWithNonce)
    }

    // Store nonce for use in templates
    res.locals.cspNonce = nonce

    next()
  }
}

/**
 * Generate nonce for inline scripts/styles
 */
function generateNonce(): string {
  return Buffer.from(Math.random().toString()).toString('base64').substring(0, 16)
}

/**
 * React Hook to get CSP nonce
 */
export function useCSPNonce(): string {
  // In SSR, get from request context
  // In client, get from meta tag or global
  if (typeof window !== 'undefined') {
    const meta = document.querySelector('meta[name="csp-nonce"]')
    return meta?.getAttribute('content') || ''
  }
  return ''
}

/**
 * Additional Security Headers
 */
export function securityHeadersMiddleware() {
  return (req: any, res: any, next: any) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY')

    // Prevent MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff')

    // Enable XSS protection (legacy browsers)
    res.setHeader('X-XSS-Protection', '1; mode=block')

    // Referrer policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Permissions policy (formerly Feature Policy)
    res.setHeader(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=(), payment=()'
    )

    // HSTS - Force HTTPS (only in production)
    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    }

    next()
  }
}

/**
 * CSP Violation Reporting Endpoint
 */
export function cspReportEndpoint() {
  return (req: any, res: any) => {
    const report = req.body

    // Log CSP violations
    console.error('[CSP Violation]', JSON.stringify(report, null, 2))

    // Send to monitoring service
    // reportToSentry(report)

    res.status(204).end()
  }
}

/**
 * Add CSP report endpoint to config
 */
export function addCSPReporting(config: CSPConfig): CSPConfig {
  return {
    ...config,
    'report-uri': ['/api/csp-report'],
    'report-to': ['csp-endpoint'],
  }
}

/**
 * Example Express App Setup
 */
export function setupSecureApp(app: any) {
  // Apply security headers
  app.use(securityHeadersMiddleware())

  // Apply CSP
  const cspConfig =
    process.env.NODE_ENV === 'development'
      ? developmentCSPConfig
      : productionCSPConfig

  app.use(cspMiddleware(addCSPReporting(cspConfig)))

  // CSP violation reporting
  app.post('/api/csp-report', cspReportEndpoint())
}

/**
 * React Helmet CSP Integration
 */
export function CSPHelmet({ nonce }: { nonce?: string }) {
  const config =
    process.env.NODE_ENV === 'development'
      ? developmentCSPConfig
      : productionCSPConfig

  const cspHeader = generateCSPHeader(config)

  return (
    <>
      <meta httpEquiv="Content-Security-Policy" content={cspHeader} />
      {nonce && <meta name="csp-nonce" content={nonce} />}
    </>
  )
}

/**
 * CSP Testing Checklist
 *
 * 1. Test with report-only mode first
 * 2. Monitor CSP violation reports
 * 3. Gradually tighten policies
 * 4. Use nonces instead of 'unsafe-inline'
 * 5. Avoid 'unsafe-eval' in production
 * 6. Test all third-party scripts
 * 7. Test all external resources (images, fonts, etc.)
 * 8. Test iframes if used
 * 9. Test WebSockets if used
 * 10. Test service workers if used
 */
