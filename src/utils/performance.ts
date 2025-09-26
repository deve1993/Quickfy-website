// Performance optimization utilities
import React from 'react';

/**
 * Yields control to the browser to prevent long tasks
 */
export function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    // Use scheduler API if available, otherwise fallback to setTimeout
    if ('scheduler' in window && 'postTask' in (window as { scheduler: { postTask: (callback: () => void, options: { priority: string }) => void } }).scheduler) {
      (window as { scheduler: { postTask: (callback: () => void, options: { priority: string }) => void } }).scheduler.postTask(resolve, { priority: 'user-blocking' });
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Breaks up long-running tasks by yielding every N iterations
 */
export async function processInChunks<T>(
  items: T[],
  processor: (item: T, index: number) => void | Promise<void>,
  chunkSize: number = 50
): Promise<void> {
  for (let i = 0; i < items.length; i++) {
    await processor(items[i], i);
    
    // Yield every chunkSize items
    if (i > 0 && i % chunkSize === 0) {
      await yieldToMain();
    }
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages(selector: string = 'img[data-src]'): void {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  document.querySelectorAll(selector).forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Measure and report performance metrics
 */
export function measurePerformance(): void {
  if ('performance' in window) {
    // Report Core Web Vitals
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(() => {});
      onFID(() => {});
      onFCP(() => {});
      onLCP(() => {});
      onTTFB(() => {});
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
  }
}

/**
 * Request idle callback wrapper with fallback
 */
export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
): void {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, options);
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Optimize React component re-renders
 */
export const createMemoizedComponent = <P extends object>(
  Component: React.ComponentType<P>,
  compareProps?: (prevProps: P, nextProps: P) => boolean
) => {
  return React.memo(Component, compareProps);
};