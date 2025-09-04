'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BarChart3, Target, Users, LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  theme: 'blue' | 'green' | 'purple';
  gradient: string;
  iconBg: string;
  borderColor: string;
  shadowColor: string;
}

export function FeaturesSection() {
  const t = useTranslations();

  const features: Feature[] = [
    {
      title: t('features.items.0.title'),
      description: t('features.items.0.description'),
      benefits: [
        t('features.items.0.benefits.0'),
        t('features.items.0.benefits.1'),
        t('features.items.0.benefits.2'),
      ],
      icon: BarChart3,
      theme: 'blue',
      gradient: 'from-blue-50 via-blue-100 to-indigo-100',
      iconBg: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200 hover:border-blue-300',
      shadowColor: 'hover:shadow-blue-200/50',
    },
    {
      title: t('features.items.1.title'),
      description: t('features.items.1.description'),
      benefits: [
        t('features.items.1.benefits.0'),
        t('features.items.1.benefits.1'),
        t('features.items.1.benefits.2'),
      ],
      icon: Target,
      theme: 'green',
      gradient: 'from-green-50 via-green-100 to-emerald-100',
      iconBg: 'from-green-500 to-green-600',
      borderColor: 'border-green-200 hover:border-green-300',
      shadowColor: 'hover:shadow-green-200/50',
    },
    {
      title: t('features.items.2.title'),
      description: t('features.items.2.description'),
      benefits: [
        t('features.items.2.benefits.0'),
        t('features.items.2.benefits.1'),
        t('features.items.2.benefits.2'),
      ],
      icon: Users,
      theme: 'purple',
      gradient: 'from-purple-50 via-purple-100 to-violet-100',
      iconBg: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-200 hover:border-purple-300',
      shadowColor: 'hover:shadow-purple-200/50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section id="features" className="relative py-24 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t('features.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              {t('features.titleHighlight')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Perfect 3-Column Horizontal Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className={`relative h-full min-h-[360px] md:min-h-[380px] p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl ${feature.shadowColor} transition-all duration-500 border-2 ${feature.borderColor} overflow-hidden flex flex-col`}>
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-60 transition-all duration-500 rounded-2xl`}></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-60"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-40"></div>

                  {/* Icon section */}
                  <div className="relative z-10 mb-5">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.iconBg} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                      {feature.description}
                    </p>

                    {/* Benefits list */}
                    <div className="space-y-3 mt-auto">
                      {feature.benefits.map((benefit, benefitIndex) => {
                        const checkBgColor = feature.theme === 'blue' ? 'bg-blue-500' :
                                            feature.theme === 'green' ? 'bg-green-500' :
                                            'bg-purple-500';
                        
                        return (
                          <motion.div 
                            key={benefitIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + benefitIndex * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2 text-xs text-slate-600"
                          >
                            <div className={`flex-shrink-0 w-4 h-4 rounded-full ${checkBgColor} flex items-center justify-center mt-0.5 shadow-sm`}>
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="leading-relaxed font-medium">{benefit}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
            <span>Powered by AI and Automation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}