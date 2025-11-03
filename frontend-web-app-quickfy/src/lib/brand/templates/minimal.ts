import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "../brandDefaults";

const baseBrand = getDefaultBrand();

export const minimalTemplate: BrandTemplate = {
  id: "minimal",
  name: "Minimal",
  description: "Clean and understated design with neutral colors",
  category: "minimal",
  brandDNA: {
    ...baseBrand,
    metadata: {
      ...baseBrand.metadata,
      name: "Minimal Brand",
      tagline: "Less is more",
    },
    colors: {
      light: {
        primary: "0 0% 9%",          // Almost black
        secondary: "0 0% 96%",        // Light gray
        accent: "0 0% 45%",           // Medium gray
        destructive: "0 0% 20%",      // Dark gray
        muted: "0 0% 96%",            // Light gray
        background: "0 0% 100%",      // White
        foreground: "0 0% 9%",        // Almost black
        card: "0 0% 100%",            // White
        border: "0 0% 90%",           // Light gray
        input: "0 0% 90%",            // Light gray
        ring: "0 0% 9%",              // Almost black
      },
      dark: {
        primary: "0 0% 98%",          // Almost white
        secondary: "0 0% 14%",        // Dark gray
        accent: "0 0% 24%",           // Medium-dark gray
        destructive: "0 0% 40%",      // Medium gray
        muted: "0 0% 14%",            // Dark gray
        background: "0 0% 9%",        // Almost black
        foreground: "0 0% 98%",       // Almost white
        card: "0 0% 9%",              // Almost black
        border: "0 0% 20%",           // Dark gray
        input: "0 0% 20%",            // Dark gray
        ring: "0 0% 98%",             // Almost white
      },
      chart: [
        "0 0% 20%",
        "0 0% 35%",
        "0 0% 50%",
        "0 0% 65%",
        "0 0% 80%",
      ],
    },
    typography: {
      ...baseBrand.typography,
      fontHeading: {
        name: "Inter",
        weights: [400, 600, 700],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
      fontBody: {
        name: "Inter",
        weights: [400, 500],
        styles: ["normal"],
        url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
        fallback: ["system-ui", "sans-serif"],
      },
    },
  },
};
