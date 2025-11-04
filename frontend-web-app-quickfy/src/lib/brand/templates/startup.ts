import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "../brandDefaults";

const baseBrand = getDefaultBrand();

export const startupTemplate: BrandTemplate = {
  id: "startup",
  name: "Tech Startup",
  description: "Modern and innovative design for technology companies",
  category: "professional",
  brandDNA: {
    ...baseBrand,
    metadata: {
      ...baseBrand.metadata,
      name: "Tech Startup Brand",
      tagline: "Innovation at scale",
    },
    colors: {
      light: {
        primary: "217 91% 60%",         // Bright blue
        secondary: "140 80% 55%",       // Bright green
        accent: "280 85% 60%",          // Electric purple
        destructive: "0 72% 51%",       // Red
        muted: "210 20% 95%",           // Light gray
        background: "0 0% 100%",        // White
        foreground: "222 47% 11%",      // Dark blue
        card: "0 0% 100%",              // White
        border: "214 32% 91%",          // Light blue
        input: "214 32% 91%",           // Light blue
        ring: "217 91% 60%",            // Bright blue
      },
      dark: {
        primary: "217 91% 60%",         // Bright blue
        secondary: "140 80% 55%",       // Bright green
        accent: "280 85% 65%",          // Electric purple
        destructive: "0 72% 60%",       // Red
        muted: "215 20% 20%",           // Dark gray
        background: "222 47% 11%",      // Very dark blue
        foreground: "210 20% 98%",      // Off-white
        card: "222 47% 11%",            // Very dark blue
        border: "215 28% 17%",          // Dark blue
        input: "215 28% 17%",           // Dark blue
        ring: "217 91% 60%",            // Bright blue
      },
      chart: [
        "217 91% 60%",   // Blue
        "140 80% 55%",   // Green
        "280 85% 60%",   // Purple
        "45 93% 55%",    // Yellow
        "345 82% 55%",   // Pink
      ],
    },
    typography: {
      ...baseBrand.typography,
      fontHeading: {
        name: "Inter",
        weights: [700, 800, 900],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
      fontBody: {
        name: "Inter",
        weights: [400, 500, 600],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
    },
  },
};
