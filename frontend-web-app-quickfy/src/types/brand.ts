/**
 * Brand DNA Type Definitions
 *
 * Complete type system for managing company brand identity including
 * colors, typography, spacing, assets, and style information.
 */

/**
 * HSL Color Value
 * Format: "hue saturation% lightness%"
 * Example: "221.2 83.2% 53.3%"
 */
export type ColorValue = string;

/**
 * Color Palette with semantic naming
 */
export interface ColorPalette {
  /** Primary brand color */
  primary: ColorValue;
  /** Secondary brand color */
  secondary: ColorValue;
  /** Accent color for highlights */
  accent: ColorValue;
  /** Destructive/error color */
  destructive: ColorValue;
  /** Muted/subtle elements */
  muted: ColorValue;
  /** Background color */
  background: ColorValue;
  /** Foreground/text color */
  foreground: ColorValue;
  /** Card background */
  card: ColorValue;
  /** Border color */
  border: ColorValue;
  /** Input border */
  input: ColorValue;
  /** Ring/focus color */
  ring: ColorValue;
}

/**
 * Color palette for both light and dark themes
 */
export interface BrandColors {
  /** Light mode colors */
  light: ColorPalette;
  /** Dark mode colors */
  dark: ColorPalette;
  /** Chart colors (5 colors for data visualization) */
  chart: [ColorValue, ColorValue, ColorValue, ColorValue, ColorValue];
}

/**
 * Font family configuration
 */
export interface FontFamily {
  /** Font name (e.g., "Inter", "Roboto") */
  name: string;
  /** Font weight variants available */
  weights: number[];
  /** Font style variants (normal, italic) */
  styles: string[];
  /** Google Fonts URL for loading */
  url?: string;
  /** Fallback fonts */
  fallback: string[];
}

/**
 * Typography scale configuration
 */
export interface TypographyScale {
  /** Extra small text size */
  xs: string;
  /** Small text size */
  sm: string;
  /** Base/normal text size */
  base: string;
  /** Large text size */
  lg: string;
  /** Extra large text size */
  xl: string;
  /** 2XL heading size */
  "2xl": string;
  /** 3XL heading size */
  "3xl": string;
  /** 4XL heading size */
  "4xl": string;
  /** 5XL heading size */
  "5xl": string;
  /** 6XL heading size */
  "6xl": string;
  /** 7XL display size */
  "7xl": string;
  /** 8XL display size */
  "8xl": string;
  /** 9XL display size */
  "9xl": string;
}

/**
 * Complete typography system
 */
export interface BrandTypography {
  /** Primary font for headings */
  fontHeading: FontFamily;
  /** Body text font */
  fontBody: FontFamily;
  /** Monospace font for code */
  fontMono: FontFamily;
  /** Font size scale */
  scale: TypographyScale;
  /** Line height multiplier */
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  /** Letter spacing */
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

/**
 * Spacing and sizing system
 */
export interface BrandSpacing {
  /** Border radius values */
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    full: string;
  };
  /** Spacing scale (in rem) */
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
}

/**
 * Logo configuration
 */
export interface Logo {
  /** Logo ID */
  id: string;
  /** Logo name/description */
  name: string;
  /** Light theme logo URL (base64 or external URL) */
  lightUrl: string;
  /** Dark theme logo URL (base64 or external URL) */
  darkUrl: string;
  /** Logo width (for sizing) */
  width?: number;
  /** Logo height (for sizing) */
  height?: number;
  /** File size in bytes */
  fileSize?: number;
  /** Upload timestamp */
  uploadedAt?: string;
}

/**
 * Brand assets (logos, images)
 */
export interface BrandAssets {
  /** Primary logo */
  primaryLogo?: Logo;
  /** Secondary/alternate logo */
  secondaryLogo?: Logo;
  /** Favicon */
  favicon?: Logo;
  /** Additional brand assets */
  additionalAssets: Logo[];
}

/**
 * Brand metadata
 */
export interface BrandMetadata {
  /** Brand name */
  name: string;
  /** Brand tagline/slogan */
  tagline?: string;
  /** Brand description */
  description?: string;
  /** Industry/sector */
  industry?: string;
  /** Creation date */
  createdAt: string;
  /** Last modified date */
  updatedAt: string;
  /** Version number */
  version: string;
}

/**
 * Brand Value (company core values)
 */
export interface BrandValue {
  /** Unique identifier */
  id: string;
  /** Value name (e.g., "Semplicità", "Innovazione") */
  name: string;
  /** Value description */
  description: string;
  /** Optional icon name or emoji */
  icon?: string;
}

/**
 * Tone of Voice configuration
 */
