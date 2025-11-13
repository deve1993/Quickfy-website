'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Calculator, ArrowRight } from 'lucide-react';
import { trackCTA } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ExitIntentModalProps {
  onClose?: () => void;
}

export function ExitIntentModal({ onClose }: ExitIntentModalProps) {
  const t = useTranslations('exitIntent');
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [currentROI, setCurrentROI] = useState(150);

  // Calculate potential ROI with QuickFy
  const potentialROI = Math.round(currentROI * 1.35); // 35% improvement
  const monthlySavings = Math.round((monthlyBudget * (potentialROI - currentROI)) / 100);
  const yearlySavings = monthlySavings * 12;
  const hoursSaved = 15; // 15+ hours/month as per hero metrics

  useEffect(() => {
    // Check if modal was already shown in this session
    const modalShown = sessionStorage.getItem('exitIntentShown');
    if (modalShown) {
      setHasShown(true);
      return;
    }

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves through the top of the viewport
      if (e.clientY <= 0 && !exitIntentTriggered && !hasShown) {
        exitIntentTriggered = true;
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');

        // Track exit intent modal display
        trackCTA('exit_intent_modal_shown', 'page_exit');
      }
    };

    // Add event listener after a delay to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000); // Wait 5 seconds before enabling exit intent

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    trackCTA('exit_intent_modal_closed', 'modal');
    onClose?.();
  };

  const handleCTA = () => {
    trackCTA('exit_intent_cta_click', 'modal');
    setIsVisible(false);

    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Pre-fill message
      setTimeout(() => {
        const messageField = contactSection.querySelector('textarea') as HTMLTextAreaElement;
        if (messageField) {
          messageField.value = t('prefillMessage', { hours: hoursSaved });
          messageField.focus();
        }
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                aria-label={t('closeLabel')}
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold">{t('title')}</h2>
                </div>
                <p className="text-xl text-white/90">
                  {t('subtitle')}
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* ROI Calculator */}
                <div className="space-y-6">
                  {/* Monthly Budget Slider */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('monthlyBudget')}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="500"
                        max="10000"
                        step="100"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent min-w-[120px] text-right">
                        €{monthlyBudget.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Current ROI Slider */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('currentROI')}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="50"
                        max="300"
                        step="10"
                        value={currentROI}
                        onChange={(e) => setCurrentROI(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent min-w-[120px] text-right">
                        {currentROI}%
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mt-8 space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900">
                          {t('resultsTitle')}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4">
                          <div className="text-sm text-gray-600 mb-1">{t('improvedROI')}</div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {potentialROI}%
                          </div>
                          <div className="text-xs text-green-600 font-semibold mt-1">
                            +{potentialROI - currentROI}% {t('vsNow')}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4">
                          <div className="text-sm text-gray-600 mb-1">{t('timeSaved')}</div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {hoursSaved}h
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{t('perMonth')}</div>
                        </div>

                        <div className="col-span-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                          <div className="text-sm mb-1 opacity-90">{t('estimatedAnnualSavings')}</div>
                          <div className="text-4xl font-bold">
                            €{yearlySavings.toLocaleString()}
                          </div>
                          <div className="text-sm mt-1 opacity-90">
                            (€{monthlySavings.toLocaleString()}/{t('perMonth')})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={handleCTA}
                    className={cn(
                      "w-full py-4 px-6 rounded-xl font-bold text-lg",
                      "bg-gradient-to-r from-blue-600 to-purple-600",
                      "hover:from-blue-700 hover:to-purple-700",
                      "text-white shadow-lg hover:shadow-xl",
                      "transition-all duration-200",
                      "flex items-center justify-center gap-2",
                      "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t('ctaButton')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <p className="text-center text-sm text-gray-500">
                    {t('benefits')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
