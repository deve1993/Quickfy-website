import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "../brandDefaults";

const baseBrand = getDefaultBrand();

export const organicTemplate: BrandTemplate = {
  id: "organic",
  name: "Organic & Nature",
  description: "Natural and earthy design for eco-friendly brands",
  category: "minimal",
  brandDNA: {
    ...baseBrand,
    metadata: {
      ...baseBrand.metadata,
      name: "Organic Brand",
      tagline: "Natural and sustainable",
    },
    colors: {
      light: {
        primary: "142 71% 45%",         // Forest green
        secondary: "35 77% 49%",        // Earthy orange
        accent: "158 64% 52%",          // Sage green
        destructive: "15 75% 48%",      // Terra cotta
        muted: "60 9% 90%",             // Warm gray
        background: "40 20% 97%",       // Cream
        foreground: "24 10% 15%",       // Dark brown
        card: "0 0% 100%",              // White
        border: "60 10% 85%",           // Light brown
        input: "60 10% 85%",            // Light brown
        ring: "142 71% 45%",            // Forest green
      },
      dark: {
        primary: "142 60% 55%",         // Light green
        secondary: "35 70% 60%",        // Light orange
        accent: "158 50% 60%",          // Light sage
        destructive: "15 65% 60%",      // Light terra cotta
        muted: "40 10% 25%",            // Dark warm gray
        background: "24 15% 8%",        // Very dark brown
        foreground: "40 20% 95%",       // Warm white
        card: "24 15% 8%",              // Very dark brown
        border: "40 12% 18%",           // Dark brown
        input: "40 12% 18%",            // Dark brown
        ring: "142 60% 55%",            // Light green
      },
      chart: [
        "142 71% 45%",   // Green
        "35 77% 49%",    // Orange
        "158 64% 52%",   // Sage
        "45 62% 47%",    // Olive
        "15 75% 48%",    // Terra cotta
      ],
    },
    typography: {
      ...baseBrand.typography,
      fontHeading: {
        name: "Merriweather",
        weights: [700, 900],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&display=swap",
        fallback: ["Georgia", "serif"],
      },
      fontBody: {
        name: "Open Sans",
        weights: [400, 600, 700],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
    },
  },
};
