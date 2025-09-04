'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Star, Zap, Users, TrendingUp, MessageSquare, BarChart3, Clock } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  perfectFor: string;
  features: string[];
  cta: string;
  isRecommended?: boolean;
  isComingSoon?: boolean;
  icon: React.ElementType;
  gradient: string;
  hoverGradient: string;
}

export function PricingSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('pricing');

  const handleAnalyticsClick = () => {
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
          messageField.value = 'Sono interessato al piano ANALYTICS (€19/mese). ';
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
      id: 'analytics',
      name: t('plans.analytics.name'),
      price: t('plans.analytics.price'),
      period: t('plans.analytics.period'),
      perfectFor: t('plans.analytics.perfectFor'),
      features: [
        t('plans.analytics.features.0'),
        t('plans.analytics.features.1'),
        t('plans.analytics.features.2'),
        t('plans.analytics.features.3')
      ],
      cta: t('plans.analytics.cta'),
      isRecommended: true,
      icon: BarChart3,
      gradient: 'from-blue-600 to-purple-600',
      hoverGradient: 'from-blue-700 to-purple-700'
    },
    {
      id: 'plus',
      name: t('plans.plus.name'),
      price: t('plans.plus.price'),
      period: t('plans.plus.period'),
      perfectFor: t('plans.plus.perfectFor'),
      features: [
        t('plans.plus.features.0'),
        t('plans.plus.features.1'),
        t('plans.plus.features.2')
      ],
      cta: t('plans.plus.cta'),
      isComingSoon: true,
      icon: Star,
      gradient: 'from-purple-600 to-pink-600',
      hoverGradient: 'from-purple-700 to-pink-700'
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      price: t('plans.pro.price'),
      period: t('plans.pro.period'),
      perfectFor: t('plans.pro.perfectFor'),
      features: [
        t('plans.pro.features.0'),
        t('plans.pro.features.1'),
        t('plans.pro.features.2'),
        t('plans.pro.features.3')
      ],
      cta: t('plans.pro.cta'),
      isComingSoon: true,
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
      ref={sectionRef}
      className="relative py-12 px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
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
                <div className={`relative h-full min-h-[600px] p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 overflow-hidden flex flex-col ${
                  plan.isRecommended ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}>
                  
                  {/* Recommended Badge - DOPORUČENÉ */}
                  {plan.isRecommended && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>{t('plans.analytics.badge')}</span>
                      </div>
                    </div>
                  )}

                  {/* Coming Soon Badge */}
                  {plan.isComingSoon && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40">
                      <span className={`bg-gradient-to-r ${
                        plan.id === 'plus' 
                          ? 'from-purple-600 to-pink-600' 
                          : 'from-pink-600 to-orange-600'
                      } text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                        {plan.id === 'plus' ? t('plans.plus.badge') : t('plans.pro.badge')}
                      </span>
                    </div>
                  )}

                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Decorative Circle */}
                  <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${plan.gradient} opacity-10 group-hover:opacity-20 rounded-full transition-opacity duration-500`}></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Plan Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${plan.gradient} shadow-md`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {plan.isComingSoon && (
                          <Clock className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {plan.name}
                      </h3>
                      
                      <div className="flex items-baseline mb-6">
                        <span className={`text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>€{plan.price}</span>
                        <span className="text-slate-500 ml-2">/{plan.period}</span>
                      </div>
                    </div>

                    {/* Perfect For Section */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
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
                    <div className="mb-6 flex-grow">
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">{t('features')}</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <div className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient} flex-shrink-0 mt-0.5`}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-slate-600 text-xs">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={plan.id === 'analytics' && !plan.isComingSoon ? handleAnalyticsClick : undefined}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 mt-auto ${
                        plan.isComingSoon
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : plan.isRecommended
                          ? `bg-gradient-to-r ${plan.gradient} hover:${plan.hoverGradient} text-white shadow-lg hover:shadow-xl`
                          : `border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50`
                      }`}
                      whileHover={plan.isComingSoon ? {} : { scale: 1.02 }}
                      whileTap={plan.isComingSoon ? {} : { scale: 0.98 }}
                      disabled={plan.isComingSoon}
                    >
                      {plan.isComingSoon ? (
                        <>
                          <Clock className="w-4 h-4" />
                          <span>{plan.id === 'plus' ? t('plans.plus.cta') : t('plans.pro.cta')}</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          <span>{plan.cta}</span>
                        </>
                      )}
                    </motion.button>

                    {/* Bottom Accent Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl z-10`}></div>
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
          className="text-center mt-16"
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
}