/**
 * Brand DNA Importer
 *
 * Utilities for importing and validating brand DNA from various sources.
 * Handles file uploads, JSON parsing, and data migration.
 */

import type { BrandDNA, ValidationResult } from "@/types/brand";
import { validateBrandDNA, validateImportedJSON } from "./brandValidator";
import { mergeBrandDefaults } from "./brandDefaults";

/**
 * Import result
 */
export interface ImportResult {
  success: boolean;
  brandDNA?: BrandDNA;
  validation?: ValidationResult;
  error?: string;
}

/**
 * Import brand DNA from JSON string
 *
 * @param json - JSON string containing brand DNA
 * @returns Import result with validation
 */
export function importFromJSON(json: string): ImportResult {
  try {
    // Validate JSON structure
    const validation = validateImportedJSON(json);
    if (!validation.valid) {
      return {
        success: false,
        validation,
        error: validation.errors.map((e) => e.message).join(", "),
      };
    }

    // Parse JSON
    const data = JSON.parse(json) as Partial<BrandDNA>;

    // Merge with defaults to ensure all fields are present
    const brandDNA = mergeBrandDefaults(data);

    // Final validation
    const finalValidation = validateBrandDNA(brandDNA);
    if (!finalValidation.valid) {
      return {
        success: false,
        validation: finalValidation,
        error: finalValidation.errors.map((e) => e.message).join(", "),
      };
    }

    return {
      success: true,
      brandDNA,
      validation: finalValidation,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to import brand DNA",
    };
  }
}

/**
 * Import brand DNA from file
 *
 * @param file - JSON file containing brand DNA
 * @returns Promise resolving to import result
 */
export async function importFromFile(file: File): Promise<ImportResult> {
  try {
    // Check file type
    if (!file.name.endsWith(".json")) {
      return {
        success: false,
        error: "Invalid file type. Please upload a JSON file.",
      };
    }

    // Read file
    const text = await file.text();

    // Import from JSON
    return importFromJSON(text);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to read file",
    };
  }
}

/**
 * Import brand DNA from URL
 *
 * @param url - URL to JSON file
 * @returns Promise resolving to import result
 */
export async function importFromURL(url: string): Promise<ImportResult> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.text();
    return importFromJSON(json);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch brand DNA",
    };
  }
}

/**
 * Import brand DNA from shareable link
 *
 * @param encoded - Base64 encoded brand DNA
 * @returns Import result
 */
export function importFromShareableLink(encoded: string): ImportResult {
  try {
    const json = decodeURIComponent(atob(encoded));
    return importFromJSON(json);
  } catch (error) {
    return {
      success: false,
      error: "Invalid shareable link. The link may be corrupted or outdated.",
    };
  }
}

/**
 * Migrate old brand DNA to current version
 *
 * Handles backwards compatibility for older brand DNA versions
 *
 * @param data - Old brand DNA data
 * @returns Migrated brand DNA
 */
export function migrateBrandDNA(data: any): Partial<BrandDNA> {
  // Version 1.0.0 is current, no migration needed yet
  // This function will be used in future versions

  // Example future migration:
  // if (!data.metadata?.version || data.metadata.version < "1.1.0") {
  //   // Migrate from 1.0.0 to 1.1.0
  //   data.newField = "default value";
  // }

  return data;
}

/**
 * Sanitize imported brand DNA
 *
 * Removes potentially dangerous or invalid data
 *
 * @param brandDNA - Brand DNA to sanitize
 * @returns Sanitized brand DNA
 */
export function sanitizeBrandDNA(brandDNA: BrandDNA): BrandDNA {
  // Sanitize metadata
  const sanitized: BrandDNA = {
    ...brandDNA,
    metadata: {
      ...brandDNA.metadata,
      // Remove any script tags or dangerous content from strings
      name: sanitizeString(brandDNA.metadata.name),
      tagline: brandDNA.metadata.tagline
        ? sanitizeString(brandDNA.metadata.tagline)
        : undefined,
      description: brandDNA.metadata.description
        ? sanitizeString(brandDNA.metadata.description)
        : undefined,
    },
    assets: {
      ...brandDNA.assets,
      // Validate image URLs (only data: or https: protocols)
      primaryLogo: brandDNA.assets.primaryLogo
        ? sanitizeLogo(brandDNA.assets.primaryLogo)
        : undefined,
      secondaryLogo: brandDNA.assets.secondaryLogo
        ? sanitizeLogo(brandDNA.assets.secondaryLogo)
        : undefined,
      favicon: brandDNA.assets.favicon
        ? sanitizeLogo(brandDNA.assets.favicon)
        : undefined,
    },
  };

  return sanitized;
}

