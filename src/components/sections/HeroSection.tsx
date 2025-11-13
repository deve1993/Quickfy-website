'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { memo, useState, useEffect } from 'react';
import { trackCTA } from '@/lib/analytics';
import { DashboardMockup } from '@/components/ui/DashboardMockup';

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations('hero');
  const tAccessibility = useTranslations('accessibility');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after mount for better performance
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    // Track hero CTA click
    trackCTA('hero_primary_cta', 'hero_section');

    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="hero" className="hero-section relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden" role="banner" aria-label="Sezione Hero - Presentazione principale">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
        {tAccessibility('skipLinks.content')}
      </a>

      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 pt-32 pb-6 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12">
        {/* Grid Layout: Text Left, Mockup Right on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">

          {/* Left Column: Hero Text Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Main Headline */}
            <div className={`hero-headline mb-8 ${isVisible ? 'hero-visible' : ''}`}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-gray-900">{t('headline')} </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('headlineHighlight')}</span>
              </h1>
            </div>

            {/* Subheadline */}
            <div className={`hero-subheadline mb-10 ${isVisible ? 'hero-visible' : ''}`}>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed">
                {t('subheadline')}
              </p>
            </div>

            {/* Primary Call-to-Action + Value Proposition */}
            <div className={`hero-cta flex flex-col items-center lg:items-start ${isVisible ? 'hero-visible' : ''}`}>
              <button
                onClick={scrollToContact}
                className="hero-button group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg shadow-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 flex items-center space-x-2 sm:space-x-3 mb-6"
                aria-label={t('cta.ariaLabel')}
              >
                <span>{t('cta.primary')}</span>
                <ArrowRight className="hero-arrow w-5 h-5" aria-hidden="true" />
              </button>

              {/* Value Proposition Indicators */}
              <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide uppercase">
                {t('valueProposition')}
              </p>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup (Hidden on mobile) */}
          <div className={`hidden lg:block ${isVisible ? 'hero-visible' : ''}`}>
            <DashboardMockup
              imageSrc="/screenshots/2.png"
              alt="QuickFy Dashboard - Analytics e Campaign Management"
              enableFloating={true}
              enableTilt={true}
              enableParallax={false}
            />
          </div>
        </div>

        {/* Stats Preview - Full Width Below Grid */}
        <div className={`hero-stats grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto w-full ${isVisible ? 'hero-visible' : ''}`}>
          {/* Card 1: Blue-Purple Gradient */}
          <div className="hero-stat-card bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg border border-gray-200 text-center" tabIndex={0} role="img" aria-label={`${t('metrics.hoursSaved')} ${t('metrics.perMonth')}`}>
            <div className="text-3xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">15+</div>
            <div className="text-xs sm:text-sm text-gray-700 font-semibold mb-0.5">{t('metrics.hoursSaved').replace('15+ ', '')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('metrics.perMonth')}</div>
          </div>

          {/* Card 2: Purple-Pink Gradient */}
          <div className="hero-stat-card bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg border border-gray-200 text-center" tabIndex={0} role="img" aria-label={`${t('metrics.roiImprovement')} ${t('metrics.vsTraditional')}`}>
            <div className="text-3xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">+35%</div>
            <div className="text-xs sm:text-sm text-gray-700 font-semibold mb-0.5">{t('metrics.roiImprovement').replace('+40% ', '')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('metrics.vsTraditional')}</div>
          </div>

          {/* Card 3: Pink-Orange Gradient */}
          <div className="hero-stat-card bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg border border-gray-200 text-center" tabIndex={0} role="img" aria-label={`${t('metrics.clarity')} ${t('metrics.realTime')}`}>
            <div className="text-3xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-1">100%</div>
            <div className="text-xs sm:text-sm text-gray-700 font-semibold mb-0.5">{t('metrics.clarity').replace('100% ', '')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('metrics.realTime')}</div>
          </div>
        </div>

        {/* Mobile Dashboard Mockup - Shown Below Stats on Mobile/Tablet */}
        <div className={`lg:hidden mt-12 ${isVisible ? 'hero-visible' : ''}`}>
          <DashboardMockup
            imageSrc="/dashboard-mockup.svg"
            alt="QuickFy Dashboard - Analytics e Campaign Management"
            enableFloating={true}
            enableTilt={false}
            enableParallax={false}
          />
        </div>
      </div>
    </section>
  );
});
