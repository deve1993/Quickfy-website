/**
 * Simple Color Picker Component
 *
 * User-friendly color picker using native browser color input.
 * Converts between HEX (browser) and HSL (Brand DNA format).
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ColorValue } from "@/types/brand";

interface SimpleColorPickerProps {
  /**
   * Current color value in HSL format
   */
  value: ColorValue;
  /**
   * Callback when color changes
   */
  onChange: (color: ColorValue) => void;
  /**
   * Label for the color picker
   */
  label?: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Disable the picker
   */
  disabled?: boolean;
}

/**
 * Convert HSL string to HEX for browser color input
 */
function hslToHex(hsl: ColorValue): string {
  // Parse HSL: "221.2 83.2% 53.3%"
  const match = hsl.match(
    /^(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%$/
  );
  if (!match) return "#000000";

  const h = parseFloat(match[1]) / 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert HEX to HSL for Brand DNA format
 */
function hexToHsl(hex: string): ColorValue {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse hex
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Convert to HSL string format: "H S% L%"
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

/**
 * Simple Color Picker Component
 */
export function SimpleColorPicker({
  value,
  onChange,
  label,
  description,
  className,
  disabled = false,
}: SimpleColorPickerProps) {
  const [hexValue, setHexValue] = useState(() => hslToHex(value));

  // Update hex when HSL value changes
  useEffect(() => {
    setHexValue(hslToHex(value));
  }, [value]);

  // Handle color change from browser picker
  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHex = e.target.value;
      setHexValue(newHex);
      const newHsl = hexToHsl(newHex);
      onChange(newHsl);
    },
    [onChange]
  );

  // Handle manual HEX input
  const handleHexInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newHex = e.target.value;
      setHexValue(newHex);

      // Only convert if valid hex
      if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
        const newHsl = hexToHsl(newHex);
        onChange(newHsl);
      }
    },
    [onChange]
  );

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <div className="space-y-1">
          <Label className="text-sm font-medium">{label}</Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Visual Color Picker */}
        <div className="relative">
          <input
            type="color"
            value={hexValue}
            onChange={handleColorChange}
            disabled={disabled}
            className={cn(
              "h-12 w-12 rounded-lg border-2 border-border cursor-pointer",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:border-primary transition-colors"
            )}
            style={{ backgroundColor: hexValue }}
          />
        </div>

        {/* HEX Input */}
        <div className="flex-1">
          <Input
            type="text"
            value={hexValue}
            onChange={handleHexInputChange}
            disabled={disabled}
            placeholder="#000000"
            className="font-mono text-sm"
            maxLength={7}
          />
          <p className="text-xs text-muted-foreground mt-1">
            HSL: {value}
          </p>
        </div>

        {/* Color Preview */}
        <div
          className="h-12 w-12 rounded-lg border-2 border-border shrink-0"
          style={{ backgroundColor: `hsl(${value})` }}
          title={`HSL: ${value}`}
        />
      </div>
    </div>
  );
}
