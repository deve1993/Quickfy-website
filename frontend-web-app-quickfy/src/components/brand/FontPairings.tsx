/**
 * Font Pairings Component
 *
 * Pre-paired font combinations for quick selection.
 * Shows popular heading + body font combinations that work well together.
 */

"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FontFamily } from "@/types/brand";
import { loadGoogleFont, getFontByName } from "@/lib/brand/googleFonts";

export interface FontPairing {
  id: string;
  name: string;
  description: string;
  heading: {
    name: string;
    weights: number[];
    styles: string[];
  };
  body: {
    name: string;
    weights: number[];
    styles: string[];
  };
  category: "modern" | "classic" | "creative" | "professional" | "minimal";
}

/**
 * Popular font pairings
 */
export const POPULAR_FONT_PAIRINGS: FontPairing[] = [
  {
    id: "playfair-lato",
    name: "Playfair Display + Lato",
    description: "Elegante e professionale",
    heading: {
      name: "Playfair Display",
      weights: [600, 700, 800],
      styles: ["normal"],
    },
    body: {
      name: "Lato",
      weights: [400, 600, 700],
      styles: ["normal"],
    },
    category: "professional",
  },
  {
    id: "poppins-poppins",
    name: "Poppins + Poppins",
    description: "Moderno e pulito",
    heading: {
      name: "Poppins",
      weights: [600, 700, 800],
      styles: ["normal"],
    },
    body: {
      name: "Poppins",
      weights: [400, 500, 600],
      styles: ["normal"],
    },
    category: "modern",
  },
  {
    id: "montserrat-opensans",
    name: "Montserrat + Open Sans",
    description: "Versatile e leggibile",
    heading: {
      name: "Montserrat",
      weights: [600, 700, 800],
      styles: ["normal"],
    },
    body: {
      name: "Open Sans",
      weights: [400, 600, 700],
      styles: ["normal"],
    },
    category: "modern",
  },
  {
    id: "raleway-opensans",
    name: "Raleway + Open Sans",
    description: "Elegante e minimalista",
    heading: {
      name: "Raleway",
      weights: [600, 700, 800],
      styles: ["normal"],
    },
    body: {
      name: "Open Sans",
      weights: [400, 600, 700],
      styles: ["normal"],
    },
    category: "minimal",
  },
  {
    id: "roboto-roboto",
    name: "Roboto + Roboto",
    description: "Classico e affidabile",
    heading: {
      name: "Roboto",
      weights: [600, 700, 900],
      styles: ["normal"],
    },
    body: {
      name: "Roboto",
      weights: [400, 500, 600],
      styles: ["normal"],
    },
    category: "classic",
  },
  {
    id: "inter-inter",
    name: "Inter + Inter",
    description: "Moderno e tecnico",
    heading: {
      name: "Inter",
      weights: [600, 700, 800],
      styles: ["normal"],
    },
    body: {
      name: "Inter",
      weights: [400, 500, 600],
      styles: ["normal"],
    },
    category: "modern",
  },
  {
    id: "merriweather-opensans",
    name: "Merriweather + Open Sans",
    description: "Classico e leggibile",
    heading: {
      name: "Merriweather",
      weights: [700, 900],
      styles: ["normal"],
    },
    body: {
      name: "Open Sans",
      weights: [400, 600, 700],
      styles: ["normal"],
    },
    category: "classic",
  },
  {
    id: "oswald-sourcesans",
    name: "Oswald + Source Sans Pro",
    description: "Audace e creativo",
    heading: {
      name: "Oswald",
      weights: [600, 700],
      styles: ["normal"],
    },
    body: {
      name: "Source Sans Pro",
      weights: [400, 600, 700],
      styles: ["normal"],
    },
    category: "creative",
  },
];

interface FontPairingsProps {
  /**
   * Currently selected heading font
   */
  headingFont: FontFamily;
  /**
   * Currently selected body font
   */
  bodyFont: FontFamily;
  /**
   * Callback when a pairing is selected
   */
  onSelect: (pairing: { heading: FontFamily; body: FontFamily }) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Check if current fonts match a pairing
 */
function matchesPairing(
  headingFont: FontFamily,
  bodyFont: FontFamily,
  pairing: FontPairing
): boolean {
  return (
    headingFont.name === pairing.heading.name &&
    bodyFont.name === pairing.body.name
  );
}

/**
 * Font Pairings Component
 */
export function FontPairings({
  headingFont,
  bodyFont,
  onSelect,
  className,
}: FontPairingsProps) {
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  // Load fonts for preview
  useEffect(() => {
    POPULAR_FONT_PAIRINGS.forEach((pairing) => {
      if (!loadedFonts.has(pairing.heading.name)) {
        loadGoogleFont(pairing.heading.name).then(() => {
          setLoadedFonts((prev) => new Set(prev).add(pairing.heading.name));
        });
      }
      if (!loadedFonts.has(pairing.body.name)) {
        loadGoogleFont(pairing.body.name).then(() => {
          setLoadedFonts((prev) => new Set(prev).add(pairing.body.name));
        });
      }
    });
  }, [loadedFonts]);

  // Handle pairing selection
  const handleSelect = (pairing: FontPairing) => {
    const headingGoogleFont = getFontByName(pairing.heading.name);
    const bodyGoogleFont = getFontByName(pairing.body.name);

    if (!headingGoogleFont || !bodyGoogleFont) {
      console.error("Font not found in Google Fonts list");
      return;
    }

    const heading: FontFamily = {
      name: pairing.heading.name,
      weights: pairing.heading.weights,
      styles: pairing.heading.styles,
      url: headingGoogleFont.url,
      fallback: headingGoogleFont.fallback,
    };

    const body: FontFamily = {
      name: pairing.body.name,
      weights: pairing.body.weights,
      styles: pairing.body.styles,
      url: bodyGoogleFont.url,
      fallback: bodyGoogleFont.fallback,
    };

    onSelect({ heading, body });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Type className="h-4 w-4 text-muted-foreground" />
        <h4 className="text-sm font-medium">Coppie di Font Popolari</h4>
      </div>

      {/* Pairings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {POPULAR_FONT_PAIRINGS.map((pairing) => {
          const isSelected = matchesPairing(headingFont, bodyFont, pairing);

          return (
            <Card
              key={pairing.id}
              className={cn(
                "relative cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => handleSelect(pairing)}
            >
              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm truncate">
                      {pairing.name}
                    </h5>
                    <p className="text-xs text-muted-foreground truncate">
                      {pairing.description}
                    </p>
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="shrink-0 h-5">
                      <Check className="h-3 w-3" />
                    </Badge>
                  )}
                </div>

                {/* Font Preview */}
                <div className="space-y-2 py-2 border-t border-b">
                  <div
                    className="text-lg font-bold truncate"
                    style={{ fontFamily: pairing.heading.name }}
                  >
                    Heading
                  </div>
                  <div
                    className="text-sm truncate"
                    style={{ fontFamily: pairing.body.name }}
                  >
                    Body text preview
                  </div>
                </div>

                {/* Category Badge */}
                <Badge variant="outline" className="text-xs capitalize">
                  {pairing.category}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
