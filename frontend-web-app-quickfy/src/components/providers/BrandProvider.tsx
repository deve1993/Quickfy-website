/**
 * Brand Provider
 *
 * App-wide provider that initializes and manages brand DNA storage.
 * Loads brand from localStorage but does NOT apply it globally to the app.
 *
 * Note: Brand DNA colors/fonts are applied ONLY in preview components,
 * not to the entire application UI.
 */

"use client";

import { useEffect } from "react";
import { useBrandStore } from "@/store/useBrandStore";

interface BrandProviderProps {
  children: React.ReactNode;
}

/**
 * Brand Provider Component
 *
 * Wraps the application to provide brand DNA functionality.
 * Should be placed high in the component tree, typically in the root layout.
 *
 * Features:
 * - Auto-loads brand from localStorage on mount
 * - Stores brand DNA in Zustand store
 * - Does NOT apply brand theme globally (only in preview components)
 * - Handles client-side only initialization (SSR safe)
 *
 * @example
 * ```tsx
 * // In app/providers.tsx
 * export function Providers({ children }) {
 *   return (
 *     <BrandProvider>
 *       {children}
 *     </BrandProvider>
 *   );
 * }
 * ```
 */
export function BrandProvider({ children }: BrandProviderProps) {
  const loadBrand = useBrandStore((state) => state.loadBrand);

  // Initialize brand on mount (client-side only)
  useEffect(() => {
    const initialize = async () => {
      try {
        // Load brand from localStorage
        await loadBrand();
      } catch (error) {
        console.error("Failed to initialize brand:", error);
      }
    };

    initialize();
  }, [loadBrand]);

  // Render children immediately (no loading state needed)
  // Brand will be loaded progressively from storage
  return <>{children}</>;
}

/**
 * Hook to check if brand provider is initialized
 *
 * Useful for components that need to wait for brand to be loaded
 * before rendering certain UI elements.
 *
 * @returns True if brand provider has finished initialization
 *
 * @example
 * ```tsx
 * function BrandSettings() {
 *   const isReady = useBrandReady();
 *
 *   if (!isReady) {
 *     return <Skeleton />;
 *   }
 *
 *   return <BrandEditor />;
 * }
 * ```
 */
export function useBrandReady(): boolean {
  const brandDNA = useBrandStore((state) => state.brandDNA);
  return brandDNA !== null;
}

/**
 * HOC to wrap a component with BrandProvider
 *
 * Useful for testing or wrapping specific parts of the app
 *
 * @param Component - Component to wrap
 * @returns Wrapped component
 *
 * @example
 * ```tsx
 * const BrandedButton = withBrandProvider(Button);
 * ```
 */
export function withBrandProvider<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function BrandedComponent(props: P) {
    return (
      <BrandProvider>
        <Component {...props} />
      </BrandProvider>
    );
  };
}
