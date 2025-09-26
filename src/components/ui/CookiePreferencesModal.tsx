'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  X, 
  Shield, 
  BarChart3, 
  Target, 
  User, 
  Check, 
  Info,
  Clock,
  Globe
} from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { CookieConsent } from '@/types/cookies';
import { COOKIE_DEFINITIONS } from '@/types/cookies';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const t = useTranslations();
  const { consentState, updateConsent } = useCookieConsent();
  
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Initialize preferences from current consent state
  useEffect(() => {
    setPreferences(consentState.consent);
  }, [consentState.consent, isOpen]);

  const handleToggle = (category: keyof CookieConsent) => {
    if (category === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSavePreferences = () => {
    updateConsent(preferences);
    onClose();
  };

  const handleAcceptAll = () => {
    const allEnabled: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allEnabled);
    updateConsent(allEnabled);
    onClose();
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(onlyNecessary);
    updateConsent(onlyNecessary);
    onClose();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'necessary': return <Shield size={20} className="text-green-600" />;
      case 'analytics': return <BarChart3 size={20} className="text-blue-600" />;
      case 'marketing': return <Target size={20} className="text-purple-600" />;
      case 'preferences': return <User size={20} className="text-orange-600" />;
      default: return <Info size={20} className="text-gray-600" />;
    }
  };


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('cookieConsent.preferences.title')}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {t('cookieConsent.preferences.subtitle')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              aria-label={t('cookieConsent.close')}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="p-6 space-y-6">
              {/* Introduction */}
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  {t('cookieConsent.preferences.introduction')}
                </p>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon('necessary')}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {t('cookieConsent.categories.necessary')}
                        </h3>
                        <p className="text-sm text-green-600">
                          {t('cookieConsent.categories.alwaysEnabled')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-6 bg-green-500 rounded-full">
                      <Check size={14} className="text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('cookieConsent.categories.necessaryDescription')}
                  </p>
                  
                  {/* Cookie Details */}
                  <div className="space-y-2">
                    {COOKIE_DEFINITIONS
                      .filter(cookie => cookie.category === 'necessary')
                      .map(cookie => (
                        <div key={cookie.name} className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cookie.name}</span>
                            <span>•</span>
                            <span>{cookie.purpose}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{cookie.duration}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon('analytics')}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {t('cookieConsent.categories.analytics')}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {t('cookieConsent.categories.optional')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('analytics')}
                      className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors ${
                        preferences.analytics ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.analytics ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('cookieConsent.categories.analyticsDescription')}
                  </p>
                  
                  {/* Cookie Details */}
                  <div className="space-y-2">
                    {COOKIE_DEFINITIONS
                      .filter(cookie => cookie.category === 'analytics')
                      .map(cookie => (
                        <div key={cookie.name} className="flex items-center justify-between text-xs text-gray-500 bg-blue-50 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cookie.name}</span>
                            <span>•</span>
                            <span>{cookie.purpose}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe size={12} />
                            <span>{cookie.provider}</span>
                            <Clock size={12} />
                            <span>{cookie.duration}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon('marketing')}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {t('cookieConsent.categories.marketing')}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {t('cookieConsent.categories.optional')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('marketing')}
                      className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors ${
                        preferences.marketing ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.marketing ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('cookieConsent.categories.marketingDescription')}
                  </p>
                  
                  {/* Cookie Details */}
                  <div className="space-y-2">
                    {COOKIE_DEFINITIONS
                      .filter(cookie => cookie.category === 'marketing')
                      .map(cookie => (
                        <div key={cookie.name} className="flex items-center justify-between text-xs text-gray-500 bg-purple-50 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cookie.name}</span>
                            <span>•</span>
                            <span>{cookie.purpose}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe size={12} />
                            <span>{cookie.provider}</span>
                            <Clock size={12} />
                            <span>{cookie.duration}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Preferences Cookies */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon('preferences')}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {t('cookieConsent.categories.preferences')}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {t('cookieConsent.categories.optional')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('preferences')}
                      className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors ${
                        preferences.preferences ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.preferences ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('cookieConsent.categories.preferencesDescription')}
                  </p>
                  
                  {/* Cookie Details */}
                  <div className="space-y-2">
                    {COOKIE_DEFINITIONS
                      .filter(cookie => cookie.category === 'preferences')
                      .map(cookie => (
                        <div key={cookie.name} className="flex items-center justify-between text-xs text-gray-500 bg-orange-50 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cookie.name}</span>
                            <span>•</span>
                            <span>{cookie.purpose}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe size={12} />
                            <span>{cookie.provider}</span>
                            <Clock size={12} />
                            <span>{cookie.duration}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
              >
                {t('cookieConsent.acceptAll')}
              </button>
              
              <button
                onClick={handleSavePreferences}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
              >
                {t('cookieConsent.savePreferences')}
              </button>
              
              <button
                onClick={handleRejectAll}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200"
              >
                {t('cookieConsent.rejectAll')}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};