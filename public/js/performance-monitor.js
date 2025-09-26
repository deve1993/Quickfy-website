// Performance monitoring script - Extracted from inline to reduce render blocking
(function() {
  'use strict';

  // Browser-safe environment detection
  function isProduction() {
    // Check if we're on localhost or development domains
    if (typeof window === 'undefined') return false;

    // First check if environment data was injected by the server
    if (window.__QUICKFY_ENV__ && window.__QUICKFY_ENV__.NODE_ENV) {
      return window.__QUICKFY_ENV__.NODE_ENV === 'production';
    }

    // Fallback to URL-based detection
    const hostname = window.location.hostname;
    const isDevelopment = hostname === 'localhost' ||
                         hostname === '127.0.0.1' ||
                         hostname.startsWith('192.168.') ||
                         hostname.endsWith('.local') ||
                         hostname.includes('dev') ||
                         window.location.port !== '';

    return !isDevelopment;
  }

  // Check if performance monitoring is enabled
  function isPerformanceMonitoringEnabled() {
    if (window.__QUICKFY_ENV__ && window.__QUICKFY_ENV__.PERFORMANCE_MONITORING !== undefined) {
      return window.__QUICKFY_ENV__.PERFORMANCE_MONITORING === 'true';
    }
    // Default to enabled in production
    return isProduction();
  }

  // Only run if enabled
  if (!isPerformanceMonitoringEnabled()) {
    return;
  }

  // Performance Observer for Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Send to analytics if needed
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
            // Send to analytics if needed
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', entry.value);
            // Send to analytics if needed
          }
        });
      });

      observer.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']
      });

      // Long task detection
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry.duration, 'ms');
            // Report to monitoring service
          }
        });
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });

      // Cleanup observers on page unload
      window.addEventListener('beforeunload', () => {
        observer.disconnect();
        longTaskObserver.disconnect();
      });

    } catch (error) {
      console.warn('Performance monitoring failed to initialize:', error);
    }
  }

  // Resource timing analysis
  function analyzeResourceTiming() {
    if (!('performance' in window) || !('getEntriesByType' in performance)) {
      return;
    }

    const resources = performance.getEntriesByType('resource');
    resources.forEach((resource) => {
      // Flag slow resources (>1000ms)
      if (resource.duration > 1000) {
        console.warn('Slow resource detected:', resource.name, resource.duration + 'ms');
      }

      // Flag large resources (>500KB)
      if (resource.transferSize && resource.transferSize > 500000) {
        console.warn('Large resource detected:', resource.name,
          Math.round(resource.transferSize / 1024) + 'KB');
      }
    });
  }

  // Analyze resources after initial load
  window.addEventListener('load', () => {
    setTimeout(analyzeResourceTiming, 3000);
  });

  // BFCache optimization
  window.addEventListener('beforeunload', () => {
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PREPARE_BFCACHE'
      });
    }
  });

  // Clean up event listeners for BFCache
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) {
      // Page is being stored in BFCache
      // Clean up any resources that might prevent BFCache
      document.querySelectorAll('video, audio').forEach(el => {
        el.pause();
      });
    }
  });

})();