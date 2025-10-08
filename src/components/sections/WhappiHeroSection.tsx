'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, MessageSquare } from 'lucide-react';
import { memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { AppMockup } from '@/components/ui/app-mockup';
import { TrustIndicator, MadeInItalyBadge, SecurityBadge } from '@/components/ui/trust-badges';
import { PriceComparison } from '@/components/ui/price-comparison';
import { VideoPlaceholder } from '@/components/ui/video-placeholder';

export const WhappiHeroSection = memo(function WhappiHeroSection() {
  const t = useTranslations('whappi');
  const { ref, isIntersecting } = useInView({ threshold: 0.1 });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden"
      role="banner"
      aria-label="Whappi Hero Section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/25 to-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-blue-600/15 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 py-20">
        {/* Trust Indicators */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <TrustIndicator />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">

          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <div className={`transition-all duration-1000 delay-500 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">{t('title')} </span>
                <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  {t('titleHighlight')}
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <div className={`transition-all duration-1000 delay-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Key Benefits */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-1000 delay-900 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">All Platforms</div>
                  <div className="text-sm text-gray-600">WhatsApp, Telegram, Messenger</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">€15</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Simple Pricing</div>
                  <div className="text-sm text-gray-600">Per month, per number</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1100 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105 transform-gpu"
              >
                <span>{t('cta.button')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group bg-white/80 backdrop-blur-sm hover:bg-white border border-blue-200 hover:border-blue-300 px-8 py-4 rounded-xl text-gray-800 font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3">
                <Play className="w-5 h-5 text-blue-600" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-1300 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <MadeInItalyBadge />
              <SecurityBadge />
            </div>
          </div>

          {/* Right Column - App Mockup */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Glow effect behind mockup */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-500/20 to-blue-600/20 rounded-3xl blur-xl scale-110"></div>

              {/* App mockup */}
              <AppMockup className="relative z-10 max-w-sm md:max-w-md transform hover:scale-105 transition-transform duration-500" />

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                +300% Efficiency
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                24/7 Support
              </div>
            </div>
          </div>
        </div>

        {/* Price Comparison */}
        <div className={`mt-20 transition-all duration-1000 delay-1500 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Finally, Pricing That Makes Sense
            </h2>
            <p className="text-xl text-gray-600">
              Compare traditional solutions with Whappi&apos;s simple pricing
            </p>
          </div>
          <PriceComparison variant="horizontal" className="max-w-2xl mx-auto" />
        </div>

        {/* Video Section */}
        <div className={`mt-20 transition-all duration-1000 delay-1700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Whappi in Action
            </h2>
            <p className="text-xl text-gray-600">
              Watch how teams transform their communication workflow
            </p>
          </div>
          <VideoPlaceholder
            title="Whappi Team Demo"
            description="Complete walkthrough of team collaboration features"
            duration="3:45"
            className="max-w-4xl mx-auto"
          />
        </div>

        {/* Social Proof Stats */}
        <div className={`mt-20 transition-all duration-1000 delay-1900 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-600 font-medium">Happy Businesses</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">15h</div>
              <div className="text-gray-600 font-medium">Weekly Time Saved</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600 font-medium">Cost Reduction</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">4.9★</div>
              <div className="text-gray-600 font-medium">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});