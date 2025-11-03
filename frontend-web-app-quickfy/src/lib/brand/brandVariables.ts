/**
 * Brand DNA to CSS Variables
 *
 * Utilities for generating CSS custom properties from Brand DNA configuration.
 * These variables integrate seamlessly with the existing Tailwind theme system.
 */

import type { BrandDNA, ColorPalette } from "@/types/brand";

/**
 * Generate CSS variables for color palette
 *
 * @param palette - Color palette object
 * @param prefix - CSS variable prefix (e.g., "--")
 * @returns CSS variable declarations
 */
function generateColorVariables(
  palette: ColorPalette,
  prefix: string = "--"
): Record<string, string> {
  return {
    [`${prefix}background`]: palette.background,
    [`${prefix}foreground`]: palette.foreground,
    [`${prefix}primary`]: palette.primary,
    [`${prefix}primary-foreground`]: palette.foreground,
    [`${prefix}secondary`]: palette.secondary,
    [`${prefix}secondary-foreground`]: palette.foreground,
    [`${prefix}accent`]: palette.accent,
    [`${prefix}accent-foreground`]: palette.foreground,
    [`${prefix}destructive`]: palette.destructive,
    [`${prefix}destructive-foreground`]: palette.foreground,
    [`${prefix}muted`]: palette.muted,
    [`${prefix}muted-foreground`]: palette.foreground,
    [`${prefix}card`]: palette.card,
    [`${prefix}card-foreground`]: palette.foreground,
    [`${prefix}border`]: palette.border,
    [`${prefix}input`]: palette.input,
    [`${prefix}ring`]: palette.ring,
  };
}

/**
 * Generate CSS variables from Brand DNA
 *
 * @param brandDNA - Complete brand DNA configuration
 * @returns Object with CSS variable names and values
 *
 * @example
 * const vars = generateCSSVariables(brandDNA);
 * // {
 * //   "--primary": "221.2 83.2% 53.3%",
 * //   "--background": "0 0% 100%",
 * //   ...
 * // }
 */
export function generateCSSVariables(brandDNA: BrandDNA): Record<string, string> {
  const variables: Record<string, string> = {};

  // Color variables
  const lightColors = generateColorVariables(brandDNA.colors.light);
  Object.assign(variables, lightColors);

  // Chart colors
  brandDNA.colors.chart.forEach((color, index) => {
    variables[`--chart-${index + 1}`] = color;
  });

  // Typography variables
  variables["--font-heading"] = `${brandDNA.typography.fontHeading.name}, ${brandDNA.typography.fontHeading.fallback.join(", ")}`;
  variables["--font-body"] = `${brandDNA.typography.fontBody.name}, ${brandDNA.typography.fontBody.fallback.join(", ")}`;
  variables["--font-mono"] = `${brandDNA.typography.fontMono.name}, ${brandDNA.typography.fontMono.fallback.join(", ")}`;

  // Font sizes
  Object.entries(brandDNA.typography.scale).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });

  // Line heights
  variables["--line-height-tight"] = String(brandDNA.typography.lineHeight.tight);
  variables["--line-height-normal"] = String(brandDNA.typography.lineHeight.normal);
  variables["--line-height-relaxed"] = String(brandDNA.typography.lineHeight.relaxed);

  // Letter spacing
  variables["--letter-spacing-tight"] = brandDNA.typography.letterSpacing.tight;
  variables["--letter-spacing-normal"] = brandDNA.typography.letterSpacing.normal;
  variables["--letter-spacing-wide"] = brandDNA.typography.letterSpacing.wide;

  // Spacing variables
  Object.entries(brandDNA.spacing.radius).forEach(([key, value]) => {
    if (key === "lg") {
      // Main radius variable (default)
      variables["--radius"] = value;
    }
    variables[`--radius-${key}`] = value;
  });

  Object.entries(brandDNA.spacing.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });

  return variables;
}

/**
 * Generate dark theme CSS variables
 *
 * @param brandDNA - Complete brand DNA configuration
 * @returns Object with CSS variable names and values for dark theme
 */
export function generateDarkThemeVariables(brandDNA: BrandDNA): Record<string, string> {
  const variables: Record<string, string> = {};

  // Dark theme colors
  const darkColors = generateColorVariables(brandDNA.colors.dark);
  Object.assign(variables, darkColors);

  // Chart colors remain the same
  brandDNA.colors.chart.forEach((color, index) => {
    variables[`--chart-${index + 1}`] = color;
  });

  return variables;
}

