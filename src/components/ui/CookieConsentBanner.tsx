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
              <div className="relative overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-blue-500/10 rounded-none md:rounded-3xl p-6 md:p-8">
                {/* Ambient gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-purple-50/40 pointer-events-none" />
                {/* Close button for desktop */}
                <button
                  onClick={closeBanner}
                  className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-600 transition-all duration-200 rounded-full hover:bg-white/50 backdrop-blur-sm"
                  aria-label={t('cookieConsent.close')}
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="relative z-10 flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/30">
                    <Cookie className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {t('cookieConsent.title')}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t('cookieConsent.description')}
                    </p>
                  </div>
                </div>

                {/* Cookie Categories Preview */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200/50 shadow-sm shadow-green-500/10">
                    <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                      <Shield size={14} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-green-700">
                      {t('cookieConsent.categories.necessary')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-200/50 shadow-sm shadow-blue-500/10">
                    <div className="p-1.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <BarChart3 size={14} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-blue-700">
                      {t('cookieConsent.categories.analytics')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50 shadow-sm shadow-purple-500/10">
                    <div className="p-1.5 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg">
                      <Target size={14} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-purple-700">
                      {t('cookieConsent.categories.marketing')}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={acceptAll}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-purple-600/40 border-2 border-blue-400/30 hover:border-purple-400/50"
                  >
                    {t('cookieConsent.acceptAll')}
                  </motion.button>

                  <motion.button
                    onClick={rejectAll}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm border border-slate-200/50 hover:border-slate-300 shadow-sm hover:shadow-md"
                  >
                    {t('cookieConsent.rejectAll')}
                  </motion.button>

                  <motion.button
                    onClick={handleManagePreferences}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 sm:flex-initial bg-white/70 backdrop-blur-sm border border-slate-200/50 hover:bg-white/90 hover:border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <Settings size={16} />
                    <span className="hidden sm:inline">{t('cookieConsent.managePreferences')}</span>
                    <span className="sm:hidden">Impostazioni</span>
                  </motion.button>
                </div>

                {/* Legal Links */}
                <div className="relative z-10 mt-4 pt-4 border-t border-slate-200/50">
                  <p className="text-xs text-slate-600">
                    {t('cookieConsent.legalNotice')}{' '}
                    <a
                      href={`/${t('meta.locale')}/privacy-policy`}
                      className="text-blue-600 hover:text-purple-600 font-medium underline decoration-blue-300 hover:decoration-purple-300 underline-offset-2 transition-colors duration-200"
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