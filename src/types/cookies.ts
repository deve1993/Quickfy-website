// Cookie consent types for QuickFy GDPR compliance

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsentState {
  hasConsented: boolean;
  consent: CookieConsent;
  consentDate: Date | null;
  consentVersion: string;
}

export type CookieCategory = keyof CookieConsent;

export interface CookieInfo {
  name: string;
  category: CookieCategory;
  purpose: string;
  duration: string;
  provider?: string;
  required: boolean;
}

// Default consent state
export const DEFAULT_CONSENT: CookieConsentState = {
  hasConsented: false,
  consent: {
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  },
  consentDate: null,
  consentVersion: '1.0.0',
};

// Cookie definitions for the application
export const COOKIE_DEFINITIONS: CookieInfo[] = [
  // Necessary cookies
  {
    name: 'quickfy-locale',
    category: 'necessary',
    purpose: 'Stores user language preference for internationalization',
    duration: '1 year',
    provider: 'QuickFy',
    required: true,
  },
  {
    name: 'quickfy-consent',
    category: 'necessary',
    purpose: 'Stores cookie consent preferences',
    duration: '1 year',
    provider: 'QuickFy',
    required: true,
  },
  {
    name: 'quickfy-session',
    category: 'necessary',
    purpose: 'Essential for website functionality and security',
    duration: 'Session',
    provider: 'QuickFy',
    required: true,
  },

  // Analytics cookies
  {
    name: '_ga',
    category: 'analytics',
    purpose: 'Google Analytics tracking for website performance analysis',
    duration: '2 years',
    provider: 'Google',
    required: false,
  },
  {
    name: '_ga_*',
    category: 'analytics',
    purpose: 'Google Analytics 4 property-specific tracking',
    duration: '2 years',
    provider: 'Google',
    required: false,
  },
  {
    name: '_gid',
    category: 'analytics',
    purpose: 'Google Analytics visitor identification',
    duration: '24 hours',
    provider: 'Google',
    required: false,
  },

  // Preferences cookies
  {
    name: 'quickfy-theme',
    category: 'preferences',
    purpose: 'Remembers user interface preferences',
    duration: '6 months',
    provider: 'QuickFy',
    required: false,
  },
  {
    name: 'quickfy-dashboard-settings',
    category: 'preferences',
    purpose: 'Stores personalized dashboard configurations',
    duration: '1 year',
    provider: 'QuickFy',
    required: false,
  },

  // Marketing cookies (for future use)
  {
    name: 'quickfy-marketing-opt',
    category: 'marketing',
    purpose: 'Tracks marketing campaign effectiveness',
    duration: '6 months',
    provider: 'QuickFy',
    required: false,
  },
];

// GDPR compliance constants
export const CONSENT_VERSION = '1.0.0';
export const CONSENT_DURATION_DAYS = 365; // 1 year
export const CONSENT_STORAGE_KEY = 'quickfy-cookie-consent';