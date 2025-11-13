'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, memo } from 'react';
import { useInView } from '@/hooks/useInView';

interface BenefitItem {
  title: string;
  description: string;
  value: string;
  unit: string;
}

export const BenefitsSection = memo(function BenefitsSection() {
  const t = useTranslations('benefits');
  const { ref: sectionRef, isIntersecting: isInView } = useInView({ threshold: 0.2 });

  const benefits: BenefitItem[] = Array.from({ length: 4 }, (_, i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    value: t(`items.${i}.value`),
    unit: t(`items.${i}.unit`),
  }));


  // Optimized NumberCounter using requestAnimationFrame
  const NumberCounter: React.FC<{
    value: string;
    isInView: boolean;
    delay?: number;
  }> = ({ value, isInView, delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
      if (!isInView) return;

      const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
      const isPercentage = value.includes('%');
      const hasPlus = value.includes('+');

      if (isNaN(numericValue)) {
        setTimeout(() => setDisplayValue(value), delay * 1000);
        return;
      }

      const duration = 2000;
      let animationFrame: number;
      let startTime: number | null = null;

      // Easing function for smooth animation
      const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const current = numericValue * easeOutQuart(progress);
        let formattedValue = Math.round(current).toString();
        if (isPercentage) formattedValue += '%';
        if (hasPlus && progress === 1) formattedValue += '+';

        setDisplayValue(formattedValue);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      const timer = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, delay * 1000);

      return () => {
        clearTimeout(timer);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [isInView, value, delay]);

    return <span>{displayValue}</span>;
  };

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative py-0 px-4 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto py-12">
        {/* Modern Section Header */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Key Benefits</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Bento Grid Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {benefits.map((benefit, index) => {
            // Define card sizes: 0 and 3 are large (span-2), 1 and 2 are small (span-1)
            const isLarge = index === 0 || index === 3;
            const spanClass = isLarge ? 'md:col-span-2' : 'md:col-span-1';
            const heightClass = isLarge ? 'min-h-[280px] md:min-h-[240px]' : 'min-h-[240px] md:min-h-[240px]';

            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${spanClass} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Modern Glass Morphism Card */}
                <div className={`relative h-full ${heightClass} p-6 md:p-8 bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group-hover:scale-[1.02]`}>
                  {/* Background glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Subtle decorative element */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Metrics section */}
                    <div className="mb-6">
                      <div className="flex items-end gap-2 mb-3">
                        <div className={`${isLarge ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                          <NumberCounter
                            value={benefit.value}
                            isInView={isInView}
                            delay={index * 0.15}
                          />
                        </div>
                        <div className={`${isLarge ? 'text-sm' : 'text-xs'} font-semibold text-slate-500 uppercase tracking-wider pb-2`}>
                          {benefit.unit}
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="flex-1 space-y-3">
                      <h3 className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight`}>
                        {benefit.title}
                      </h3>
                      <p className={`${isLarge ? 'text-base' : 'text-sm'} text-slate-600 leading-relaxed`}>
                        {benefit.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});
