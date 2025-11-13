'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect, memo } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Star, Zap, Users, TrendingUp, MessageSquare, BarChart3 } from 'lucide-react';
import { trackPricingPlan, trackCTA } from '@/lib/analytics';

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  savings: number;
  period: string;
  perfectFor: string;
  features: string[];
  cta: string;
  isRecommended?: boolean;
  isClosed?: boolean;
  icon: React.ElementType;
  gradient: string;
  hoverGradient: string;
}

type BillingCycle = 'monthly' | 'annual';

export const PricingSection = memo(function PricingSection() {
  const [isInView, setIsInView] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('pricing');

  const handleAnalyticsClick = () => {
    // Track pricing plan selection
    trackPricingPlan('Analytics', '299');

    const contactForm = document.getElementById('contact-form') ||
                       document.querySelector('[data-contact-form]') ||
                       document.querySelector('form') ||
                       document.querySelector('.contact-form') ||
                       document.getElementById('contact');

    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });

      // Pre-compila messaggio
      setTimeout(() => {
        const messageField = contactForm.querySelector('textarea') as HTMLTextAreaElement;
        if (messageField) {
          messageField.value = t('analytics.formMessage');
          messageField.focus();
        }
      }, 500);
    } else {
      // Fallback: scroll to bottom of page if form not found
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleConsultationClick = () => {
    // Track free consultation CTA
    trackCTA('free_consultation', 'pricing_section');

    const contactSection = document.getElementById('contact');

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Pre-compila messaggio per consultazione gratuita
      setTimeout(() => {
        const messageField = contactSection.querySelector('textarea') as HTMLTextAreaElement;
        if (messageField) {
          messageField.value = t('consultation.formMessage');
          messageField.focus();
        }
      }, 500);
    } else {
      // Fallback: scroll to bottom of page if form not found
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: t('plans.starter.name'),
      monthlyPrice: 19,
      annualPrice: 190,
      savings: 38,
      period: billingCycle === 'monthly' ? t('plans.starter.period.monthly') : t('plans.starter.period.annual'),
      perfectFor: t('plans.starter.perfectFor'),
      features: [
        t('plans.starter.features.0'),
        t('plans.starter.features.1'),
        t('plans.starter.features.2'),
        t('plans.starter.features.3')
      ],
      cta: t('plans.starter.cta'),
      isRecommended: true,
      icon: BarChart3,
      gradient: 'from-blue-600 to-purple-600',
      hoverGradient: 'from-blue-700 to-purple-700'
    },
    {
      id: 'plus',
      name: t('plans.plus.name'),
      monthlyPrice: 39,
      annualPrice: 390,
      savings: 78,
      period: billingCycle === 'monthly' ? t('plans.plus.period.monthly') : t('plans.plus.period.annual'),
      perfectFor: t('plans.plus.perfectFor'),
      features: [
        t('plans.plus.features.0'),
        t('plans.plus.features.1'),
        t('plans.plus.features.2')
      ],
      cta: t('plans.plus.cta'),
      isClosed: true,
      icon: Star,
      gradient: 'from-purple-600 to-pink-600',
      hoverGradient: 'from-purple-700 to-pink-700'
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      monthlyPrice: 79,
      annualPrice: 790,
      savings: 158,
      period: billingCycle === 'monthly' ? t('plans.pro.period.monthly') : t('plans.pro.period.annual'),
      perfectFor: t('plans.pro.perfectFor'),
      features: [
        t('plans.pro.features.0'),
        t('plans.pro.features.1'),
        t('plans.pro.features.2'),
        t('plans.pro.features.3')
      ],
      cta: t('plans.pro.cta'),
      isClosed: true,
      icon: TrendingUp,
      gradient: 'from-pink-600 to-orange-600',
      hoverGradient: 'from-pink-700 to-orange-700'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-0 px-4 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center mb-8 gap-4"
        >
          {/* iOS-style Toggle */}
          <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('billingToggle.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('billingToggle.annual')}
            </button>
          </div>

          {/* Savings Badge - Only show when annual is selected */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={billingCycle === 'annual' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={billingCycle === 'annual' ? 'block' : 'hidden'}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>{t('savingsBadge')}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
        >
          {plans.map((plan) => {
            const IconComponent = plan.icon;

            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className="group relative"
              >
                <div className={`relative h-full min-h-[280px] sm:min-h-[350px] lg:min-h-[420px] p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 border overflow-hidden flex flex-col ${
                  plan.isClosed
                    ? 'bg-slate-50 border-slate-200 opacity-75'
                    : plan.isRecommended
                      ? 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl ring-2 ring-blue-500 ring-opacity-50'
                      : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl'
                }`}>

                  {/* Closed Badge */}
                  {plan.isClosed && (
                    <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-40">
                      <div className="bg-slate-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Chiuso alle iscrizioni
                      </div>
                    </div>
                  )}

                  {/* Recommended Badge */}
                  {plan.isRecommended && !plan.isClosed && (
                    <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-40">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>{t('plans.starter.badge')}</span>
                      </div>
                    </div>
                  )}

                  {/* Background Gradient Overlay - Only for non-closed plans */}
                  {!plan.isClosed && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${plan.gradient} opacity-10 group-hover:opacity-20 rounded-full transition-opacity duration-500`}></div>
                    </>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Plan Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${plan.gradient} shadow-md`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {plan.name}
                      </h3>

                      <div className="flex flex-col gap-2 mb-4 sm:mb-6">
                        <div className="flex items-baseline">
                          <motion.span
                            key={`${plan.id}-${billingCycle}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                          >
                            €{billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                          </motion.span>
                          <span className="text-slate-500 ml-1 sm:ml-2 text-sm sm:text-base">
                            /{billingCycle === 'monthly' ? t('period.month') : t('period.year')}
                          </span>
                        </div>

                        {/* Savings display for annual billing */}
                        {billingCycle === 'annual' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-xs text-green-600 font-semibold"
                          >
                            {t('savings', { amount: plan.savings })}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Perfect For Section */}
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-slate-700 mb-1">{t('perfectFor')}</h4>
                          <p className="text-xs text-slate-600">
                            {plan.perfectFor}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-4 sm:mb-6 flex-grow">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3">{t('features')}</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-1 sm:space-x-2">
                            <div className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient} flex-shrink-0 mt-0.5`}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-slate-600 text-xs sm:text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={plan.isClosed ? undefined : handleAnalyticsClick}
                      disabled={plan.isClosed}
                      className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 mt-auto ${
                        plan.isClosed
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : plan.isRecommended
                            ? `bg-gradient-to-r ${plan.gradient} hover:${plan.hoverGradient} text-white shadow-lg hover:shadow-xl`
                            : `border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50`
                      }`}
                      whileHover={plan.isClosed ? {} : { scale: 1.02 }}
                      whileTap={plan.isClosed ? {} : { scale: 0.98 }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{plan.isClosed ? 'Non disponibile' : plan.cta}</span>
                    </motion.button>

                    {/* Bottom Accent Line - Only for non-closed plans */}
                    {!plan.isClosed && (
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl z-10`}></div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
              {t('consultation.title')}
            </h3>
            <p className="text-base md:text-lg text-slate-600 mb-8">
              {t('consultation.subtitle')}
            </p>
            <motion.button
              onClick={handleConsultationClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {t('consultation.cta')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
