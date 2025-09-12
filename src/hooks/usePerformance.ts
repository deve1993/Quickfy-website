'use client';

import { useEffect, useCallback, useState } from 'react';
import { throttle, debounce } from '@/lib/utils';

// Hook for optimizing scroll performance
export function useOptimizedScroll(callback: () => void, delay: number = 16) {
  useEffect(() => {
    const throttledCallback = throttle(callback, delay);
    window.addEventListener('scroll', throttledCallback, { passive: true });
    return () => window.removeEventListener('scroll', throttledCallback);
  }, [callback, delay]);
}

// Hook for optimizing resize performance
export function useOptimizedResize(callback: () => void, delay: number = 250) {
  useEffect(() => {
    const debouncedCallback = debounce(callback, delay);
    window.addEventListener('resize', debouncedCallback, { passive: true });
    return () => window.removeEventListener('resize', debouncedCallback);
  }, [callback, delay]);
}

// Hook for intersection observer with performance optimization
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {},
  callback?: (isIntersecting: boolean) => void
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);
        callback?.(intersecting);
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, callback, options]);

  return isIntersecting;
}

// Hook for preloading routes
export function useRoutePreloader() {
  const preloadRoute = useCallback((href: string) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    }
  }, []);

  return { preloadRoute };
}

// Hook for optimizing component rendering
export function useRenderOptimization() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay rendering for non-critical components
    const timer = 'requestIdleCallback' in window ? 
      requestIdleCallback(() => setShouldRender(true)) :
      setTimeout(() => setShouldRender(true), 0);

    return () => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
      } else if ('cancelIdleCallback' in window) {
        cancelIdleCallback(timer as unknown as number);
      }
    };
  }, []);

  return shouldRender;
}

// Hook for monitoring performance metrics
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<{
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    ttfb?: number;
  }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamic import to avoid bundle bloat
    import('web-vitals').then(({ onLCP, onFID, onCLS, onFCP, onTTFB }) => {
      onLCP((metric) => {
        setMetrics(prev => ({ ...prev, lcp: metric.value }));
      });
      
      onFID((metric) => {
        setMetrics(prev => ({ ...prev, fid: metric.value }));
      });
      
      onCLS((metric) => {
        setMetrics(prev => ({ ...prev, cls: metric.value }));
      });
      
      onFCP((metric) => {
        setMetrics(prev => ({ ...prev, fcp: metric.value }));
      });
      
      onTTFB((metric) => {
        setMetrics(prev => ({ ...prev, ttfb: metric.value }));
      });
    }).catch(() => {
      // Silent fail if web-vitals not available
    });
  }, []);

  return metrics;
}

// Hook for image preloading
export function useImagePreloader() {
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(async (sources: string[]) => {
    try {
      await Promise.all(sources.map(preloadImage));
    } catch (error) {
      console.warn('Failed to preload some images:', error);
    }
  }, [preloadImage]);

  return { preloadImage, preloadImages };
}