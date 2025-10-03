'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { useInView } from '@/hooks/useInView';

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations();
  const { ref, isIntersecting } = useInView({ threshold: 0.1 });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };


  return (
    <section ref={ref} className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30" role="banner" aria-label="Sezione Hero - Presentazione principale">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
        Salta al contenuto principale
      </a>
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-20 text-center min-h-[100dvh] flex flex-col items-center justify-center">
        {/* Main Headline */}
        <div className={`mb-8 transition-all duration-1000 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-gray-900">{t('hero.headline')} </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('hero.headlineHighlight')}</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('hero.subheadline')}
          </p>
        </div>

        {/* Primary Call-to-Action + Value Proposition */}
        <div className={`flex flex-col items-center justify-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-600 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={scrollToContact}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl focus:shadow-2xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 hover:scale-105 focus:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transform-gpu mb-6"
            aria-label={`${t('hero.cta.primary')} - Scrolla alla sezione contatti`}
          >
            <span>{t('hero.cta.primary')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>

          {/* Value Proposition Indicators */}
          <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
            ✓ Installazione gratuita • ✓ Supporto 24/7 • ✓ ROI garantito in 30 giorni
          </p>
        </div>

        {/* Stats Preview - RESTORED CARD DESIGN */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-900 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center" tabIndex={0} role="img" aria-label={t('hero.metrics.hoursSaved')}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">15+</div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">{t('hero.metrics.hoursSaved').replace('15+ ', '')}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center" tabIndex={0} role="img" aria-label={t('hero.metrics.roiImprovement')}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">+35%</div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">{t('hero.metrics.roiImprovement').replace('+35% ', '')}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center" tabIndex={0} role="img" aria-label={t('hero.metrics.clarity')}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">100%</div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">{t('hero.metrics.clarity').replace('100% ', '')}</div>
          </div>
        </div>
      </div>
    </section>
  );
});