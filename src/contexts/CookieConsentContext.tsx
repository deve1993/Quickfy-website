'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CookieConsentState, CookieConsent, DEFAULT_CONSENT } from '@/types/cookies';
import { CookieManager } from '@/utils/cookieManager';

interface CookieConsentContextType {
  consentState: CookieConsentState;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  resetConsent: () => void;
  closeBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
  const [consentState, setConsentState] = useState<CookieConsentState>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize consent state on mount
  useEffect(() => {
    setMounted(true);
    const savedConsent = CookieManager.loadConsent();
    setConsentState(savedConsent);

    // Show banner immediately if user hasn't consented yet
    if (!savedConsent.hasConsented) {
      setShowBanner(true);
    }
  }, []);

  // Also show banner on scroll if not consented
  useEffect(() => {
    if (consentState.hasConsented || showBanner) return;

    let hasScrolled = false;
    const handleScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        setShowBanner(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [consentState.hasConsented, showBanner]);

  const acceptAll = () => {
    const allConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    CookieManager.saveConsent(allConsent);
    setConsentState({
      hasConsented: true,
      consent: allConsent,
      consentDate: new Date(),
      consentVersion: '1.0.0',
    });
    setShowBanner(false);

    // Track consent acceptance for analytics
    if (typeof window !== 'undefined' && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'accept_all',
        value: 1,
      });
    }
  };

  const rejectAll = () => {
    const minimalConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    CookieManager.saveConsent(minimalConsent);
    setConsentState({
      hasConsented: true,
      consent: minimalConsent,
      consentDate: new Date(),
      consentVersion: '1.0.0',
    });
    setShowBanner(false);

    // Track consent rejection for analytics (if previously enabled)
    if (typeof window !== 'undefined' && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'reject_all',
        value: 0,
      });
    }
  };

  const updateConsent = (partialConsent: Partial<CookieConsent>) => {
    const updatedConsent: CookieConsent = {
      ...consentState.consent,
      ...partialConsent,
      necessary: true, // Always required
    };

    CookieManager.saveConsent(updatedConsent);
    setConsentState({
      hasConsented: true,
      consent: updatedConsent,
      consentDate: new Date(),
      consentVersion: '1.0.0',
    });
    setShowBanner(false);

    // Track custom consent for analytics
    if (typeof window !== 'undefined' && (window as { gtag?: (...args: unknown[]) => void }).gtag && updatedConsent.analytics) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'custom_settings',
        value: Object.values(updatedConsent).filter(Boolean).length,
      });
    }
  };

  const resetConsent = () => {
    CookieManager.clearConsent();
    setConsentState(DEFAULT_CONSENT);
    setShowBanner(true);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  // Don't render anything on server-side
  if (!mounted) {
    return <>{children}</>;
  }

  const contextValue: CookieConsentContextType = {
    consentState,
    showBanner,
    acceptAll,
    rejectAll,
    updateConsent,
    resetConsent,
    closeBanner,
  };

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
};