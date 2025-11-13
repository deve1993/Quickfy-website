import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance optimization utilities
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Optimized intersection observer for lazy loading
export function createLazyObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  }
  
  return new IntersectionObserver(callback, defaultOptions)
}

// Format utilities with memoization
const formatCache = new Map<string, string>()

export function formatNumber(num: number): string {
  const key = num.toString()
  if (formatCache.has(key)) {
    return formatCache.get(key)!
  }
  
  const formatted = new Intl.NumberFormat().format(num)
  formatCache.set(key, formatted)
  return formatted
}

// Image optimization helpers
export function generateSrcSet(src: string, sizes: number[]): string {
  return sizes
    .map(size => `${src}?w=${size} ${size}w`)
    .join(', ')
}

export function generateSizes(breakpoints: { [key: string]: string }): string {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ')
}