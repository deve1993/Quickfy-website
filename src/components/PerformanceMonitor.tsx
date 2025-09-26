'use client';

import { useEffect } from 'react';
import { isProduction, getClientEnv } from '@/lib/env';

// Performance monitoring component for Core Web Vitals
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (!isProduction() || !getClientEnv('PERFORMANCE_MONITORING')) return;

    // Dynamic import to avoid increasing bundle size
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      // Report Core Web Vitals to analytics
      const reportMetric = (metric: { name: string; value: number; id: string }) => {
        // You can send metrics to your analytics service here
        // Log metric to analytics service
        
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

    // Optimized observer management with proper cleanup
    if ('PerformanceObserver' in window) {
      const observers: PerformanceObserver[] = [];

      try {
        // Long task detection
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
              // Report long task to monitoring service
            }
          });
        });
        observers.push(longTaskObserver);
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Layout shift detection
        const layoutShiftObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: PerformanceEntry & { value?: number }) => {
            if (entry.value && entry.value > 0.1) {
              console.warn('Layout shift detected:', entry.value);
              // Report layout shift to monitoring service
            }
          });
        });
        observers.push(layoutShiftObserver);
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

        // Comprehensive cleanup function
        return () => {
          observers.forEach(observer => {
            try {
              observer.disconnect();
            } catch (error) {
              console.warn('Error disconnecting observer:', error);
            }
          });
          observers.length = 0; // Clear the array
        };
      } catch (error) {
        console.warn('Performance observers failed to initialize:', error);
        return () => {
          // Cleanup any partially created observers
          observers.forEach(observer => {
            try {
              observer.disconnect();
            } catch {}
          });
        };
      }
    }
  }, []);

  return null;
}

// Resource timing monitor
export function ResourceMonitor() {
  useEffect(() => {
    if (!isProduction() || !getClientEnv('PERFORMANCE_MONITORING')) return;

    const checkResourceTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        resources.forEach((resource) => {
          // Flag slow resources (>1000ms)
          if (resource.duration > 1000) {
            // Report slow resource to monitoring service
          }
          
          // Flag large resources (>500KB)
          if (resource.transferSize > 500000) {
            // Report large resource to monitoring service
          }
        });
      }
    };

    // Check resources after initial load
    setTimeout(checkResourceTiming, 3000);
  }, []);

  return null;
}