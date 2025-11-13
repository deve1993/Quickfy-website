'use client';

import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Check } from 'lucide-react';
import { TimelineConnector } from './testimonials/TimelineConnector';
import { PhaseHeader } from './testimonials/PhaseHeader';
import { StoryCard } from './testimonials/StoryCard';

interface Metrics {
  before: string;
  after: string;
  improvement: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  phase: 'problem' | 'discovery' | 'implementation' | 'results';
  phaseTitle: string;
  timeframe: string;
  metrics?: Metrics;
  emoticon: string;
}

// Phase configuration with brand colors
const phaseConfig = {
  problem: {
    gradient: 'from-red-500 via-orange-500 to-yellow-400',
    ringColor: 'ring-red-100',
    emoticon: '😰'
  },
  discovery: {
    gradient: 'from-yellow-400 via-amber-400 to-orange-400',
    ringColor: 'ring-yellow-100',
    emoticon: '💡'
  },
  implementation: {
    gradient: 'from-blue-600 via-purple-600 to-pink-600',
    ringColor: 'ring-blue-100',
    emoticon: '⚙️'
  },
  results: {
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    ringColor: 'ring-green-100',
    emoticon: '🎉'
  }
};

export const TestimonialsSection = memo(function TestimonialsSection() {
  const t = useTranslations('testimonials');

  // Updated testimonials with storytelling structure
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonial1.name'),
      role: t('testimonial1.role'),
      company: t('testimonial1.company'),
      content: t('testimonial1.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
      phase: 'problem',
      phaseTitle: 'The Problem',
      timeframe: 'Before QuickFy',
      emoticon: '😰',
      metrics: {
        before: '0%',
        after: '100%',
        improvement: '+100% Clarity'
      }
    },
    {
      id: 2,
      name: t('testimonial2.name'),
      role: t('testimonial2.role'),
      company: t('testimonial2.company'),
      content: t('testimonial2.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format',
      phase: 'discovery',
      phaseTitle: 'The Discovery',
      timeframe: 'Week 1-2',
      emoticon: '💡',
      metrics: {
        before: '0',
        after: '+60%',
        improvement: '+60% Followers'
      }
    },
    {
      id: 3,
      name: t('testimonial3.name'),
      role: t('testimonial3.role'),
      company: t('testimonial3.company'),
      content: t('testimonial3.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
      phase: 'implementation',
      phaseTitle: 'The Implementation',
      timeframe: 'Month 1',
      emoticon: '⚙️',
      metrics: {
        before: '€2000',
        after: '€2800',
        improvement: '+40% Members'
      }
    },
    {
      id: 4,
      name: t('testimonial4.name'),
      role: t('testimonial4.role'),
      company: t('testimonial4.company'),
      content: t('testimonial4.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
      phase: 'results',
      phaseTitle: 'The Results',
      timeframe: 'After 3 months',
      emoticon: '🎉',
      metrics: {
        before: '4.2⭐',
        after: '4.8⭐',
        improvement: '+60% Bookings'
      }
    }
  ];

  // Group testimonials by phase
  const phaseGroups = {
    problem: testimonials.filter(t => t.phase === 'problem'),
    discovery: testimonials.filter(t => t.phase === 'discovery'),
    implementation: testimonials.filter(t => t.phase === 'implementation'),
    results: testimonials.filter(t => t.phase === 'results')
  };

  return (
    <section className="relative py-24 overflow-hidden" id="testimonials">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6"
          >
            <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
            Client Success Stories
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
            {t('title')}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Timeline Journey */}
        <div className="relative">
          {/* Timeline Connector */}
          <TimelineConnector phaseColors={phaseConfig} />

          {/* Phase 1: Problem */}
          <div className="mb-32">
            <PhaseHeader
              phase="problem"
              phaseNumber={1}
              title={phaseGroups.problem[0]?.phaseTitle || 'Il Problema'}
              emoticon={phaseConfig.problem.emoticon}
              gradient={phaseConfig.problem.gradient}
              ringColor={phaseConfig.problem.ringColor}
            />
            <div className="space-y-8">
              {phaseGroups.problem.map((testimonial, index) => (
                <StoryCard
                  key={testimonial.id}
                  {...testimonial}
                  isLeft={index % 2 === 0}
                  gradient={phaseConfig.problem.gradient}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Phase 2: Discovery */}
          <div className="mb-32">
            <PhaseHeader
              phase="discovery"
              phaseNumber={2}
              title={phaseGroups.discovery[0]?.phaseTitle || 'La Scoperta'}
              emoticon={phaseConfig.discovery.emoticon}
              gradient={phaseConfig.discovery.gradient}
              ringColor={phaseConfig.discovery.ringColor}
            />
            <div className="space-y-8">
              {phaseGroups.discovery.map((testimonial, index) => (
                <StoryCard
                  key={testimonial.id}
                  {...testimonial}
                  isLeft={index % 2 === 1}
                  gradient={phaseConfig.discovery.gradient}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Phase 3: Implementation */}
          <div className="mb-32">
            <PhaseHeader
              phase="implementation"
              phaseNumber={3}
              title={phaseGroups.implementation[0]?.phaseTitle || "L'Implementazione"}
              emoticon={phaseConfig.implementation.emoticon}
              gradient={phaseConfig.implementation.gradient}
              ringColor={phaseConfig.implementation.ringColor}
            />
            <div className="space-y-8">
              {phaseGroups.implementation.map((testimonial, index) => (
                <StoryCard
                  key={testimonial.id}
                  {...testimonial}
                  isLeft={index % 2 === 0}
                  gradient={phaseConfig.implementation.gradient}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Phase 4: Results */}
          <div className="mb-20">
            <PhaseHeader
              phase="results"
              phaseNumber={4}
              title={phaseGroups.results[0]?.phaseTitle || 'I Risultati'}
              emoticon={phaseConfig.results.emoticon}
              gradient={phaseConfig.results.gradient}
              ringColor={phaseConfig.results.ringColor}
            />
            <div className="space-y-8">
              {phaseGroups.results.map((testimonial, index) => (
                <StoryCard
                  key={testimonial.id}
                  {...testimonial}
                  isLeft={index % 2 === 1}
                  gradient={phaseConfig.results.gradient}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Rating Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-24 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {t('trustIndicators.rating')}
                </p>
              </div>
            </motion.div>

            {/* Satisfied Clients Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-24 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {t('trustIndicators.clients')}
                </p>
              </div>
            </motion.div>

            {/* Successful Projects Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-24 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {t('trustIndicators.projects')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
