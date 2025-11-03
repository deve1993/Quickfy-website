import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "../brandDefaults";

const baseBrand = getDefaultBrand();

export const professionalTemplate: BrandTemplate = {
  id: "professional",
  name: "Professional",
  description: "Elegant and trustworthy design for corporate brands",
  category: "professional",
  brandDNA: {
    ...baseBrand,
    metadata: {
      ...baseBrand.metadata,
      name: "Professional Brand",
      tagline: "Excellence in every detail",
    },
    colors: {
      light: {
        primary: "210 100% 35%",      // Deep blue
        secondary: "210 15% 90%",     // Light blue-gray
        accent: "195 100% 40%",       // Professional teal
        destructive: "355 75% 45%",   // Muted red
        muted: "210 15% 90%",         // Light blue-gray
        background: "0 0% 100%",      // White
        foreground: "210 50% 10%",    // Dark blue-black
        card: "0 0% 100%",            // White
        border: "210 20% 85%",        // Light blue-gray
        input: "210 20% 85%",         // Light blue-gray
        ring: "210 100% 35%",         // Deep blue
      },
      dark: {
        primary: "210 100% 60%",      // Bright blue
        secondary: "210 15% 20%",     // Dark blue-gray
        accent: "195 80% 50%",        // Professional teal
        destructive: "355 65% 50%",   // Muted red
        muted: "210 15% 20%",         // Dark blue-gray
        background: "210 30% 8%",     // Very dark blue
        foreground: "210 20% 95%",    // Off-white
        card: "210 30% 8%",           // Very dark blue
        border: "210 20% 18%",        // Dark blue-gray
        input: "210 20% 18%",         // Dark blue-gray
        ring: "210 100% 60%",         // Bright blue
      },
      chart: [
        "210 100% 35%",   // Deep blue
        "195 100% 40%",   // Teal
        "170 60% 45%",    // Green-blue
        "200 70% 50%",    // Sky blue
        "220 80% 55%",    // Light blue
      ],
    },
    typography: {
      ...baseBrand.typography,
      fontHeading: {
        name: "Playfair Display",
        weights: [600, 700, 800],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap",
        fallback: ["Georgia", "serif"],
      },
      fontBody: {
        name: "Lato",
        weights: [400, 600, 700],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
    },
  },
};
