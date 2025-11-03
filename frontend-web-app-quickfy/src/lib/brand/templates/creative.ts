import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "../brandDefaults";

const baseBrand = getDefaultBrand();

export const creativeTemplate: BrandTemplate = {
  id: "creative",
  name: "Creative",
  description: "Unique and artistic design for creative agencies",
  category: "creative",
  brandDNA: {
    ...baseBrand,
    metadata: {
      ...baseBrand.metadata,
      name: "Creative Brand",
      tagline: "Think different, create amazing",
    },
    colors: {
      light: {
        primary: "330 85% 55%",       // Vibrant magenta
        secondary: "45 100% 60%",     // Warm yellow
        accent: "180 70% 50%",        // Cyan
        destructive: "15 90% 50%",    // Bright orange
        muted: "250 20% 92%",         // Light lavender
        background: "0 0% 100%",      // White
        foreground: "270 40% 20%",    // Deep purple
        card: "0 0% 100%",            // White
        border: "250 25% 88%",        // Light lavender
        input: "250 25% 88%",         // Light lavender
        ring: "330 85% 55%",          // Vibrant magenta
      },
      dark: {
        primary: "330 80% 65%",       // Lighter magenta
        secondary: "45 95% 65%",      // Warm yellow
        accent: "180 65% 55%",        // Cyan
        destructive: "15 85% 55%",    // Bright orange
        muted: "250 15% 18%",         // Dark lavender
        background: "270 30% 12%",    // Dark purple
        foreground: "250 15% 93%",    // Light lavender
        card: "270 30% 12%",          // Dark purple
        border: "250 20% 22%",        // Medium dark lavender
        input: "250 20% 22%",         // Medium dark lavender
        ring: "330 80% 65%",          // Lighter magenta
      },
      chart: [
        "330 85% 55%",    // Magenta
        "45 100% 60%",    // Yellow
        "180 70% 50%",    // Cyan
        "15 90% 50%",     // Orange
        "270 70% 55%",    // Purple
      ],
    },
    typography: {
      ...baseBrand.typography,
      fontHeading: {
        name: "Montserrat",
        weights: [700, 800, 900],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
      fontBody: {
        name: "Raleway",
        weights: [400, 500, 600],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
    },
    spacing: {
      ...baseBrand.spacing,
      radius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "1rem",      // More rounded than default
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },
    },
  },
};
