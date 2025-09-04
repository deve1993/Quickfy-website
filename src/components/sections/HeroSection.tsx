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
    <section ref={ref} className="relative w-full min-h-screen flex flex-col items-center justify-center" role="banner" aria-label="Sezione Hero - Presentazione principale">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Salta al contenuto principale
      </a>
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 py-20 text-center min-h-screen flex flex-col items-center justify-center">
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

        {/* Primary CTA Button */}
        <div className={`flex justify-center items-center mb-16 transition-all duration-1000 delay-600 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={scrollToContact}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 focus:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`${t('hero.cta.primary')} - Scrolla alla sezione contatti`}
          >
            <span>{t('hero.cta.primary')}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Stats Preview */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-900 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2" tabIndex={0} role="img" aria-label={t('hero.metrics.hoursSaved')}>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">15+</div>
            <div className="text-sm text-gray-600 font-medium">{t('hero.metrics.hoursSaved').replace('15+ ', '')}</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2" tabIndex={0} role="img" aria-label={t('hero.metrics.roiImprovement')}>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">+35%</div>
            <div className="text-sm text-gray-600 font-medium">{t('hero.metrics.roiImprovement').replace('+35% ', '')}</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2" tabIndex={0} role="img" aria-label={t('hero.metrics.clarity')}>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">100%</div>
            <div className="text-sm text-gray-600 font-medium">{t('hero.metrics.clarity').replace('100% ', '')}</div>
          </div>
        </div>
      </div>
    </section>
  );
});