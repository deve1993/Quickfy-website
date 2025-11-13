/**
 * Partner logo configuration types
 */
export interface PartnerLogo {
  /** Unique identifier for the partner */
  id: string;
  /** Display name of the partner company */
  name: string;
  /** Path to the logo file (relative to /public) */
  logoPath: string;
  /** Logo width in pixels for display consistency */
  width: number;
  /** Logo height in pixels for display consistency */
  height: number;
  /** Optional website URL for the partner */
  website?: string;
  /** Optional alternative text for accessibility */
  alt?: string;
  /** Whether the logo should be displayed (for easy enable/disable) */
  enabled: boolean;
  /** Display order/priority (lower numbers appear first) */
  order: number;
}

/**
 * Partner logos configuration structure
 */
export interface PartnersConfig {
  /** Array of partner logos */
  logos: PartnerLogo[];
  /** Animation settings for the logos section */
  animation: {
    /** Duration of one complete scroll cycle in seconds */
    scrollDuration: number;
    /** Whether animation should be enabled */
    enabled: boolean;
  };
  /** Display settings */
  display: {
    /** Gap between logos in the carousel */
    gap: string;
    /** Whether to show hover effects */
    showHoverEffects: boolean;
  };
}