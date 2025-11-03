import type { BrandTemplate } from "@/types/brand";
import { getDefaultBrand } from "../brandDefaults";

export const defaultTemplate: BrandTemplate = {
  id: "default",
  name: "Quickfy Default",
  description: "Modern and professional design with blue primary color",
  category: "default",
  brandDNA: getDefaultBrand(),
};
