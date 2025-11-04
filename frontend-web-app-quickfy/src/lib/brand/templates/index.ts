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
import { startupTemplate } from "./startup";
import { organicTemplate } from "./organic";

/**
 * All available templates
 */
export const BRAND_TEMPLATES: BrandTemplate[] = [
  defaultTemplate,
  professionalTemplate,
  startupTemplate,
  organicTemplate,
  minimalTemplate,
  vibrantTemplate,
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

export {
  defaultTemplate,
  minimalTemplate,
  vibrantTemplate,
  professionalTemplate,
  creativeTemplate,
  startupTemplate,
  organicTemplate
};
