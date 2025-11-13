import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInView } from '../useInView';

describe('useInView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return ref and isIntersecting state', () => {
    const { result } = renderHook(() => useInView());

    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isIntersecting).toBe('boolean');
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should use default options', () => {
    const { result } = renderHook(() => useInView());

    expect(result.current.isIntersecting).toBe(false);
  });

  it('should accept custom threshold option', () => {
    const { result } = renderHook(() => useInView({ threshold: 0.5 }));

    expect(result.current.ref).toBeDefined();
  });

  it('should accept custom rootMargin option', () => {
    const { result } = renderHook(() => useInView({ rootMargin: '100px' }));

    expect(result.current.ref).toBeDefined();
  });

  it('should accept triggerOnce option', () => {
    const { result } = renderHook(() => useInView({ triggerOnce: false }));

    expect(result.current.ref).toBeDefined();
  });

  it('should handle multiple options together', () => {
    const { result } = renderHook(() =>
      useInView({
        threshold: 0.5,
        rootMargin: '100px',
        triggerOnce: false
      })
    );

    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should not throw when ref is null', () => {
    const { result } = renderHook(() => useInView());

    expect(() => {
      void result.current.ref.current;
    }).not.toThrow();
  });

  it('should cleanup observer on unmount', () => {
    const { unmount } = renderHook(() => useInView());

    expect(() => unmount()).not.toThrow();
  });
});
