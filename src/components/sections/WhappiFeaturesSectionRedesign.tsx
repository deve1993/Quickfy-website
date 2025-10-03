'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, Shield, Zap, CheckCircle, Sparkles } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { memo } from 'react';

export const WhappiFeaturesSectionRedesign = memo(function WhappiFeaturesSectionRedesign() {
  const t = useTranslations('whappi');
  const { ref: featuresRef, isIntersecting: isFeaturesInView } = useInView({ threshold: 0.1 });

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const benefitVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.5,
      },
    }),
  };

  return (
    <section
      ref={featuresRef}
      id="whappi-features-redesign"
      className="relative py-24 px-4 overflow-hidden"
      aria-label="Whappi features"
    >
      {/* Enhanced Multi-Layer Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30" />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-[600px] h-[600px] bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-emerald-200 to-green-200 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(100, 100, 100) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(100, 100, 100) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 7 + 10) % 95}%`,
              top: `${(i * 13 + 5) % 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-400/40" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 mb-6 bg-white/60 backdrop-blur-md border border-purple-200/50 rounded-full shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
              AI-Powered Features
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t('features.title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Feature Cards Grid with Staggered Heights */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isFeaturesInView ? 'visible' : 'hidden'}
        >
          {/* Team Management Card - Left */}
          <motion.div
            variants={cardVariants}
            className="group relative"
          >
            {/* Glow Effect Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

            {/* Main Card */}
            <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white/40 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 h-[380px] flex flex-col">
              {/* Icon Container with Dual Layer */}
              <motion.div
                className="relative mb-6"
                variants={iconVariants}
              >
                {/* Icon Background */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Users className="w-7 h-7 text-white drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-2 -right-2 px-3 py-1 bg-blue-500/90 backdrop-blur-md rounded-full border-2 border-white/50 shadow-lg"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Team</span>
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {t('features.teamManagement.title')}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {t('features.teamManagement.description')}
                </p>

                {/* Benefits List with Numbered Badges */}
                <ul className="space-y-3 mt-auto">
                  {[0, 1, 2].map((index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={benefitVariants}
                      className="flex items-start gap-3"
                    >
                      {/* Animated Number Badge */}
                      <div className="relative flex-shrink-0">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-[10px] font-bold text-white">{index + 1}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-700 leading-relaxed pt-0.5">
                        {t(`features.teamManagement.benefits.${index}`)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contextual Intelligence Card - Center (Hero) */}
          <motion.div
            variants={cardVariants}
            className="group relative"
          >
            {/* Enhanced Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-xl border-2 border-purple-200/60 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-3 h-[380px] flex flex-col">

              {/* Icon Container */}
              <motion.div
                className="relative mb-6"
                variants={iconVariants}
              >
                {/* Icon Background - Larger */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 via-fuchsia-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Zap className="w-8 h-8 text-white drop-shadow-2xl" />
                  </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-2 -right-2 px-3 py-1 bg-purple-500/90 backdrop-blur-md rounded-full border-2 border-white/50 shadow-lg"
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">AI</span>
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                  {t('features.contextualIntelligence.title')}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {t('features.contextualIntelligence.description')}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3 mt-auto">
                  {[0, 1, 2].map((index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={benefitVariants}
                      className="flex items-start gap-3"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-[10px] font-bold text-white">{index + 1}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-700 leading-relaxed pt-0.5">
                        {t(`features.contextualIntelligence.benefits.${index}`)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* GDPR Compliance Card - Right */}
          <motion.div
            variants={cardVariants}
            className="group relative"
          >
            {/* Glow Effect Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

            {/* Main Card */}
            <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white/40 rounded-2xl p-6 shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2 h-[380px] flex flex-col">
              {/* Icon Container */}
              <motion.div
                className="relative mb-6"
                variants={iconVariants}
              >
                {/* Icon Background */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:scale-110">
                  <motion.div
                    animate={{
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Shield className="w-7 h-7 text-white drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-2 -right-2 px-3 py-1 bg-emerald-500/90 backdrop-blur-md rounded-full border-2 border-white/50 shadow-lg"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                >
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">GDPR</span>
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                  {t('features.gdprCompliance.title')}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {t('features.gdprCompliance.description')}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3 mt-auto">
                  {[0, 1, 2].map((index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={benefitVariants}
                      className="flex items-start gap-3"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-[10px] font-bold text-white">{index + 1}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-700 leading-relaxed pt-0.5">
                        {t(`features.gdprCompliance.benefits.${index}`)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Call-to-Action Accent */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-300/30 rounded-full">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">
              {t('features.allIncluded')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
