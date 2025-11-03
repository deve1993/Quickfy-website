/**
 * Brand DNA Exporter
 *
 * Utilities for exporting brand DNA to various formats:
 * - JSON for import/export
 * - CSS variables
 * - Tailwind config
 * - TypeScript types
 */

import type { BrandDNA } from "@/types/brand";
import { generateBrandCSS } from "./brandVariables";

/**
 * Export brand DNA as JSON
 *
 * @param brandDNA - Brand DNA to export
 * @param pretty - Pretty print JSON (default: true)
 * @returns JSON string
 */
export function exportAsJSON(brandDNA: BrandDNA, pretty: boolean = true): string {
  const exportData: import("@/types/brand").BrandDNAExport = {
    ...brandDNA,
    exportedAt: new Date().toISOString(),
    exportVersion: "1.0.0",
  };

  return JSON.stringify(exportData, null, pretty ? 2 : 0);
}

/**
 * Export brand DNA as CSS file
 *
 * @param brandDNA - Brand DNA to export
 * @returns CSS string
 */
export function exportAsCSS(brandDNA: BrandDNA): string {
  const css = generateBrandCSS(brandDNA);

  const header = `/**
 * Brand DNA: ${brandDNA.metadata.name}
 * Generated: ${new Date().toISOString()}
 * Version: ${brandDNA.metadata.version}
 */

`;

  return header + css;
}

/**
 * Export brand DNA as Tailwind config
 *
 * @param brandDNA - Brand DNA to export
 * @returns JavaScript config string
 */
export function exportAsTailwindConfig(brandDNA: BrandDNA): string {
  const { colors, typography, spacing } = brandDNA;

  return `// Brand DNA: ${brandDNA.metadata.name}
// Generated: ${new Date().toISOString()}

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'hsl(${colors.light.primary})',
          secondary: 'hsl(${colors.light.secondary})',
          accent: 'hsl(${colors.light.accent})',
          destructive: 'hsl(${colors.light.destructive})',
          muted: 'hsl(${colors.light.muted})',
        },
        // Chart colors
        chart: {
          1: 'hsl(${colors.chart[0]})',
          2: 'hsl(${colors.chart[1]})',
          3: 'hsl(${colors.chart[2]})',
          4: 'hsl(${colors.chart[3]})',
          5: 'hsl(${colors.chart[4]})',
        },
      },
      fontFamily: {
        heading: ['${typography.fontHeading.name}', ${typography.fontHeading.fallback.map((f) => `'${f}'`).join(", ")}],
        body: ['${typography.fontBody.name}', ${typography.fontBody.fallback.map((f) => `'${f}'`).join(", ")}],
        mono: ['${typography.fontMono.name}', ${typography.fontMono.fallback.map((f) => `'${f}'`).join(", ")}],
      },
      fontSize: ${JSON.stringify(typography.scale, null, 8)},
      borderRadius: ${JSON.stringify(spacing.radius, null, 8)},
      spacing: ${JSON.stringify(spacing.spacing, null, 8)},
    },
  },
};
`;
}

/**
 * Export brand DNA as TypeScript types
 *
 * @param brandDNA - Brand DNA to export
 * @returns TypeScript string
 */
export function exportAsTypeScript(brandDNA: BrandDNA): string {
  return `// Brand DNA: ${brandDNA.metadata.name}
// Generated: ${new Date().toISOString()}

export const brandColors = {
  light: ${JSON.stringify(brandDNA.colors.light, null, 2)},
  dark: ${JSON.stringify(brandDNA.colors.dark, null, 2)},
  chart: ${JSON.stringify(brandDNA.colors.chart, null, 2)},
} as const;

export const brandTypography = ${JSON.stringify(brandDNA.typography, null, 2)} as const;

export const brandSpacing = ${JSON.stringify(brandDNA.spacing, null, 2)} as const;

export const brandMetadata = ${JSON.stringify(brandDNA.metadata, null, 2)} as const;
`;
}

/**
 * Export format types
 */
export type ExportFormat = "json" | "css" | "tailwind" | "typescript";

/**
 * Export brand DNA in specified format
 *
 * @param brandDNA - Brand DNA to export
 * @param format - Export format
 * @returns Exported string
 */
export function exportBrand(brandDNA: BrandDNA, format: ExportFormat): string {
  switch (format) {
    case "json":
      return exportAsJSON(brandDNA);
    case "css":
      return exportAsCSS(brandDNA);
    case "tailwind":
      return exportAsTailwindConfig(brandDNA);
    case "typescript":
      return exportAsTypeScript(brandDNA);
    default:
      throw new Error(`Unknown export format: ${format}`);
  }
}

/**
 * Download brand DNA as file
 *
 * @param brandDNA - Brand DNA to export
 * @param format - Export format
 * @param filename - Optional custom filename
 */
export function downloadBrand(
  brandDNA: BrandDNA,
  format: ExportFormat,
  filename?: string
): void {
  const content = exportBrand(brandDNA, format);

  // Determine file extension
  const extensions: Record<ExportFormat, string> = {
    json: "json",
    css: "css",
    tailwind: "js",
    typescript: "ts",
  };

  const ext = extensions[format];
  const defaultFilename = `${brandDNA.metadata.name.toLowerCase().replace(/\s+/g, "-")}-brand.${ext}`;
  const finalFilename = filename || defaultFilename;

  // Create blob and download
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = finalFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Copy brand DNA to clipboard
 *
 * @param brandDNA - Brand DNA to copy
 * @param format - Export format
 * @returns Promise that resolves when copied
 */
export async function copyBrandToClipboard(
  brandDNA: BrandDNA,
  format: ExportFormat
): Promise<void> {
  const content = exportBrand(brandDNA, format);

  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

/**
 * Export summary with file sizes
 *
 * @param brandDNA - Brand DNA to analyze
 * @returns Export summary
 */
export function getExportSummary(brandDNA: BrandDNA): Record<
  ExportFormat,
  {
    size: number;
    sizeFormatted: string;
    lines: number;
  }
> {
  const formats: ExportFormat[] = ["json", "css", "tailwind", "typescript"];

  const summary: any = {};

  formats.forEach((format) => {
    const content = exportBrand(brandDNA, format);
    const size = new Blob([content]).size;
    const lines = content.split("\n").length;

    summary[format] = {
      size,
      sizeFormatted: formatBytes(size),
      lines,
    };
  });

  return summary;
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Generate shareable link (base64 encoded JSON)
 *
 * @param brandDNA - Brand DNA to share
 * @returns Shareable URL parameter
 */
export function generateShareableLink(brandDNA: BrandDNA): string {
  const json = exportAsJSON(brandDNA, false);
  const encoded = btoa(encodeURIComponent(json));
  return encoded;
}

/**
 * Parse shareable link
 *
 * @param encoded - Base64 encoded brand DNA
 * @returns Parsed brand DNA
 */
export function parseShareableLink(encoded: string): BrandDNA {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch (error) {
    throw new Error("Invalid shareable link");
  }
}
