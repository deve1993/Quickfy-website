'use client';

import React, { memo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Target, Users, LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { BrowserFrame } from '@/components/ui/BrowserFrame';

interface Feature {
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  theme: 'blue' | 'green' | 'purple';
  gradient: string;
  iconBg: string;
  screenshotPath: string;
}

interface FeatureItemProps {
  feature: Feature;
  index: number;
  isReverse: boolean;
}

const FeatureItem = memo(function FeatureItem({ feature, index, isReverse }: FeatureItemProps) {
  const Icon = feature.icon;
  const screenshotClass = `feature-screenshot feature-screenshot-${feature.theme}`;

  // Parallax effect for screenshot - Enhanced for more visibility
  const screenshotRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: screenshotRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [isReverse ? -5 : 5, 0, isReverse ? 5 : -5]);

  // Parallax effect for content (counter-movement) - Intelligent text parallax
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: contentScrollProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"]
  });

  // Counter-movement: text moves opposite to screenshot with less intensity
  const iconY = useTransform(contentScrollProgress, [0, 1], [-30, 30]);
  const iconRotate = useTransform(contentScrollProgress, [0, 1], [-5, 5]);
  const titleY = useTransform(contentScrollProgress, [0, 1], [-50, 50]);
  const titleScale = useTransform(contentScrollProgress, [0, 0.5, 1], [0.98, 1, 1.02]);
  const descriptionY = useTransform(contentScrollProgress, [0, 1], [-40, 40]);
  const benefitsY = useTransform(contentScrollProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`feature-split-section ${isReverse ? 'reverse' : ''}`}
    >
      {/* Diagonal divider line */}
      <div className="diagonal-divider"></div>

      {/* Content Side */}
      <div ref={contentRef} className={`feature-content ${isReverse ? 'order-2' : 'order-1'}`}>
        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ y: iconY, rotate: iconRotate }}
          className="mb-6"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.iconBg} rounded-2xl shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: isReverse ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{ y: titleY, scale: titleScale }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ y: descriptionY }}
          className="text-lg text-slate-600 mb-8 leading-relaxed"
        >
          {feature.description}
        </motion.p>

        {/* Benefits List */}
        <motion.div style={{ y: benefitsY }} className="space-y-4">
          {feature.benefits.map((benefit, benefitIndex) => {
            const checkBgColor = feature.theme === 'blue' ? 'bg-blue-500' :
                                feature.theme === 'green' ? 'bg-green-500' :
                                'bg-purple-500';

            return (
              <motion.div
                key={benefitIndex}
                initial={{ opacity: 0, x: isReverse ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + benefitIndex * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full ${checkBgColor} flex items-center justify-center mt-0.5 shadow-sm`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-base text-slate-700 leading-relaxed font-medium">
                  {benefit}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Screenshot Side */}
      <motion.div
        ref={screenshotRef}
        style={{
          y,
          scale,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1200
        }}
        className={`${screenshotClass} ${isReverse ? 'order-1' : 'order-2'}`}
      >
        <BrowserFrame url="quickfy.com/dashboard">
          <Image
            src={feature.screenshotPath}
            alt={`${feature.title} Dashboard`}
            width={1200}
            height={750}
            className="w-full h-full object-cover"
            priority={index === 0}
          />
        </BrowserFrame>
      </motion.div>
    </motion.div>
  );
});

export const FeaturesSection = memo(function FeaturesSection() {
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
      screenshotPath: '/screenshots/dashboard-analytics.png',
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
      screenshotPath: '/screenshots/recensioni-ai.png',
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
      screenshotPath: '/screenshots/social-ai.png',
    },
  ];

  return (
    <section id="features" className="relative py-20 px-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
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

        {/* Feature Split Sections */}
        <div className="space-y-0">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              index={index}
              isReverse={index % 2 === 1}
            />
          ))}
        </div>

        {/* Bottom AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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
});
