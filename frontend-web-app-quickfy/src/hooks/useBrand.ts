/**
 * Brand DNA Custom Hooks
 *
 * Convenient React hooks for working with brand DNA throughout the application.
 * Provides easy access to brand colors, typography, spacing, and assets.
 */

"use client";

import { useMemo } from "react";
import { useBrandStore } from "@/store/useBrandStore";
import type { ColorValue, FontFamily } from "@/types/brand";
import { checkContrast } from "@/lib/brand/brandValidator";
import { getCSSVariable } from "@/lib/brand/brandVariables";

/**
 * Get current brand DNA
 *
 * @returns Complete brand DNA object or null
 */
export function useBrandDNA() {
  return useBrandStore((state) => state.brandDNA);
}

/**
 * Get brand colors for current theme
 *
 * @param theme - "light" or "dark" (defaults to current system theme)
 * @returns Color palette object
 */
export function useBrandColors(theme?: "light" | "dark") {
  const brandDNA = useBrandStore((state) => state.brandDNA);

  return useMemo(() => {
    if (!brandDNA) return null;

    // If theme not specified, try to detect current theme
    const currentTheme =
      theme ||
      (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light");

    return brandDNA.colors[currentTheme];
  }, [brandDNA, theme]);
}

/**
 * Get specific brand color
 *
 * @param colorName - Color name (e.g., "primary", "background")
 * @param theme - Theme ("light" or "dark")
 * @returns HSL color value
 */
export function useBrandColor(
  colorName: keyof ReturnType<typeof useBrandColors>,
  theme?: "light" | "dark"
): ColorValue | null {
  const colors = useBrandColors(theme);
  return colors ? colors[colorName] : null;
}

/**
 * Get brand typography settings
 *
 * @returns Typography configuration
 */
export function useBrandTypography() {
  const brandDNA = useBrandStore((state) => state.brandDNA);
  return brandDNA?.typography || null;
}

/**
 * Get specific font family
 *
 * @param type - Font type ("heading", "body", "mono")
 * @returns Font family configuration
 */
export function useBrandFont(
  type: "heading" | "body" | "mono"
): FontFamily | null {
  const typography = useBrandTypography();
  if (!typography) return null;

  switch (type) {
    case "heading":
      return typography.fontHeading;
    case "body":
      return typography.fontBody;
    case "mono":
      return typography.fontMono;
    default:
      return null;
  }
}

/**
 * Get brand spacing configuration
 *
 * @returns Spacing configuration
 */
export function useBrandSpacing() {
  const brandDNA = useBrandStore((state) => state.brandDNA);
  return brandDNA?.spacing || null;
}

/**
 * Get brand assets
 *
 * @returns Brand assets (logos, images)
 */
export function useBrandAssets() {
  const brandDNA = useBrandStore((state) => state.brandDNA);
  return brandDNA?.assets || null;
}

/**
 * Get primary logo for current theme
 *
 * @param theme - Theme ("light" or "dark")
 * @returns Logo URL or undefined
 */
export function usePrimaryLogo(theme?: "light" | "dark"): string | undefined {
  const assets = useBrandAssets();

  return useMemo(() => {
    if (!assets?.primaryLogo) return undefined;

    const currentTheme =
      theme ||
      (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light");

    return currentTheme === "dark"
      ? assets.primaryLogo.darkUrl
      : assets.primaryLogo.lightUrl;
  }, [assets, theme]);
}

/**
 * Check if brand has unsaved changes
 *
 * @returns True if there are unsaved changes
 */
export function useHasUnsavedChanges() {
  return useBrandStore((state) => state.hasUnsavedChanges);
}

/**
 * Get brand loading state
 *
 * @returns True if brand is loading
 */
export function useBrandLoading() {
  return useBrandStore((state) => state.isLoading);
}

/**
 * Get brand error
 *
 * @returns Error message or null
 */
export function useBrandError() {
  return useBrandStore((state) => state.error);
}

/**
 * Get brand actions
 *
 * @returns Object with brand manipulation functions
 */
export function useBrandActions() {
  return useBrandStore((state) => ({
    setBrand: state.setBrand,
    updateColors: state.updateColors,
    updateTypography: state.updateTypography,
    updateSpacing: state.updateSpacing,
    updateAssets: state.updateAssets,
    updateMetadata: state.updateMetadata,
    updateStrategy: state.updateStrategy,
    addValue: state.addValue,
    removeValue: state.removeValue,
    updateValue: state.updateValue,
    updateToneOfVoice: state.updateToneOfVoice,
    reset: state.reset,
    loadBrand: state.loadBrand,
    saveBrand: state.saveBrand,
    importBrand: state.importBrand,
    exportBrand: state.exportBrand,
    applyTheme: state.applyTheme,
    markAsSaved: state.markAsSaved,
  }));
}

/**
 * Calculate contrast between two brand colors
 *
 * @param color1 - First color name
 * @param color2 - Second color name
 * @param theme - Theme ("light" or "dark")
 * @returns Contrast ratio and WCAG compliance
 */
export function useBrandContrast(
  color1: string,
  color2: string,
  theme?: "light" | "dark"
) {
  const colors = useBrandColors(theme);

  return useMemo(() => {
    if (!colors) return null;

    const c1 = colors[color1 as keyof typeof colors];
    const c2 = colors[color2 as keyof typeof colors];

    if (!c1 || !c2) return null;

    return checkContrast(c1, c2);
  }, [colors, color1, color2]);
}

/**
 * Get computed CSS variable value
 *
 * Useful for accessing the actual rendered color values
 *
 * @param variableName - CSS variable name (with or without --)
 * @returns CSS variable value
 */
export function useComputedCSSVariable(variableName: string): string | null {
  const brandDNA = useBrandStore((state) => state.brandDNA);

  return useMemo(() => {
    if (typeof document === "undefined" || !brandDNA) return null;

    try {
      return getCSSVariable(variableName);
    } catch {
      return null;
    }
  }, [brandDNA, variableName]);
}

/**
 * Get brand metadata
 *
 * @returns Brand metadata (name, tagline, etc.)
 */
export function useBrandMetadata() {
  const brandDNA = useBrandStore((state) => state.brandDNA);
  return brandDNA?.metadata || null;
}

/**
 * Get brand strategy (DNA strategico)
 *
 * @returns Brand strategy (purpose, vision, mission, values, tone)
 */
export function useBrandStrategy() {
  const brandDNA = useBrandStore((state) => state.brandDNA);
  return brandDNA?.strategy || null;
}

/**
 * Get brand values
 *
 * @returns Array of brand values
 */
export function useBrandValues() {
  const strategy = useBrandStrategy();
  return strategy?.values || [];
}

/**
 * Get brand tone of voice
 *
 * @returns Tone of voice configuration
 */
export function useBrandToneOfVoice() {
  const strategy = useBrandStrategy();
  return strategy?.toneOfVoice || null;
}

/**
 * Check if brand is using default configuration
 *
 * @returns True if using default brand
 */
export function useIsDefaultBrand(): boolean {
  const brandDNA = useBrandStore((state) => state.brandDNA);

  return useMemo(() => {
    if (!brandDNA) return true;

    // Simple check: compare with default primary color
    const defaultPrimary = "221.2 83.2% 53.3%";
    return brandDNA.colors.light.primary === defaultPrimary;
  }, [brandDNA]);
}

/**
 * Get font family CSS string for use in styles
 *
 * @param type - Font type ("heading", "body", "mono")
 * @returns CSS font-family string
 *
 * @example
 * const headingFont = useFontFamily("heading");
 * // "Inter, system-ui, sans-serif"
 */
export function useFontFamily(type: "heading" | "body" | "mono"): string {
  const font = useBrandFont(type);

  return useMemo(() => {
    if (!font) {
      // Fallback defaults
      if (type === "mono") return "monospace";
      return "system-ui, sans-serif";
    }

    return `${font.name}, ${font.fallback.join(", ")}`;
  }, [font, type]);
}

/**
 * Get chart colors array
 *
 * @returns Array of 5 chart colors
 */
export function useChartColors(): ColorValue[] {
  const brandDNA = useBrandStore((state) => state.brandDNA);

  return useMemo(() => {
    if (!brandDNA) {
      // Default chart colors
      return [
        "12 76% 61%",
        "173 58% 39%",
        "197 37% 24%",
        "43 74% 66%",
        "27 87% 67%",
      ];
    }

    return brandDNA.colors.chart;
  }, [brandDNA]);
}

/**
 * Hook for brand-aware responsive values
 *
 * Returns spacing values adjusted by brand spacing configuration
 *
 * @param baseValue - Base spacing value key
 * @returns Computed spacing value
 */
export function useBrandSpacingValue(
  baseValue: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
): string {
  const spacing = useBrandSpacing();

  return useMemo(() => {
    if (!spacing) {
      // Fallback defaults
      const defaults = {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
      };
      return defaults[baseValue];
    }

    return spacing.spacing[baseValue];
  }, [spacing, baseValue]);
}

/**
 * Hook for brand-aware border radius
 *
 * @param size - Radius size key
 * @returns Border radius value
 */
export function useBrandRadius(
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "full" = "lg"
): string {
  const spacing = useBrandSpacing();

  return useMemo(() => {
    if (!spacing) {
      // Fallback default
      return "0.5rem";
    }

    return spacing.radius[size];
  }, [spacing, size]);
}
