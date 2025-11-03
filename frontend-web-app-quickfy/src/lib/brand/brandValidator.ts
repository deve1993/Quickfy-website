/**
 * Brand DNA Validation
 *
 * Validation utilities for brand DNA configurations including
 * color validation, contrast checking (WCAG compliance), and schema validation.
 */

import type {
  BrandDNA,
  ColorValue,
  ValidationResult,
  ValidationError,
  ContrastResult,
} from "@/types/brand";

/**
 * Validate HSL color format
 *
 * @param color - Color value to validate
 * @returns True if valid HSL format
 *
 * @example
 * isValidHSL("221.2 83.2% 53.3%") // true
 * isValidHSL("invalid") // false
 */
export function isValidHSL(color: ColorValue): boolean {
  // HSL format: "hue saturation% lightness%"
  // Hue: 0-360, Saturation: 0-100%, Lightness: 0-100%
  const hslRegex = /^(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%$/;
  const match = color.match(hslRegex);

  if (!match) return false;

  const [, h, s, l] = match;
  const hue = parseFloat(h);
  const saturation = parseFloat(s);
  const lightness = parseFloat(l);

  return (
    hue >= 0 &&
    hue <= 360 &&
    saturation >= 0 &&
    saturation <= 100 &&
    lightness >= 0 &&
    lightness <= 100
  );
}

/**
 * Convert HSL to RGB
 *
 * @param hsl - HSL color value
 * @returns RGB object { r, g, b } with values 0-255
 */
export function hslToRgb(hsl: ColorValue): { r: number; g: number; b: number } {
  const match = hsl.match(/^(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%$/);
  if (!match) throw new Error(`Invalid HSL color: ${hsl}`);

  const h = parseFloat(match[1]) / 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
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

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Calculate relative luminance (WCAG)
 *
 * @param rgb - RGB color object
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors (WCAG)
 *
 * @param color1 - First HSL color
 * @param color2 - Second HSL color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: ColorValue, color2: ColorValue): number {
  const rgb1 = hslToRgb(color1);
  const rgb2 = hslToRgb(color2);

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG contrast compliance
 *
 * @param foreground - Foreground color (text)
 * @param background - Background color
 * @returns Contrast result with WCAG compliance levels
 *
 * @example
 * const result = checkContrast("221.2 83.2% 53.3%", "0 0% 100%");
 * console.log(result.aa); // true if passes AA (4.5:1)
 */
export function checkContrast(
  foreground: ColorValue,
  background: ColorValue
): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= 4.5,          // Normal text AA
    aaa: ratio >= 7,           // Normal text AAA
    aaLarge: ratio >= 3,       // Large text AA (18pt+ or 14pt+ bold)
    aaaLarge: ratio >= 4.5,    // Large text AAA
  };
}

/**
 * Validate brand DNA configuration
 *
 * @param brandDNA - Brand DNA to validate
 * @returns Validation result with errors
 */
export function validateBrandDNA(brandDNA: Partial<BrandDNA>): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate metadata
  if (!brandDNA.metadata?.name || brandDNA.metadata.name.trim() === "") {
    errors.push({
      field: "metadata.name",
      message: "Brand name is required",
      code: "REQUIRED_FIELD",
    });
  }

  // Validate colors
  if (brandDNA.colors) {
    // Validate light theme colors
    if (brandDNA.colors.light) {
      Object.entries(brandDNA.colors.light).forEach(([key, value]) => {
        if (!isValidHSL(value)) {
          errors.push({
            field: `colors.light.${key}`,
            message: `Invalid HSL color format: ${value}`,
            code: "INVALID_COLOR",
          });
        }
      });

      // Check primary/background contrast
      if (brandDNA.colors.light.primary && brandDNA.colors.light.background) {
        const contrast = checkContrast(
          brandDNA.colors.light.primary,
          brandDNA.colors.light.background
        );
        if (!contrast.aa) {
          errors.push({
            field: "colors.light.primary",
            message: `Primary color contrast ratio (${contrast.ratio}:1) does not meet WCAG AA standards (4.5:1)`,
            code: "INSUFFICIENT_CONTRAST",
          });
        }
      }

      // Check foreground/background contrast
      if (brandDNA.colors.light.foreground && brandDNA.colors.light.background) {
        const contrast = checkContrast(
          brandDNA.colors.light.foreground,
          brandDNA.colors.light.background
        );
        if (!contrast.aa) {
          errors.push({
            field: "colors.light.foreground",
            message: `Foreground color contrast ratio (${contrast.ratio}:1) does not meet WCAG AA standards (4.5:1)`,
            code: "INSUFFICIENT_CONTRAST",
          });
        }
      }
    }

    // Validate dark theme colors
    if (brandDNA.colors.dark) {
      Object.entries(brandDNA.colors.dark).forEach(([key, value]) => {
        if (!isValidHSL(value)) {
          errors.push({
            field: `colors.dark.${key}`,
            message: `Invalid HSL color format: ${value}`,
            code: "INVALID_COLOR",
          });
        }
      });

      // Check dark theme contrast
      if (brandDNA.colors.dark.foreground && brandDNA.colors.dark.background) {
        const contrast = checkContrast(
          brandDNA.colors.dark.foreground,
          brandDNA.colors.dark.background
        );
        if (!contrast.aa) {
          errors.push({
            field: "colors.dark.foreground",
            message: `Dark theme foreground contrast ratio (${contrast.ratio}:1) does not meet WCAG AA standards (4.5:1)`,
            code: "INSUFFICIENT_CONTRAST",
          });
        }
      }
    }

    // Validate chart colors
    if (brandDNA.colors.chart) {
      if (brandDNA.colors.chart.length !== 5) {
        errors.push({
          field: "colors.chart",
          message: "Chart colors must contain exactly 5 colors",
          code: "INVALID_ARRAY_LENGTH",
        });
      } else {
        brandDNA.colors.chart.forEach((color, index) => {
          if (!isValidHSL(color)) {
            errors.push({
              field: `colors.chart[${index}]`,
              message: `Invalid HSL color format: ${color}`,
              code: "INVALID_COLOR",
            });
          }
        });
      }
    }
  }

  // Validate typography
  if (brandDNA.typography) {
    if (!brandDNA.typography.fontBody?.name) {
      errors.push({
        field: "typography.fontBody.name",
        message: "Body font name is required",
        code: "REQUIRED_FIELD",
      });
    }

    if (!brandDNA.typography.fontHeading?.name) {
      errors.push({
        field: "typography.fontHeading.name",
        message: "Heading font name is required",
        code: "REQUIRED_FIELD",
      });
    }
  }

  // Validate strategy (optional but if provided, validate content)
  if (brandDNA.strategy) {
    // Validate purpose length
    if (brandDNA.strategy.purpose && brandDNA.strategy.purpose.length > 200) {
      errors.push({
        field: "strategy.purpose",
        message: "Purpose should not exceed 200 characters",
        code: "MAX_LENGTH",
      });
    }

    // Validate vision length
    if (brandDNA.strategy.vision && brandDNA.strategy.vision.length > 200) {
      errors.push({
        field: "strategy.vision",
        message: "Vision should not exceed 200 characters",
        code: "MAX_LENGTH",
      });
    }

    // Validate mission length
    if (brandDNA.strategy.mission && brandDNA.strategy.mission.length > 300) {
      errors.push({
        field: "strategy.mission",
        message: "Mission should not exceed 300 characters",
        code: "MAX_LENGTH",
      });
    }

    // Validate values (recommended 3-5)
    if (brandDNA.strategy.values) {
      if (brandDNA.strategy.values.length > 5) {
        errors.push({
          field: "strategy.values",
          message: "Maximum 5 values recommended",
          code: "MAX_ARRAY_LENGTH",
        });
      }

      // Validate each value
      brandDNA.strategy.values.forEach((value, index) => {
        if (!value.name || value.name.trim() === "") {
          errors.push({
            field: `strategy.values[${index}].name`,
            message: "Value name is required",
            code: "REQUIRED_FIELD",
          });
        }
        if (value.name && value.name.length > 50) {
          errors.push({
            field: `strategy.values[${index}].name`,
            message: "Value name should not exceed 50 characters",
            code: "MAX_LENGTH",
          });
        }
        if (value.description && value.description.length > 200) {
          errors.push({
            field: `strategy.values[${index}].description`,
            message: "Value description should not exceed 200 characters",
            code: "MAX_LENGTH",
          });
        }
      });
    }

    // Validate tone of voice traits
    if (brandDNA.strategy.toneOfVoice?.traits) {
      if (brandDNA.strategy.toneOfVoice.traits.length > 7) {
        errors.push({
          field: "strategy.toneOfVoice.traits",
          message: "Maximum 7 tone traits recommended",
          code: "MAX_ARRAY_LENGTH",
        });
      }

      brandDNA.strategy.toneOfVoice.traits.forEach((trait, index) => {
        if (trait.trim() === "") {
          errors.push({
            field: `strategy.toneOfVoice.traits[${index}]`,
            message: "Trait cannot be empty",
            code: "INVALID_VALUE",
          });
        }
        if (trait.length > 30) {
          errors.push({
            field: `strategy.toneOfVoice.traits[${index}]`,
            message: "Trait should not exceed 30 characters",
            code: "MAX_LENGTH",
          });
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate imported brand DNA JSON
 *
 * @param json - JSON string to validate
 * @returns Validation result
 */
export function validateImportedJSON(json: string): ValidationResult {
  const errors: ValidationError[] = [];

  // Try to parse JSON
  let data: any;
  try {
    data = JSON.parse(json);
  } catch (e) {
    errors.push({
      field: "json",
      message: "Invalid JSON format",
      code: "INVALID_JSON",
    });
    return { valid: false, errors };
  }

  // Check if it has brandDNA structure
  if (!data.metadata && !data.colors && !data.typography) {
    errors.push({
      field: "json",
      message: "JSON does not contain valid brand DNA structure",
      code: "INVALID_STRUCTURE",
    });
    return { valid: false, errors };
  }

  // Validate the brand DNA
  return validateBrandDNA(data);
}
