/**
 * Color Scale Generator Component
 *
 * Automatically generates color scales (50-900) from a base color.
 * Useful for creating consistent color variations across your design system.
 */

"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ColorPicker } from "./ColorPicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import type { ColorValue } from "@/types/brand";

interface ColorScaleProps {
  /**
   * Base color to generate scale from
   */
  baseColor: ColorValue;
  /**
   * Callback when base color changes
   */
  onChange?: (color: ColorValue) => void;
  /**
   * Show code export
   */
  showExport?: boolean;
}

/**
 * Parse HSL string
 */
function parseHSL(hsl: ColorValue): { h: number; s: number; l: number } {
  const match = hsl.match(
    /^(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%$/
  );
  if (!match) {
    return { h: 0, s: 50, l: 50 };
  }
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

/**
 * Format HSL components to string
 */
function formatHSL(h: number, s: number, l: number): ColorValue {
  return `${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%`;
}

/**
 * Generate color scale from base color
 *
 * Creates shades from 50 (lightest) to 900 (darkest)
 */
function generateColorScale(baseColor: ColorValue): Record<number, ColorValue> {
  const { h, s, l } = parseHSL(baseColor);

  // Define lightness values for each shade
  // 500 is the base color, adjust others around it
  const scales = {
    50: 95,   // Very light
    100: 90,  // Light
    200: 80,  // Light
    300: 70,  // Light-medium
    400: 60,  // Medium-light
    500: l,   // Base (unchanged)
    600: Math.max(l - 10, 40),  // Medium-dark
    700: Math.max(l - 20, 30),  // Dark
    800: Math.max(l - 30, 20),  // Darker
    900: Math.max(l - 40, 10),  // Darkest
  };

  const scale: Record<number, ColorValue> = {};
  Object.entries(scales).forEach(([shade, lightness]) => {
    // Adjust saturation slightly for very light/dark shades
    let adjustedS = s;
    if (lightness > 85) {
      // Reduce saturation for very light shades
      adjustedS = s * 0.8;
    } else if (lightness < 25) {
      // Reduce saturation slightly for very dark shades
      adjustedS = s * 0.9;
    }

    scale[Number(shade)] = formatHSL(h, adjustedS, lightness);
  });

  return scale;
}

/**
 * Color Scale Component
 */
export function ColorScale({
  baseColor,
  onChange,
  showExport = false,
}: ColorScaleProps) {
  const [copiedShade, setCopiedShade] = useState<number | null>(null);

  // Generate scale
  const scale = useMemo(() => generateColorScale(baseColor), [baseColor]);

  // Handle copy
  const handleCopy = (shade: number, color: ColorValue) => {
    navigator.clipboard.writeText(color);
    setCopiedShade(shade);
    setTimeout(() => setCopiedShade(null), 2000);
  };

  // Export as CSS variables
  const cssExport = useMemo(() => {
    return Object.entries(scale)
      .map(([shade, color]) => `  --color-${shade}: ${color};`)
      .join("\n");
  }, [scale]);

  // Export as Tailwind config
  const tailwindExport = useMemo(() => {
    return `colors: {
  brand: {
${Object.entries(scale)
  .map(([shade, color]) => `    ${shade}: 'hsl(${color})',`)
  .join("\n")}
  }
}`;
  }, [scale]);

  return (
    <div className="space-y-6">
      {/* Color Picker */}
      {onChange && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Base Color</CardTitle>
            <CardDescription>
              Choose a base color to generate a full scale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorPicker
              value={baseColor}
              onChange={onChange}
              label="Base Color (500)"
            />
          </CardContent>
        </Card>
      )}

      {/* Generated Scale */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generated Scale</CardTitle>
          <CardDescription>
            10 shades automatically generated from your base color
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(scale).map(([shade, color]) => {
            const isBase = Number(shade) === 500;
            const isCopied = copiedShade === Number(shade);

            return (
              <div
                key={shade}
                className="flex items-center gap-3 p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                {/* Color Preview */}
                <div
                  className="w-12 h-12 rounded-lg border-2 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: `hsl(${color})` }}
                />

                {/* Shade Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{shade}</span>
                    {isBase && (
                      <Badge variant="default" className="text-[10px] h-5">
                        Base
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {color}
                  </p>
                </div>

                {/* Copy Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(Number(shade), color)}
                  className="flex-shrink-0"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Export Options */}
      {showExport && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">CSS Variables</CardTitle>
              <CardDescription>
                Use these in your CSS files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 rounded-lg bg-muted text-xs overflow-x-auto">
                <code>{`:root {\n${cssExport}\n}`}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => {
                  navigator.clipboard.writeText(`:root {\n${cssExport}\n}`);
                  toast.success("CSS variables copiato negli appunti!");
                }}
              >
                <Copy className="w-3 h-3 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tailwind Config</CardTitle>
              <CardDescription>
                Add to tailwind.config.js
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 rounded-lg bg-muted text-xs overflow-x-auto">
                <code>{tailwindExport}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => {
                  navigator.clipboard.writeText(tailwindExport);
                  toast.success("Tailwind config copiato negli appunti!");
                }}
              >
                <Copy className="w-3 h-3 mr-2" />
                Copy Config
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Usage Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usage Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>50-200</strong>: Backgrounds and subtle elements</p>
          <p>• <strong>300-400</strong>: Borders and disabled states</p>
          <p>• <strong>500</strong>: Primary/default color</p>
          <p>• <strong>600-700</strong>: Hover states and emphasis</p>
          <p>• <strong>800-900</strong>: Active states and high contrast</p>
        </CardContent>
      </Card>
    </div>
  );
}
