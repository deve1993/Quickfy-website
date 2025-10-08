import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Throttle function specifically for IntersectionObserver callback
function throttle(
  func: (entries: IntersectionObserverEntry[]) => void,
  wait: number
): (entries: IntersectionObserverEntry[]) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return function (entries: IntersectionObserverEntry[]) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(entries);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(entries);
      }, remaining);
    }
  };
}

export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.05, // Reduced from 0.1 for earlier triggering
  rootMargin = '50px', // Increased margin for preloading
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true);
      return;
    }

    // Throttled callback
    const throttledHandler = throttle((entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && !hasTriggeredRef.current) {
        setIsIntersecting(true);
        hasTriggeredRef.current = true;

        if (triggerOnce && ref.current && observerRef.current) {
          observerRef.current.unobserve(ref.current);
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      } else if (!triggerOnce && !entry.isIntersecting && hasTriggeredRef.current) {
        setIsIntersecting(false);
        hasTriggeredRef.current = false;
      }
    }, 100);

    // Create observer with optimized options
    const currentObserver = new IntersectionObserver(
      throttledHandler,
      {
        threshold,
        rootMargin,
        root: null,
      }
    );

    observerRef.current = currentObserver;
    currentObserver.observe(element);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        try {
          observerRef.current.disconnect();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error disconnecting intersection observer:', error);
          }
        } finally {
          observerRef.current = null;
        }
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isIntersecting };
}