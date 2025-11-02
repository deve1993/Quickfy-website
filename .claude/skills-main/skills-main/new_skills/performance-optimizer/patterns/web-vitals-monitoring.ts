import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

/**
 * Core Web Vitals Monitoring and Analytics
 *
 * Tracks and reports performance metrics:
 * - LCP (Largest Contentful Paint) - Loading performance (target: < 2.5s)
 * - FID (First Input Delay) - Interactivity (target: < 100ms)
 * - CLS (Cumulative Layout Shift) - Visual stability (target: < 0.1)
 * - FCP (First Contentful Paint) - Initial render (target: < 1.8s)
 * - TTFB (Time to First Byte) - Server response (target: < 800ms)
 * - INP (Interaction to Next Paint) - Responsiveness (target: < 200ms)
 */

// Analytics endpoint types
interface AnalyticsEvent {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
  timestamp: number
  url: string
  userAgent: string
}

// Send metrics to analytics service
function sendToAnalytics(metric: Metric) {
  const event: AnalyticsEvent = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  }

  // Send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
      })
    }

    // Custom endpoint
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      keepalive: true, // Important: allows request to complete even if page is closing
    }).catch(console.error)

    // Console log in development
  } else {
    console.log('[Web Vitals]', event)
  }
}

// Initialize Web Vitals monitoring
export function initWebVitals() {
  onCLS(sendToAnalytics)
  onFID(sendToAnalytics)
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
  onINP(sendToAnalytics)
}

// Advanced: Report with additional context
interface VitalsContext {
  route?: string
  deviceType?: 'mobile' | 'tablet' | 'desktop'
  connection?: string
  memory?: number
}

export function initWebVitalsWithContext(getContext?: () => VitalsContext) {
  const enhancedSendToAnalytics = (metric: Metric) => {
    const context = getContext?.() || {}
    const event = {
      ...metric,
      ...context,
      timestamp: Date.now(),
      url: window.location.href,
    }

    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      }).catch(console.error)
    } else {
      console.log('[Web Vitals]', event)
    }
  }

  onCLS(enhancedSendToAnalytics)
  onFID(enhancedSendToAnalytics)
  onFCP(enhancedSendToAnalytics)
  onLCP(enhancedSendToAnalytics)
  onTTFB(enhancedSendToAnalytics)
  onINP(enhancedSendToAnalytics)
}

// Get device type
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Get connection type
function getConnectionType(): string {
  const nav = navigator as any
  return nav.connection?.effectiveType || 'unknown'
}

// React Hook for Web Vitals
export function useWebVitals() {
  const [vitals, setVitals] = React.useState<Record<string, Metric>>({})

  React.useEffect(() => {
    const handleMetric = (metric: Metric) => {
      setVitals((prev) => ({
        ...prev,
        [metric.name]: metric,
      }))
      sendToAnalytics(metric)
    }

    onCLS(handleMetric)
    onFID(handleMetric)
    onFCP(handleMetric)
    onLCP(handleMetric)
    onTTFB(handleMetric)
    onINP(handleMetric)
  }, [])

  return vitals
}

// Performance Budget Monitoring
interface PerformanceBudget {
  LCP: number
  FID: number
  CLS: number
  FCP: number
  TTFB: number
  INP: number
}

const DEFAULT_BUDGET: PerformanceBudget = {
  LCP: 2500,
  FID: 100,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 800,
  INP: 200,
}

export function monitorPerformanceBudget(budget: PerformanceBudget = DEFAULT_BUDGET) {
  const violations: string[] = []

  const checkBudget = (metric: Metric) => {
    const threshold = budget[metric.name as keyof PerformanceBudget]
    if (metric.value > threshold) {
      const violation = `${metric.name} exceeded budget: ${metric.value.toFixed(2)} > ${threshold}`
      violations.push(violation)
      console.warn('[Performance Budget]', violation)

      // Alert in development
      if (process.env.NODE_ENV === 'development') {
        // You could show a toast notification here
      }
    }

    sendToAnalytics(metric)
  }

  onCLS(checkBudget)
  onFID(checkBudget)
  onFCP(checkBudget)
  onLCP(checkBudget)
  onTTFB(checkBudget)
  onINP(checkBudget)

  return {
    getViolations: () => violations,
  }
}

// Real User Monitoring (RUM) Integration
export class RealUserMonitoring {
  private metrics: Map<string, Metric[]> = new Map()

  constructor() {
    this.init()
  }

  private init() {
    const collectMetric = (metric: Metric) => {
      const existing = this.metrics.get(metric.name) || []
      existing.push(metric)
      this.metrics.set(metric.name, existing)
      sendToAnalytics(metric)
    }

    onCLS(collectMetric)
    onFID(collectMetric)
    onFCP(collectMetric)
    onLCP(collectMetric)
    onTTFB(collectMetric)
    onINP(collectMetric)
  }

  getMetrics(name: string): Metric[] {
    return this.metrics.get(name) || []
  }

  getAverageMetric(name: string): number {
    const metrics = this.getMetrics(name)
    if (metrics.length === 0) return 0
    return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length
  }

  getPercentile(name: string, percentile: number): number {
    const metrics = this.getMetrics(name)
    if (metrics.length === 0) return 0

    const sorted = metrics.map((m) => m.value).sort((a, b) => a - b)
    const index = Math.ceil((percentile / 100) * sorted.length) - 1
    return sorted[index]
  }

  getSummary() {
    const summary: Record<string, any> = {}

    for (const [name, metrics] of this.metrics.entries()) {
      if (metrics.length === 0) continue

      summary[name] = {
        count: metrics.length,
        average: this.getAverageMetric(name),
        p50: this.getPercentile(name, 50),
        p75: this.getPercentile(name, 75),
        p95: this.getPercentile(name, 95),
        p99: this.getPercentile(name, 99),
      }
    }

    return summary
  }
}

// Export singleton instance
export const rum = new RealUserMonitoring()

// Development Performance Panel Component
export function PerformancePanel() {
  const vitals = useWebVitals()

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div style={panelStyles}>
      <h3>Core Web Vitals</h3>
      {Object.entries(vitals).map(([name, metric]) => (
        <div key={name} style={metricStyles}>
          <strong>{name}:</strong> {metric.value.toFixed(2)}
          <span style={getRatingStyles(metric.rating)}>{metric.rating}</span>
        </div>
      ))}
    </div>
  )
}

const panelStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  background: 'white',
  border: '1px solid #ccc',
  borderRadius: 8,
  padding: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  zIndex: 9999,
  fontSize: 12,
  fontFamily: 'monospace',
  maxWidth: 300,
}

const metricStyles: React.CSSProperties = {
  marginBottom: 8,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

function getRatingStyles(rating: string): React.CSSProperties {
  const colors = {
    good: '#0cce6b',
    'needs-improvement': '#ffa400',
    poor: '#ff4e42',
  }

  return {
    padding: '2px 6px',
    borderRadius: 4,
    backgroundColor: colors[rating as keyof typeof colors] || '#ccc',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 8,
  }
}

// Add React import at the top
import React from 'react'
