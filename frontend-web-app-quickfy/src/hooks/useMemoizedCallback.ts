import { useCallback, useMemo } from "react";

/**
 * Custom hooks for performance optimization with memoization
 */

/**
 * Memoized filter function for arrays
 * Prevents unnecessary re-filtering on every render
 */
export function useMemoizedFilter<T>(
  items: T[],
  filterFn: (item: T) => boolean,
  deps: React.DependencyList = []
): T[] {
  return useMemo(() => {
    return items.filter(filterFn);
  }, [items, ...deps]);
}

/**
 * Memoized sort function for arrays
 * Prevents unnecessary re-sorting on every render
 */
export function useMemoizedSort<T>(
  items: T[],
  compareFn: (a: T, b: T) => number,
  deps: React.DependencyList = []
): T[] {
  return useMemo(() => {
    return [...items].sort(compareFn);
  }, [items, ...deps]);
}

/**
 * Memoized computed value
 * Useful for expensive calculations
 */
export function useMemoizedValue<T>(
  computeFn: () => T,
  deps: React.DependencyList
): T {
  return useMemo(computeFn, deps);
}

/**
 * Memoized search/filter handler
 * Common pattern for search inputs
 */
export function useSearchHandler<T>(
  items: T[],
  searchKey: keyof T
) {
  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return items;
      const lowerQuery = query.toLowerCase();
      return items.filter((item) => {
        const value = item[searchKey];
        return String(value).toLowerCase().includes(lowerQuery);
      });
    },
    [items, searchKey]
  );

  return handleSearch;
}

/**
 * Debounced callback for expensive operations
 * Useful for search inputs, API calls, etc.
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useMemo(() => ({ current: null as NodeJS.Timeout | null }), []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, timeoutRef]
  );
}