/**
 * Convert variables object to CSS string
 *
 * @param variables - CSS variables object
 * @param selector - CSS selector (e.g., ":root", ".dark")
 * @returns CSS string
 *
 * @example
 * const css = variablesToCSS({ "--primary": "221.2 83.2% 53.3%" }, ":root");
 * // ":root {\n  --primary: 221.2 83.2% 53.3%;\n}"
 */
export function variablesToCSS(
  variables: Record<string, string>,
  selector: string = ":root"
): string {
  const declarations = Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");

  return `${selector} {\n${declarations}\n}`;
}

/**
 * Generate complete CSS string from Brand DNA
 *
 * @param brandDNA - Complete brand DNA configuration
 * @returns Complete CSS string with light and dark themes
 *
 * @example
 * const css = generateBrandCSS(brandDNA);
 * // Includes :root for light theme and .dark for dark theme
 */
export function generateBrandCSS(brandDNA: BrandDNA): string {
  const lightVars = generateCSSVariables(brandDNA);
  const darkVars = generateDarkThemeVariables(brandDNA);

  const lightCSS = variablesToCSS(lightVars, ":root");
  const darkCSS = variablesToCSS(darkVars, ".dark");

  return `${lightCSS}\n\n${darkCSS}`;
}

/**
 * Apply CSS variables to DOM
 *
 * @param brandDNA - Complete brand DNA configuration
 * @param elementId - ID of style element to create/update
 */
export function applyBrandVariables(
  brandDNA: BrandDNA,
  elementId: string = "brand-variables"
): void {
  // Remove existing style element if it exists
  const existing = document.getElementById(elementId);
  if (existing) {
    existing.remove();
  }

  // Create new style element
  const styleElement = document.createElement("style");
  styleElement.id = elementId;
  styleElement.textContent = generateBrandCSS(brandDNA);

  // Append to head
  document.head.appendChild(styleElement);
}

/**
 * Remove brand variables from DOM
 *
 * @param elementId - ID of style element to remove
 */
export function removeBrandVariables(elementId: string = "brand-variables"): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.remove();
  }
}

/**
 * Load Google Fonts
 *
 * @param brandDNA - Brand DNA configuration
 */
export function loadGoogleFonts(brandDNA: BrandDNA): void {
  const fonts = [
    brandDNA.typography.fontHeading,
    brandDNA.typography.fontBody,
    brandDNA.typography.fontMono,
  ];

  // Remove existing font links
  document
    .querySelectorAll('link[data-brand-font="true"]')
    .forEach((link) => link.remove());

  // Add new font links
  fonts.forEach((font) => {
    if (font.url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font.url;
      link.setAttribute("data-brand-font", "true");
      document.head.appendChild(link);
    }
  });

  // Apply font families to root
  const root = document.documentElement;
  root.style.setProperty(
    "--font-heading",
    `${brandDNA.typography.fontHeading.name}, ${brandDNA.typography.fontHeading.fallback.join(", ")}`
  );
  root.style.setProperty(
    "--font-body",
    `${brandDNA.typography.fontBody.name}, ${brandDNA.typography.fontBody.fallback.join(", ")}`
  );
  root.style.setProperty(
    "--font-mono",
    `${brandDNA.typography.fontMono.name}, ${brandDNA.typography.fontMono.fallback.join(", ")}`
  );
}

/**
 * Get computed CSS variable value
 *
 * @param variableName - CSS variable name (with or without --)
 * @param element - Element to get computed style from (defaults to :root)
 * @returns CSS variable value
 */
export function getCSSVariable(
  variableName: string,
  element: HTMLElement = document.documentElement
): string {
  const name = variableName.startsWith("--") ? variableName : `--${variableName}`;
  return getComputedStyle(element).getPropertyValue(name).trim();
}

/**
 * Set CSS variable value
 *
 * @param variableName - CSS variable name (with or without --)
 * @param value - CSS variable value
 * @param element - Element to set style on (defaults to :root)
 */
export function setCSSVariable(
  variableName: string,
  value: string,
  element: HTMLElement = document.documentElement
): void {
  const name = variableName.startsWith("--") ? variableName : `--${variableName}`;
  element.style.setProperty(name, value);
}
