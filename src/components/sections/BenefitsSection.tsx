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
      const steps = 60;
      const stepValue = numericValue / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          current += stepValue;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(interval);
          }

          let formattedValue = Math.round(current).toString();
          if (isPercentage) formattedValue += '%';
          if (hasPlus && current === numericValue) formattedValue += '+';

          setDisplayValue(formattedValue);
        }, stepDuration);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }, [isInView, value, delay]);

    return <span>{displayValue}</span>;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-full p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      <NumberCounter 
                        value={benefit.value} 
                        isInView={isInView} 
                        delay={index * 0.2} 
                      />
                    </div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {benefit.unit}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});