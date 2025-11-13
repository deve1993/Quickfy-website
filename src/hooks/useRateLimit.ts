import { useRef, useCallback } from 'react';

interface UseRateLimitOptions {
  maxRequests: number;
  timeWindow: number; // in milliseconds
}

interface UseRateLimitReturn {
  isAllowed: () => boolean;
  remainingRequests: () => number;
  resetTime: () => number | null;
  reset: () => void;
}

/**
 * Hook for rate limiting requests
 * Prevents spam by limiting the number of requests within a time window
 *
 * @param maxRequests - Maximum number of requests allowed
 * @param timeWindow - Time window in milliseconds
 *
 * @example
 * ```tsx
 * const { isAllowed, remainingRequests } = useRateLimit({
 *   maxRequests: 3,
 *   timeWindow: 60000 // 1 minute
 * });
 *
 * const handleSubmit = () => {
 *   if (!isAllowed()) {
 *     alert('Too many requests. Please wait.');
 *     return;
 *   }
 *   // Process request
 * };
 * ```
 */
export function useRateLimit({
  maxRequests,
  timeWindow
}: UseRateLimitOptions): UseRateLimitReturn {
  const requestTimestamps = useRef<number[]>([]);

  const isAllowed = useCallback((): boolean => {
    const now = Date.now();

    // Remove timestamps outside the time window
    requestTimestamps.current = requestTimestamps.current.filter(
      timestamp => now - timestamp < timeWindow
    );

    // Check if we've exceeded the limit
    if (requestTimestamps.current.length >= maxRequests) {
      return false;
    }

    // Add current timestamp
    requestTimestamps.current.push(now);
    return true;
  }, [maxRequests, timeWindow]);

  const remainingRequests = useCallback((): number => {
    const now = Date.now();

    // Clean old timestamps
    requestTimestamps.current = requestTimestamps.current.filter(
      timestamp => now - timestamp < timeWindow
    );

    return Math.max(0, maxRequests - requestTimestamps.current.length);
  }, [maxRequests, timeWindow]);

  const resetTime = useCallback((): number | null => {
    if (requestTimestamps.current.length === 0) {
      return null;
    }

    const oldestTimestamp = requestTimestamps.current[0];
    const resetAt = oldestTimestamp + timeWindow;
    const now = Date.now();

    return resetAt > now ? resetAt - now : null;
  }, [timeWindow]);

  const reset = useCallback((): void => {
    requestTimestamps.current = [];
  }, []);

  return {
    isAllowed,
    remainingRequests,
    resetTime,
    reset
  };
}
