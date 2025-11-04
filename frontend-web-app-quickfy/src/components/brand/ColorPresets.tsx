/**
 * Color Presets Component
 *
 * Pre-defined color palettes that users can apply with one click.
 * Provides quick start options for common brand color schemes.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ColorValue } from "@/types/brand";

export interface ColorPreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: ColorValue;
    secondary: ColorValue;
    accent: ColorValue;
  };
}

/**
 * Pre-defined color palettes
 */
export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "professional-blue",
    name: "Professional Blue",
    description: "Trustworthy and corporate",
    colors: {
      primary: "221.2 83.2% 53.3%",   // Blue
      secondary: "210 40% 96.1%",     // Light blue-gray
      accent: "217.2 91.2% 59.8%",    // Bright blue
    },
  },
  {
    id: "nature-green",
    name: "Nature Green",
    description: "Fresh and organic",
    colors: {
      primary: "142.1 76.2% 36.3%",   // Green
      secondary: "140 40% 96%",       // Light green
      accent: "173.4 80% 40%",        // Teal
    },
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm and energetic",
    colors: {
      primary: "24.6 95% 53.1%",      // Orange
      secondary: "24 40% 96%",        // Light orange
      accent: "346.8 77.2% 49.8%",    // Red-pink
    },
  },
  {
    id: "modern-purple",
    name: "Modern Purple",
    description: "Creative and innovative",
    colors: {
      primary: "262.1 83.3% 57.8%",   // Purple
      secondary: "270 40% 96%",       // Light purple
      accent: "316.7 71.3% 58%",      // Pink-purple
    },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Clean and minimal",
    colors: {
      primary: "0 0% 9%",             // Near black
      secondary: "0 0% 96%",          // Light gray
      accent: "0 0% 45%",             // Medium gray
    },
  },
];

interface ColorPresetsProps {
  /**
   * Currently selected preset (if any)
   */
  currentColors?: {
    primary: ColorValue;
    secondary: ColorValue;
    accent: ColorValue;
  };
  /**
   * Callback when a preset is selected
   */
  onSelect: (preset: ColorPreset) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Check if current colors match a preset
 */
function matchesPreset(
  current: { primary: ColorValue; secondary: ColorValue; accent: ColorValue },
  preset: ColorPreset
): boolean {
  return (
    current.primary === preset.colors.primary &&
    current.secondary === preset.colors.secondary &&
    current.accent === preset.colors.accent
  );
}

/**
 * Color Presets Component
 */
export function ColorPresets({
  currentColors,
  onSelect,
  className,
}: ColorPresetsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <h4 className="text-sm font-medium">Palette Predefinite</h4>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {COLOR_PRESETS.map((preset) => {
          const isSelected =
            currentColors && matchesPreset(currentColors, preset);

          return (
            <Card
              key={preset.id}
              className={cn(
                "relative cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => onSelect(preset)}
            >
              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm truncate">
                      {preset.name}
                    </h5>
                    <p className="text-xs text-muted-foreground truncate">
                      {preset.description}
                    </p>
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="shrink-0 h-5">
                      <Check className="h-3 w-3" />
                    </Badge>
                  )}
                </div>

                {/* Color Swatches */}
                <div className="flex gap-2">
                  <div
                    className="flex-1 h-10 rounded border-2 border-border"
                    style={{ backgroundColor: `hsl(${preset.colors.primary})` }}
                    title={`Primary: ${preset.colors.primary}`}
                  />
                  <div
                    className="flex-1 h-10 rounded border-2 border-border"
                    style={{ backgroundColor: `hsl(${preset.colors.secondary})` }}
                    title={`Secondary: ${preset.colors.secondary}`}
                  />
                  <div
                    className="flex-1 h-10 rounded border-2 border-border"
                    style={{ backgroundColor: `hsl(${preset.colors.accent})` }}
                    title={`Accent: ${preset.colors.accent}`}
                  />
                </div>

                {/* Apply Button */}
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(preset);
                  }}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Applicato
                    </>
                  ) : (
                    "Applica"
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
