/**
 * Brand Provider
 *
 * App-wide provider that initializes and manages brand DNA theme system.
 * Automatically loads brand from storage and applies theme on mount.
 */

"use client";

import { useEffect, useState } from "react";
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
 * - Applies brand theme (CSS variables + fonts) automatically
 * - Re-applies theme when brand DNA changes
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
  const [isInitialized, setIsInitialized] = useState(false);
  const brandDNA = useBrandStore((state) => state.brandDNA);
  const loadBrand = useBrandStore((state) => state.loadBrand);
  const applyTheme = useBrandStore((state) => state.applyTheme);

  // Initialize brand on mount (client-side only)
  useEffect(() => {
    const initialize = async () => {
      try {
        // Load brand from localStorage
        await loadBrand();

        // Mark as initialized
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize brand:", error);
        setIsInitialized(true); // Still mark as initialized to not block rendering
      }
    };

    initialize();
  }, [loadBrand]);

  // Apply theme whenever brand DNA changes
  useEffect(() => {
    if (isInitialized && brandDNA) {
      try {
        applyTheme();
      } catch (error) {
        console.error("Failed to apply brand theme:", error);
      }
    }
  }, [isInitialized, brandDNA, applyTheme]);

  // Render children immediately (no loading state needed)
  // Theme will be applied progressively as brand loads
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
