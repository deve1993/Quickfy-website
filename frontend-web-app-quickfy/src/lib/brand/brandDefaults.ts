/**
 * Default Brand DNA Configuration
 *
 * Default Quickfy brand identity matching the current theme system.
 * These values align with the existing CSS variables in globals.css.
 */

import type { BrandDNA, FontFamily } from "@/types/brand";

/**
 * Default font families
 */
const DEFAULT_FONTS = {
  heading: {
    name: "Inter",
    weights: [400, 500, 600, 700, 800, 900],
    styles: ["normal"],
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  } as FontFamily,
  body: {
    name: "Inter",
    weights: [400, 500, 600],
    styles: ["normal"],
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
    fallback: ["system-ui", "sans-serif"],
  } as FontFamily,
  mono: {
    name: "Fira Code",
    weights: [400, 500, 600],
    styles: ["normal"],
    url: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap",
    fallback: ["monospace"],
  } as FontFamily,
};

/**
 * Get default Quickfy brand DNA configuration
 *
 * @returns Complete default brand DNA object
 */
export function getDefaultBrand(): BrandDNA {
  const now = new Date().toISOString();

  return {
    metadata: {
      name: "Quickfy",
      tagline: "Marketing automation platform",
      description: "Default Quickfy brand identity with modern, professional styling",
      industry: "SaaS / Marketing Technology",
      createdAt: now,
      updatedAt: now,
      version: "1.0.0",
    },
    colors: {
      light: {
        // Primary brand color (blue)
        primary: "221.2 83.2% 53.3%",
        // Secondary color (light blue/gray)
        secondary: "210 40% 96.1%",
        // Accent color (slightly lighter blue)
        accent: "210 40% 96.1%",
        // Destructive/error (red)
        destructive: "0 84.2% 60.2%",
        // Muted (gray)
        muted: "210 40% 96.1%",
        // Background (white)
        background: "0 0% 100%",
        // Foreground/text (dark blue/black)
        foreground: "222.2 84% 4.9%",
        // Card background
        card: "0 0% 100%",
        // Border (light gray)
        border: "214.3 31.8% 91.4%",
        // Input border
        input: "214.3 31.8% 91.4%",
        // Ring/focus (primary)
        ring: "221.2 83.2% 53.3%",
      },
      dark: {
        // Primary brand color (lighter blue for dark mode)
        primary: "217.2 91.2% 59.8%",
        // Secondary color (dark gray)
        secondary: "217.2 32.6% 17.5%",
        // Accent color
        accent: "217.2 32.6% 17.5%",
        // Destructive/error (red)
        destructive: "0 62.8% 30.6%",
        // Muted (darker gray)
        muted: "217.2 32.6% 17.5%",
        // Background (very dark blue)
        background: "222.2 84% 4.9%",
        // Foreground/text (light)
        foreground: "210 40% 98%",
        // Card background (dark blue)
        card: "222.2 84% 4.9%",
        // Border (dark gray)
        border: "217.2 32.6% 17.5%",
        // Input border
        input: "217.2 32.6% 17.5%",
        // Ring/focus (lighter primary)
        ring: "217.2 91.2% 59.8%",
      },
      chart: [
        "12 76% 61%",    // Orange
        "173 58% 39%",   // Teal
        "197 37% 24%",   // Dark blue
        "43 74% 66%",    // Yellow
        "27 87% 67%",    // Red-orange
      ],
    },
    typography: {
      fontHeading: DEFAULT_FONTS.heading,
      fontBody: DEFAULT_FONTS.body,
      fontMono: DEFAULT_FONTS.mono,
      scale: {
        xs: "0.75rem",      // 12px
        sm: "0.875rem",     // 14px
        base: "1rem",       // 16px
        lg: "1.125rem",     // 18px
        xl: "1.25rem",      // 20px
        "2xl": "1.5rem",    // 24px
        "3xl": "1.875rem",  // 30px
        "4xl": "2.25rem",   // 36px
        "5xl": "3rem",      // 48px
        "6xl": "3.75rem",   // 60px
        "7xl": "4.5rem",    // 72px
        "8xl": "6rem",      // 96px
        "9xl": "8rem",      // 128px
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
      letterSpacing: {
        tight: "-0.05em",
        normal: "0",
        wide: "0.05em",
      },
    },
    spacing: {
      radius: {
        sm: "0.125rem",   // 2px
        md: "0.375rem",   // 6px
        lg: "0.5rem",     // 8px (default)
        xl: "0.75rem",    // 12px
        "2xl": "1rem",    // 16px
        full: "9999px",   // Fully rounded
      },
      spacing: {
        xs: "0.5rem",     // 8px
        sm: "0.75rem",    // 12px
        md: "1rem",       // 16px
        lg: "1.5rem",     // 24px
        xl: "2rem",       // 32px
        "2xl": "3rem",    // 48px
        "3xl": "4rem",    // 64px
        "4xl": "6rem",    // 96px
      },
    },
    strategy: {
      purpose: undefined,
      vision: undefined,
      mission: undefined,
      values: [],
      toneOfVoice: {
        traits: [],
        description: undefined,
        dos: undefined,
        donts: undefined,
      },
      positioning: undefined,
      targetAudience: undefined,
      differentiators: undefined,
    },
    assets: {
      primaryLogo: undefined,
      secondaryLogo: undefined,
      favicon: undefined,
      additionalAssets: [],
    },
  };
}

/**
 * Merge partial brand DNA with defaults
 *
 * @param partial - Partial brand DNA configuration
 * @returns Complete brand DNA with defaults filled in
 */
export function mergeBrandDefaults(
  partial: Partial<BrandDNA>
): BrandDNA {
  const defaults = getDefaultBrand();

  return {
    metadata: {
      ...defaults.metadata,
      ...partial.metadata,
      updatedAt: new Date().toISOString(),
    },
    colors: {
      light: {
        ...defaults.colors.light,
        ...partial.colors?.light,
      },
      dark: {
        ...defaults.colors.dark,
        ...partial.colors?.dark,
      },
      chart: partial.colors?.chart || defaults.colors.chart,
    },
    typography: {
      fontHeading: partial.typography?.fontHeading || defaults.typography.fontHeading,
      fontBody: partial.typography?.fontBody || defaults.typography.fontBody,
      fontMono: partial.typography?.fontMono || defaults.typography.fontMono,
      scale: {
        ...defaults.typography.scale,
        ...partial.typography?.scale,
      },
      lineHeight: {
        ...defaults.typography.lineHeight,
        ...partial.typography?.lineHeight,
      },
      letterSpacing: {
        ...defaults.typography.letterSpacing,
        ...partial.typography?.letterSpacing,
      },
    },
    spacing: {
      radius: {
        ...defaults.spacing.radius,
        ...partial.spacing?.radius,
      },
      spacing: {
        ...defaults.spacing.spacing,
        ...partial.spacing?.spacing,
      },
    },
    strategy: partial.strategy ? {
      ...defaults.strategy,
      ...partial.strategy,
      values: partial.strategy.values || defaults.strategy!.values,
      toneOfVoice: {
        ...defaults.strategy!.toneOfVoice,
        ...partial.strategy.toneOfVoice,
      },
    } : defaults.strategy,
    assets: {
      ...defaults.assets,
      ...partial.assets,
    },
  };
}

/**
 * Check if brand DNA is using defaults (unchanged)
 *
 * @param brandDNA - Brand DNA to check
 * @returns True if using defaults
 */
export function isDefaultBrand(brandDNA: BrandDNA): boolean {
  const defaults = getDefaultBrand();

  // Simple check: compare primary colors
  return (
    brandDNA.colors.light.primary === defaults.colors.light.primary &&
    brandDNA.typography.fontBody.name === defaults.typography.fontBody.name
  );
}
