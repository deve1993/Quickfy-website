/**
 * Google Analytics 4 Event Tracking Helpers
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'consent' | 'js',
      targetOrAction: string | Date,
      parameters?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, formData?: Record<string, unknown>): void {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData
  });
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, location?: string): void {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || 'unknown'
  });
}

/**
 * Track CTA interaction
 */
export function trackCTA(ctaName: string, ctaLocation: string): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation
  });
}

/**
 * Track pricing plan selection
 */
export function trackPricingPlan(planName: string, price: string): void {
  trackEvent('select_plan', {
    plan_name: planName,
    plan_price: price,
    currency: 'EUR'
  });
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(location: string): void {
  trackEvent('newsletter_signup', {
    location
  });
}

/**
 * Track page view (for SPA navigation)
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
}

/**
 * Update user consent for analytics
 */
export function updateConsent(granted: boolean): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied'
    } as never);
  }
}