/**
 * Sanitize string (remove dangerous content)
 */
function sanitizeString(str: string): string {
  return str
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

/**
 * Sanitize logo (validate URLs)
 */
function sanitizeLogo(logo: any): any {
  const sanitized = { ...logo };

  // Validate URLs
  if (logo.lightUrl && !isValidImageURL(logo.lightUrl)) {
    delete sanitized.lightUrl;
  }
  if (logo.darkUrl && !isValidImageURL(logo.darkUrl)) {
    delete sanitized.darkUrl;
  }

  return sanitized;
}

/**
 * Check if URL is valid for images
 */
function isValidImageURL(url: string): boolean {
  // Allow data URLs and HTTPS URLs only
  return url.startsWith("data:image/") || url.startsWith("https://");
}

/**
 * Preview import (validate without applying)
 *
 * @param json - JSON string to preview
 * @returns Preview result with summary
 */
export function previewImport(json: string): {
  valid: boolean;
  summary: {
    brandName: string;
    version: string;
    colors: number;
    fonts: number;
    assets: number;
  };
  warnings: string[];
  errors: string[];
} {
  const result = importFromJSON(json);

  const summary = {
    brandName: "Unknown",
    version: "Unknown",
    colors: 0,
    fonts: 0,
    assets: 0,
  };

  const warnings: string[] = [];
  const errors = result.validation?.errors.map((e) => e.message) || [];

  if (result.brandDNA) {
    const { metadata, colors, typography, assets } = result.brandDNA;

    summary.brandName = metadata.name;
    summary.version = metadata.version;
    summary.colors = Object.keys(colors.light).length;
    summary.fonts = 3; // heading, body, mono
    summary.assets =
      (assets.primaryLogo ? 1 : 0) +
      (assets.secondaryLogo ? 1 : 0) +
      (assets.favicon ? 1 : 0);

    // Check for missing assets
    if (!assets.primaryLogo) {
      warnings.push("No primary logo uploaded");
    }

    // Check font availability
    if (typography.fontHeading.name === typography.fontBody.name) {
      warnings.push("Heading and body fonts are the same");
    }
  }

  return {
    valid: result.success,
    summary,
    warnings,
    errors,
  };
}

/**
 * Compare two brand DNAs and return differences
 *
 * @param current - Current brand DNA
 * @param imported - Imported brand DNA
 * @returns Array of differences
 */
export function compareBrandDNA(
  current: BrandDNA,
  imported: BrandDNA
): Array<{
  field: string;
  current: any;
  imported: any;
}> {
  const differences: Array<{
    field: string;
    current: any;
    imported: any;
  }> = [];

  // Compare colors
  if (current.colors.light.primary !== imported.colors.light.primary) {
    differences.push({
      field: "Primary Color",
      current: current.colors.light.primary,
      imported: imported.colors.light.primary,
    });
  }

  // Compare fonts
  if (current.typography.fontHeading.name !== imported.typography.fontHeading.name) {
    differences.push({
      field: "Heading Font",
      current: current.typography.fontHeading.name,
      imported: imported.typography.fontHeading.name,
    });
  }

  if (current.typography.fontBody.name !== imported.typography.fontBody.name) {
    differences.push({
      field: "Body Font",
      current: current.typography.fontBody.name,
      imported: imported.typography.fontBody.name,
    });
  }

  // Compare metadata
  if (current.metadata.name !== imported.metadata.name) {
    differences.push({
      field: "Brand Name",
      current: current.metadata.name,
      imported: imported.metadata.name,
    });
  }

  return differences;
}
