/**
 * HSL Color Picker Component
 *
 * Interactive color picker for selecting colors in HSL format.
 * Features sliders for Hue, Saturation, and Lightness with live preview.
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ColorValue } from "@/types/brand";

interface ColorPickerProps {
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
 * Parse HSL string to components
 */
function parseHSL(hsl: ColorValue): { h: number; s: number; l: number } {
  const match = hsl.match(
    /^(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%$/
  );
  if (!match) {
    return { h: 0, s: 0, l: 0 };
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
 * Convert HSL to RGB for preview
 */
function hslToRgbString(h: number, s: number, l: number): string {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  let r, g, b;

  if (sNorm === 0) {
    r = g = b = lNorm;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;

    r = hue2rgb(p, q, hNorm + 1 / 3);
    g = hue2rgb(p, q, hNorm);
    b = hue2rgb(p, q, hNorm - 1 / 3);
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

/**
 * Color Picker Component
 */
export function ColorPicker({
  value,
  onChange,
  label,
  description,
  className,
  disabled = false,
}: ColorPickerProps) {
  const [hsl, setHsl] = useState(() => parseHSL(value));
  const [textValue, setTextValue] = useState(value);

  // Update local state when prop changes
  useEffect(() => {
    const parsed = parseHSL(value);
    setHsl(parsed);
    setTextValue(value);
  }, [value]);

  // Handle slider changes
  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newH = parseFloat(e.target.value);
      const newColor = formatHSL(newH, hsl.s, hsl.l);
      setHsl({ ...hsl, h: newH });
      setTextValue(newColor);
      onChange(newColor);
    },
    [hsl, onChange]
  );

  const handleSaturationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newS = parseFloat(e.target.value);
      const newColor = formatHSL(hsl.h, newS, hsl.l);
      setHsl({ ...hsl, s: newS });
      setTextValue(newColor);
      onChange(newColor);
    },
    [hsl, onChange]
  );

  const handleLightnessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newL = parseFloat(e.target.value);
      const newColor = formatHSL(hsl.h, hsl.s, newL);
      setHsl({ ...hsl, l: newL });
      setTextValue(newColor);
      onChange(newColor);
    },
    [hsl, onChange]
  );

  // Handle text input changes
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setTextValue(newValue);

      // Validate and update if valid
      const match = newValue.match(
        /^(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%$/
      );
      if (match) {
        const h = parseFloat(match[1]);
        const s = parseFloat(match[2]);
        const l = parseFloat(match[3]);

        if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
          setHsl({ h, s, l });
          onChange(newValue);
        }
      }
    },
    [onChange]
  );

  const previewColor = hslToRgbString(hsl.h, hsl.s, hsl.l);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Label and Description */}
      {label && (
        <div className="space-y-1">
          <Label className="text-sm font-medium">{label}</Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Color Preview */}
      <div className="flex items-center gap-3">
        <div
          className="w-16 h-16 rounded-lg border-2 border-border shadow-sm"
          style={{ backgroundColor: previewColor }}
          aria-label="Color preview"
        />
        <Input
          value={textValue}
          onChange={handleTextChange}
          disabled={disabled}
          placeholder="0 0% 0%"
          className="flex-1 font-mono text-sm"
        />
      </div>

      {/* Hue Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Hue</Label>
          <span className="text-xs font-mono text-muted-foreground">
            {hsl.h.toFixed(1)}°
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="0.1"
          value={hsl.h}
          onChange={handleHueChange}
          disabled={disabled}
          className={cn(
            "w-full h-2 rounded-lg appearance-none cursor-pointer",
            "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{
            WebkitAppearance: "none",
          }}
        />
      </div>

      {/* Saturation Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Saturation</Label>
          <span className="text-xs font-mono text-muted-foreground">
            {hsl.s.toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={hsl.s}
          onChange={handleSaturationChange}
          disabled={disabled}
          className={cn(
            "w-full h-2 rounded-lg appearance-none cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{
            WebkitAppearance: "none",
            background: `linear-gradient(to right,
              hsl(${hsl.h}, 0%, ${hsl.l}%),
              hsl(${hsl.h}, 100%, ${hsl.l}%))`,
          }}
        />
      </div>

      {/* Lightness Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Lightness</Label>
          <span className="text-xs font-mono text-muted-foreground">
            {hsl.l.toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={hsl.l}
          onChange={handleLightnessChange}
          disabled={disabled}
          className={cn(
            "w-full h-2 rounded-lg appearance-none cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{
            WebkitAppearance: "none",
            background: `linear-gradient(to right,
              hsl(${hsl.h}, ${hsl.s}%, 0%),
              hsl(${hsl.h}, ${hsl.s}%, 50%),
              hsl(${hsl.h}, ${hsl.s}%, 100%))`,
          }}
        />
      </div>
    </div>
  );
}
