'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, Network, Lock } from 'lucide-react';

export function WhappiSummarySection() {
  const t = useTranslations('whappiSummary');
  const locale = useLocale();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('whappi-summary');
    if (section) {
      observer.observe(section);
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
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section
      id="whappi-summary"
      className="relative py-0 px-4 overflow-hidden bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Whappi
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-12"
        >
          {[
            {
              key: 'teamManagement',
              theme: 'blue',
              icon: MessageSquare,
              gradient: 'from-blue-600 to-purple-600',
              hoverGradient: 'from-blue-700 to-purple-700'
            },
            {
              key: 'integrations',
              theme: 'green',
              icon: Network,
              gradient: 'from-emerald-600 to-teal-600',
              hoverGradient: 'from-emerald-700 to-teal-700'
            },
            {
              key: 'gdpr',
              theme: 'purple',
              icon: Lock,
              gradient: 'from-purple-600 to-pink-600',
              hoverGradient: 'from-purple-700 to-pink-700'
            }
          ].map((feature) => {
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-full min-h-[240px] p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 overflow-hidden flex flex-col">

                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Decorative Circle */}
                  <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 rounded-full transition-opacity duration-500`}></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Header */}
                    <div className="text-center mb-5">
                      <div className="flex justify-center mb-4">
                        <div className={`p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          <IconComponent className="w-9 h-9 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                    </div>

                    {/* Content section */}
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-sm text-slate-600 leading-relaxed text-center px-1 max-w-[200px]">
                        {t(`features.${feature.key}.description`)}
                      </p>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl z-10`}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="group relative mb-10"
        >
          <div className="relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-2xl mx-auto">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

            {/* Decorative Circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10 group-hover:opacity-20 rounded-full transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left flex-1">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Work in Progress
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Coming Soon
                </p>
              </div>
              <Link
                href={`/${locale}/whappi`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0"
              >
                {t('cta.button')}
              </Link>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm leading-relaxed">
            {t('note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}