import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsIntersecting(true);
      if (triggerOnce && ref.current) {
        observer.current?.unobserve(ref.current);
      }
    } else if (!triggerOnce) {
      setIsIntersecting(false);
    }
  }, [triggerOnce]);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create new observer instance
    const currentObserver = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
    });

    // Store reference for cleanup
    observer.current = currentObserver;

    // Start observing
    currentObserver.observe(element);

    // Robust cleanup function
    return () => {
      if (observer.current) {
        try {
          observer.current.disconnect();
        } catch (error) {
          console.warn('Error disconnecting intersection observer:', error);
        } finally {
          observer.current = undefined;
        }
      }
    };
  }, [callback, threshold, rootMargin]);

  return { ref, isIntersecting };
}