export interface ToneOfVoice {
  /** Personality traits (e.g., ["Amichevole", "Professionale", "Diretto"]) */
  traits: string[];
  /** Overall tone description */
  description?: string;
  /** Communication guidelines - what to do */
  dos?: string[];
  /** Communication guidelines - what to avoid */
  donts?: string[];
}

/**
 * Strategic Brand DNA (the soul of the brand)
 */
export interface BrandStrategy {
  /** Purpose - Why the company exists */
  purpose?: string;
  /** Vision - Where the company is heading */
  vision?: string;
  /** Mission - What the company does daily */
  mission?: string;
  /** Core company values (3-5 recommended) */
  values: BrandValue[];
  /** Tone of voice and communication style */
  toneOfVoice: ToneOfVoice;
  /** Optional: market positioning statement */
  positioning?: string;
  /** Optional: target audience description */
  targetAudience?: string;
  /** Optional: key differentiators */
  differentiators?: string[];
}

/**
 * Complete Brand DNA Configuration
 *
 * This is the main type representing the entire brand identity system.
 */
export interface BrandDNA {
  /** Brand metadata */
  metadata: BrandMetadata;
  /** Strategic brand DNA (purpose, vision, mission, values, tone) */
  strategy?: BrandStrategy;
  /** Color system */
  colors: BrandColors;
  /** Typography system */
  typography: BrandTypography;
  /** Spacing and sizing */
  spacing: BrandSpacing;
  /** Brand assets (logos, images) */
  assets: BrandAssets;
}

/**
 * Brand DNA export format
 */
export interface BrandDNAExport extends BrandDNA {
  /** Export timestamp */
  exportedAt: string;
  /** Export format version */
  exportVersion: string;
}

/**
 * Brand template (pre-configured brand DNA)
 */
export interface BrandTemplate {
  /** Template ID */
  id: string;
  /** Template name */
  name: string;
  /** Template description */
  description: string;
  /** Template category */
  category: "minimal" | "vibrant" | "professional" | "creative" | "default";
  /** Preview thumbnail URL */
  thumbnail?: string;
  /** Brand DNA configuration */
  brandDNA: BrandDNA;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Is valid */
  valid: boolean;
  /** Validation errors */
  errors: ValidationError[];
}

/**
 * Validation error
 */
export interface ValidationError {
  /** Field path (e.g., "colors.light.primary") */
  field: string;
  /** Error message */
  message: string;
  /** Error code */
  code: string;
}

/**
 * Color contrast result (WCAG compliance)
 */
export interface ContrastResult {
  /** Contrast ratio */
  ratio: number;
  /** AA compliance (4.5:1 for normal text) */
  aa: boolean;
  /** AAA compliance (7:1 for normal text) */
  aaa: boolean;
  /** AA Large compliance (3:1 for large text) */
  aaLarge: boolean;
  /** AAA Large compliance (4.5:1 for large text) */
  aaaLarge: boolean;
}

/**
 * Brand store state
 */
export interface BrandState {
  /** Current brand DNA configuration */
  brandDNA: BrandDNA | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
  /** Has unsaved changes */
  hasUnsavedChanges: boolean;
}

/**
 * Brand store actions
 */
export interface BrandActions {
  /** Set complete brand DNA */
  setBrand: (brandDNA: BrandDNA) => void;
  /** Update colors */
  updateColors: (colors: Partial<BrandColors>) => void;
  /** Update typography */
  updateTypography: (typography: Partial<BrandTypography>) => void;
  /** Update spacing */
  updateSpacing: (spacing: Partial<BrandSpacing>) => void;
  /** Update assets */
  updateAssets: (assets: Partial<BrandAssets>) => void;
  /** Update metadata */
  updateMetadata: (metadata: Partial<BrandMetadata>) => void;
  /** Update strategy */
  updateStrategy: (strategy: Partial<BrandStrategy>) => void;
  /** Add a brand value */
  addValue: (value: BrandValue) => void;
  /** Remove a brand value */
  removeValue: (valueId: string) => void;
  /** Update a brand value */
  updateValue: (valueId: string, value: Partial<BrandValue>) => void;
  /** Update tone of voice */
  updateToneOfVoice: (tone: Partial<ToneOfVoice>) => void;
  /** Reset to default brand */
  reset: () => void;
  /** Load brand from storage */
  loadBrand: () => Promise<void>;
  /** Save brand to storage */
  saveBrand: () => Promise<void>;
  /** Import brand from JSON */
  importBrand: (json: string) => Promise<ValidationResult>;
  /** Export brand to JSON */
  exportBrand: () => string;
  /** Apply brand theme to DOM */
  applyTheme: () => void;
  /** Mark changes as saved */
  markAsSaved: () => void;
}
