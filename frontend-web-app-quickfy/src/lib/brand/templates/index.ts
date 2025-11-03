/**
 * Brand DNA Templates
 *
 * Pre-configured brand identity templates for quick start.
 */

import type { BrandTemplate } from "@/types/brand";
import { defaultTemplate } from "./default";
import { minimalTemplate } from "./minimal";
import { vibrantTemplate } from "./vibrant";
import { professionalTemplate } from "./professional";
import { creativeTemplate } from "./creative";

/**
 * All available templates
 */
export const BRAND_TEMPLATES: BrandTemplate[] = [
  defaultTemplate,
  minimalTemplate,
  vibrantTemplate,
  professionalTemplate,
  creativeTemplate,
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): BrandTemplate | undefined {
  return BRAND_TEMPLATES.find((template) => template.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(
  category: BrandTemplate["category"]
): BrandTemplate[] {
  return BRAND_TEMPLATES.filter((template) => template.category === category);
}

export { defaultTemplate, minimalTemplate, vibrantTemplate, professionalTemplate, creativeTemplate };
