import { z } from "zod";

// ============================================
// GOOGLE ANALYTICS VALIDATIONS
// ============================================

export const googleAnalyticsSchema = z.object({
  connected: z.boolean(),

  trackingId: z.string()
    .regex(/^G-[A-Z0-9]{10}$/, 'Formato ID GA4 non valido (es. G-XXXXXXXXXX)')
    .optional()
    .or(z.literal('')),

  propertyId: z.string()
    .regex(/^[0-9]{9}$/, 'Formato Property ID non valido (9 cifre)')
    .optional()
    .or(z.literal('')),
});

// ============================================
// GOOGLE ADS VALIDATIONS
// ============================================

export const googleAdsSchema = z.object({
  connected: z.boolean(),

  customerId: z.string()
    .regex(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, 'Formato Customer ID non valido (es. 123-456-7890)')
    .optional()
    .or(z.literal('')),

  conversionId: z.string()
    .regex(/^AW-[0-9]{9,11}$/, 'Formato Conversion ID non valido (es. AW-123456789)')
    .optional()
    .or(z.literal('')),

  conversionLabel: z.string()
    .min(1, 'Label conversione richiesta se connesso')
    .max(100, 'Label conversione troppo lunga')
    .optional()
    .or(z.literal('')),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type GoogleAnalyticsInput = z.infer<typeof googleAnalyticsSchema>;
export type GoogleAdsInput = z.infer<typeof googleAdsSchema>;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Valida formato Google Analytics GA4 Tracking ID
 */
export function isValidGA4TrackingId(id: string): boolean {
  return /^G-[A-Z0-9]{10}$/.test(id);
}

/**
 * Valida formato Google Ads Customer ID
 */
export function isValidGoogleAdsCustomerId(id: string): boolean {
  return /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(id);
}

/**
 * Valida formato Google Ads Conversion ID
 */
export function isValidGoogleAdsConversionId(id: string): boolean {
  return /^AW-[0-9]{9,11}$/.test(id);
}

/**
 * Formatta Google Ads Customer ID (rimuove trattini se presenti)
 */
export function formatGoogleAdsCustomerId(id: string): string {
  const cleaned = id.replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return id;
}
