import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "../brandDefaults";

const baseBrand = getDefaultBrand();

export const vibrantTemplate: BrandTemplate = {
  id: "vibrant",
  name: "Vibrant",
  description: "Bold and energetic design with bright colors",
  category: "vibrant",
  brandDNA: {
    ...baseBrand,
    metadata: {
      ...baseBrand.metadata,
      name: "Vibrant Brand",
      tagline: "Bold and beautiful",
    },
    colors: {
      light: {
        primary: "280 100% 60%",      // Bright purple
        secondary: "340 100% 65%",    // Hot pink
        accent: "160 100% 50%",       // Turquoise
        destructive: "15 100% 55%",   // Orange-red
        muted: "280 20% 95%",         // Light purple tint
        background: "0 0% 100%",      // White
        foreground: "280 50% 15%",    // Dark purple
        card: "0 0% 100%",            // White
        border: "280 30% 85%",        // Light purple
        input: "280 30% 85%",         // Light purple
        ring: "280 100% 60%",         // Bright purple
      },
      dark: {
        primary: "280 90% 70%",       // Lighter purple
        secondary: "340 80% 65%",     // Hot pink
        accent: "160 80% 55%",        // Turquoise
        destructive: "15 90% 60%",    // Orange-red
        muted: "280 20% 20%",         // Dark purple tint
        background: "280 30% 10%",    // Dark purple-black
        foreground: "280 20% 95%",    // Light purple-white
        card: "280 30% 10%",          // Dark purple-black
        border: "280 20% 25%",        // Medium dark purple
        input: "280 20% 25%",         // Medium dark purple
        ring: "280 90% 70%",          // Lighter purple
      },
      chart: [
        "280 100% 60%",   // Purple
        "340 100% 65%",   // Pink
        "160 100% 50%",   // Turquoise
        "50 100% 55%",    // Yellow
        "15 100% 55%",    // Orange
      ],
    },
    typography: {
      ...baseBrand.typography,
      fontHeading: {
        name: "Poppins",
        weights: [600, 700, 800],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
      fontBody: {
        name: "Poppins",
        weights: [400, 500, 600],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
    },
  },
};
