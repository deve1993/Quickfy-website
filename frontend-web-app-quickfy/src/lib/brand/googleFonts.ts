/**
 * Google Fonts Integration
 *
 * Curated list of popular Google Fonts and utilities for loading them.
 * Organized by category for easy selection.
 */

import type { FontFamily } from "@/types/brand";

/**
 * Font category types
 */
export type FontCategory = "sans-serif" | "serif" | "monospace" | "display" | "handwriting";

/**
 * Google Font definition
 */
export interface GoogleFont {
  name: string;
  category: FontCategory;
  weights: number[];
  styles: string[];
  variants: number;
  popularity: number;
  url: string;
  fallback: string[];
}

/**
 * Curated list of popular Google Fonts
 *
 * Selected based on popularity, versatility, and readability
 */
export const GOOGLE_FONTS: GoogleFont[] = [
  // Sans-Serif Fonts
  {
    name: "Inter",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    variants: 18,
    popularity: 100,
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },
  {
    name: "Roboto",
    category: "sans-serif",
    weights: [100, 300, 400, 500, 700, 900],
    styles: ["normal", "italic"],
    variants: 12,
    popularity: 95,
    url: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },
  {
    name: "Open Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    styles: ["normal", "italic"],
    variants: 12,
    popularity: 90,
    url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },
  {
    name: "Poppins",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    variants: 18,
    popularity: 85,
    url: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },
  {
    name: "Montserrat",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    variants: 18,
    popularity: 85,
    url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },
  {
    name: "Lato",
    category: "sans-serif",
    weights: [100, 300, 400, 700, 900],
    styles: ["normal", "italic"],
    variants: 10,
    popularity: 80,
    url: "https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },
  {
    name: "Raleway",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    variants: 18,
    popularity: 75,
    url: "https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },
  {
    name: "Nunito",
    category: "sans-serif",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    variants: 16,
    popularity: 75,
    url: "https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap",
    fallback: ["system-ui", "sans-serif"],
  },

  // Serif Fonts
  {
    name: "Playfair Display",
    category: "serif",
    weights: [400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    variants: 12,
    popularity: 80,
    url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap",
    fallback: ["Georgia", "serif"],
  },
  {
    name: "Merriweather",
    category: "serif",
    weights: [300, 400, 700, 900],
    styles: ["normal", "italic"],
    variants: 8,
    popularity: 75,
    url: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap",
    fallback: ["Georgia", "serif"],
  },
  {
    name: "Lora",
    category: "serif",
    weights: [400, 500, 600, 700],
    styles: ["normal", "italic"],
    variants: 8,
    popularity: 75,
    url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
    fallback: ["Georgia", "serif"],
  },
  {
    name: "PT Serif",
    category: "serif",
    weights: [400, 700],
    styles: ["normal", "italic"],
    variants: 4,
    popularity: 70,
    url: "https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap",
    fallback: ["Georgia", "serif"],
  },

  // Monospace Fonts
  {
    name: "Fira Code",
    category: "monospace",
    weights: [300, 400, 500, 600, 700],
    styles: ["normal"],
    variants: 5,
    popularity: 90,
    url: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap",
    fallback: ["monospace"],
  },
  {
    name: "JetBrains Mono",
    category: "monospace",
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
    styles: ["normal", "italic"],
    variants: 16,
    popularity: 85,
    url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap",
    fallback: ["monospace"],
  },
  {
    name: "Source Code Pro",
    category: "monospace",
    weights: [200, 300, 400, 500, 600, 700, 900],
    styles: ["normal", "italic"],
    variants: 14,
    popularity: 80,
    url: "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500;600;700;900&display=swap",
    fallback: ["monospace"],
  },
  {
    name: "Space Mono",
    category: "monospace",
    weights: [400, 700],
    styles: ["normal", "italic"],
    variants: 4,
    popularity: 70,
    url: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
    fallback: ["monospace"],
  },

  // Display Fonts
  {
    name: "Bebas Neue",
    category: "display",
    weights: [400],
    styles: ["normal"],
    variants: 1,
    popularity: 75,
    url: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
    fallback: ["Impact", "sans-serif"],
  },
  {
    name: "Oswald",
    category: "display",
    weights: [200, 300, 400, 500, 600, 700],
    styles: ["normal"],
    variants: 6,
    popularity: 75,
    url: "https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap",
    fallback: ["Impact", "sans-serif"],
  },
];

/**
 * Get fonts by category
 */
export function getFontsByCategory(category: FontCategory): GoogleFont[] {
  return GOOGLE_FONTS.filter((font) => font.category === category);
}

/**
 * Search fonts by name
 */
export function searchFonts(query: string): GoogleFont[] {
  const lowerQuery = query.toLowerCase();
  return GOOGLE_FONTS.filter((font) =>
    font.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get font by name
 */
export function getFontByName(name: string): GoogleFont | undefined {
  return GOOGLE_FONTS.find((font) => font.name === name);
}

/**
 * Convert GoogleFont to FontFamily
 */
export function googleFontToFontFamily(googleFont: GoogleFont): FontFamily {
  return {
    name: googleFont.name,
    weights: googleFont.weights,
    styles: googleFont.styles,
    url: googleFont.url,
    fallback: googleFont.fallback,
  };
}

/**
 * Get most popular fonts
 */
export function getPopularFonts(limit: number = 10): GoogleFont[] {
  return [...GOOGLE_FONTS]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

/**
 * Get recommended font pairings
 *
 * Returns pre-selected combinations that work well together
 */
export const FONT_PAIRINGS: Array<{
  name: string;
  heading: string;
  body: string;
  description: string;
}> = [
  {
    name: "Modern & Clean",
    heading: "Inter",
    body: "Inter",
    description: "Versatile system font, perfect for modern interfaces",
  },
  {
    name: "Classic & Professional",
    heading: "Playfair Display",
    body: "Lato",
    description: "Elegant serif headings with clean sans-serif body",
  },
  {
    name: "Bold & Friendly",
    heading: "Montserrat",
    body: "Open Sans",
    description: "Strong headings with approachable body text",
  },
  {
    name: "Minimal & Geometric",
    heading: "Poppins",
    body: "Poppins",
    description: "Clean geometric sans-serif for minimalist designs",
  },
  {
    name: "Editorial & Refined",
    heading: "Playfair Display",
    body: "Merriweather",
    description: "Beautiful serif combination for content-heavy sites",
  },
  {
    name: "Tech & Modern",
    heading: "Raleway",
    body: "Roboto",
    description: "Contemporary pairing for tech and startup brands",
  },
];

/**
 * Load Google Font dynamically
 *
 * @param fontName - Name of the font to load
 * @returns Promise that resolves when font is loaded
 */
export function loadGoogleFont(fontName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const font = getFontByName(fontName);
    if (!font) {
      reject(new Error(`Font "${fontName}" not found`));
      return;
    }

    // Check if already loaded
    const existing = document.querySelector(
      `link[href="${font.url}"]`
    );
    if (existing) {
      resolve();
      return;
    }

    // Create link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = font.url;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load font "${fontName}"`));

    document.head.appendChild(link);
  });
}

/**
 * Preload multiple fonts
 *
 * @param fontNames - Array of font names to preload
 * @returns Promise that resolves when all fonts are loaded
 */
export async function preloadFonts(fontNames: string[]): Promise<void> {
  await Promise.all(fontNames.map((name) => loadGoogleFont(name)));
}
