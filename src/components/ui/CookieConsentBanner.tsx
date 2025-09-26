'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Cookie, Settings, Shield, BarChart3, Target } from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { CookiePreferencesModal } from './CookiePreferencesModal';

export const CookieConsentBanner: React.FC = () => {
  const t = useTranslations();
  const { showBanner, acceptAll, rejectAll, closeBanner } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  if (!showBanner) return null;

  const handleManagePreferences = () => {
    setShowPreferences(true);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={closeBanner}
            />

            {/* Cookie Banner */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-6 md:right-6 md:max-w-2xl md:mx-auto"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-none md:rounded-2xl p-6 md:p-8">
                {/* Close button for desktop */}
                <button
                  onClick={closeBanner}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  aria-label={t('cookieConsent.close')}
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl">
                    <Cookie className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {t('cookieConsent.title')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('cookieConsent.description')}
                    </p>
                  </div>
                </div>

                {/* Cookie Categories Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <Shield size={16} className="text-green-600" />
                    <span className="text-xs font-medium text-green-800">
                      {t('cookieConsent.categories.necessary')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <BarChart3 size={16} className="text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">
                      {t('cookieConsent.categories.analytics')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                    <Target size={16} className="text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">
                      {t('cookieConsent.categories.marketing')}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 text-sm"
                  >
                    {t('cookieConsent.acceptAll')}
                  </button>
                  
                  <button
                    onClick={rejectAll}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200 text-sm"
                  >
                    {t('cookieConsent.rejectAll')}
                  </button>
                  
                  <button
                    onClick={handleManagePreferences}
                    className="flex-1 sm:flex-initial bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    {t('cookieConsent.managePreferences')}
                  </button>
                </div>

                {/* Legal Links */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {t('cookieConsent.legalNotice')}{' '}
                    <a
                      href={`/${t('meta.locale')}/privacy-policy`}
                      className="text-blue-600 hover:text-blue-800 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('footer.links.privacy')}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        isOpen={showPreferences}
        onClose={handleClosePreferences}
      />
    </>
  );
};