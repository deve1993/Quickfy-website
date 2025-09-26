// Cookie management utilities for GDPR compliance

import { 
  CookieConsentState, 
  CookieConsent, 
  DEFAULT_CONSENT, 
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_DURATION_DAYS 
} from '@/types/cookies';

/**
 * Cookie management class for GDPR compliance
 */
export class CookieManager {
  private static readonly STORAGE_KEY = CONSENT_STORAGE_KEY;

  /**
   * Load consent state from localStorage
   */
  static loadConsent(): CookieConsentState {
    if (typeof window === 'undefined') {
      return DEFAULT_CONSENT;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return DEFAULT_CONSENT;
      }

      const parsed = JSON.parse(stored) as CookieConsentState;
      
      // Check if consent is still valid (not expired)
      if (!this.isConsentValid(parsed)) {
        this.clearConsent();
        return DEFAULT_CONSENT;
      }

      return parsed;
    } catch {
      // Handle cookie consent loading error
      return DEFAULT_CONSENT;
    }
  }

  /**
   * Save consent state to localStorage
   */
  static saveConsent(consent: CookieConsent): void {
    if (typeof window === 'undefined') return;

    const consentState: CookieConsentState = {
      hasConsented: true,
      consent,
      consentDate: new Date(),
      consentVersion: CONSENT_VERSION,
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consentState));
      this.applyCookieConsent(consent);
    } catch {
      // Handle cookie consent saving error
    }
  }

  /**
   * Clear all consent data
   */
  static clearConsent(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this.clearAllCookies();
    } catch {
      // Handle cookie consent clearing error
    }
  }

  /**
   * Check if consent is still valid (not expired and same version)
   */
  private static isConsentValid(consent: CookieConsentState): boolean {
    if (!consent.consentDate || consent.consentVersion !== CONSENT_VERSION) {
      return false;
    }

    const expirationDate = new Date(consent.consentDate);
    expirationDate.setDate(expirationDate.getDate() + CONSENT_DURATION_DAYS);

    return new Date() < expirationDate;
  }

  /**
   * Apply cookie consent by enabling/disabling tracking
   */
  private static applyCookieConsent(consent: CookieConsent): void {
    // Analytics consent
    if (consent.analytics) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }

    // Marketing consent
    if (consent.marketing) {
      this.enableMarketing();
    } else {
      this.disableMarketing();
    }

    // Preferences consent
    if (consent.preferences) {
      this.enablePreferences();
    } else {
      this.disablePreferences();
    }
  }

  /**
   * Enable Google Analytics tracking
   */
  private static enableAnalytics(): void {
    if (typeof window === 'undefined') return;

    // Enable Google Analytics
    (window as { gtag?: (...args: unknown[]) => void }).gtag?.('consent', 'update', {
      analytics_storage: 'granted',
    });

    // Initialize GA4 if not already done
    if (!(window as { gtag?: (...args: unknown[]) => void }).gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      (window as { dataLayer?: unknown[] }).dataLayer = (window as { dataLayer?: unknown[] }).dataLayer || [];
      function gtag(...args: unknown[]) {
        (window as { dataLayer?: unknown[] }).dataLayer?.push(args);
      }
      (window as { gtag?: (...args: unknown[]) => void }).gtag = gtag;

      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        send_page_view: true,
        anonymize_ip: true, // GDPR compliance
      });
    }
  }

  /**
   * Disable Google Analytics tracking
   */
  private static disableAnalytics(): void {
    if (typeof window === 'undefined') return;

    // Disable Google Analytics
    (window as { gtag?: (...args: unknown[]) => void }).gtag?.('consent', 'update', {
      analytics_storage: 'denied',
    });

    // Clear GA cookies
    this.deleteCookie('_ga');
    this.deleteCookie('_ga_*');
    this.deleteCookie('_gid');
    this.deleteCookie('_gat');
  }

  /**
   * Enable marketing cookies
   */
  private static enableMarketing(): void {
    if (typeof window === 'undefined') return;

    (window as { gtag?: (...args: unknown[]) => void }).gtag?.('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  }

  /**
   * Disable marketing cookies
   */
  private static disableMarketing(): void {
    if (typeof window === 'undefined') return;

    (window as { gtag?: (...args: unknown[]) => void }).gtag?.('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    // Clear marketing cookies
    this.deleteCookie('quickfy-marketing-opt');
  }

  /**
   * Enable preferences cookies
   */
  private static enablePreferences(): void {
    // Preferences are enabled by default as they improve user experience
  }

  /**
   * Disable preferences cookies
   */
  private static disablePreferences(): void {
    // Clear preferences cookies
    this.deleteCookie('quickfy-theme');
    this.deleteCookie('quickfy-dashboard-settings');
  }

  /**
   * Delete a specific cookie
   */
  private static deleteCookie(name: string): void {
    if (typeof window === 'undefined') return;

    const domains = [window.location.hostname, `.${window.location.hostname}`];
    const paths = ['/', window.location.pathname];

    domains.forEach(domain => {
      paths.forEach(path => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=${path}`;
      });
    });
  }

  /**
   * Clear all non-necessary cookies
   */
  private static clearAllCookies(): void {
    if (typeof window === 'undefined') return;

    // Get all cookies
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      
      // Don't delete necessary cookies
      if (!this.isNecessaryCookie(name)) {
        this.deleteCookie(name);
      }
    });
  }

  /**
   * Check if a cookie is necessary for website functionality
   */
  private static isNecessaryCookie(name: string): boolean {
    const necessaryCookies = [
      'quickfy-locale',
      'quickfy-consent',
      'quickfy-session',
      'next-auth.session-token',
      'next-auth.csrf-token',
    ];

    return necessaryCookies.some(necessary => name.startsWith(necessary));
  }

  /**
   * Get consent status for reporting
   */
  static getConsentReport(): {
    hasConsented: boolean;
    consentDate: string | null;
    categories: Record<string, boolean>;
    version: string;
  } {
    const state = this.loadConsent();
    
    return {
      hasConsented: state.hasConsented,
      consentDate: state.consentDate?.toISOString() || null,
      categories: {
        necessary: state.consent.necessary,
        analytics: state.consent.analytics,
        marketing: state.consent.marketing,
        preferences: state.consent.preferences,
      },
      version: state.consentVersion,
    };
  }
}