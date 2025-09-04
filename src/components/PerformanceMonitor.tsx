'use client';

import { useEffect } from 'react';

// Performance monitoring component for Core Web Vitals
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamic import to avoid increasing bundle size
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      // Report Core Web Vitals to analytics
      const reportMetric = (metric: { name: string; value: number; id: string }) => {
        // You can send metrics to your analytics service here
        console.log(metric.name, metric.value);
        
        // Example: Send to Google Analytics
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as { gtag: (event: string, name: string, params: object) => void }).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
          });
        }
      };

      onCLS(reportMetric);
      onFID(reportMetric);
      onFCP(reportMetric);
      onLCP(reportMetric);
      onTTFB(reportMetric);
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });

    // Long task detection
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`, entry);
          }
        });
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });

      // Layout shift detection
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: PerformanceEntry & { value?: number }) => {
          if (entry.value && entry.value > 0.1) {
            console.warn(`Layout shift detected: ${entry.value}`, entry);
          }
        });
      });

      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        longTaskObserver.disconnect();
        layoutShiftObserver.disconnect();
      };
    }
  }, []);

  return null;
}

// Resource timing monitor
export function ResourceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    const checkResourceTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        resources.forEach((resource) => {
          // Flag slow resources (>1000ms)
          if (resource.duration > 1000) {
            console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
          }
          
          // Flag large resources (>500KB)
          if (resource.transferSize > 500000) {
            console.warn(`Large resource: ${resource.name} is ${Math.round(resource.transferSize / 1024)}KB`);
          }
        });
      }
    };

    // Check resources after initial load
    setTimeout(checkResourceTiming, 3000);
  }, []);

  return null;
}