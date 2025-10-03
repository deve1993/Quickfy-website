'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  PlayCircle,
  Clock,
  Zap,
  Users,
  BarChart3,
  Target,
  LucideIcon,
  Sparkles,
  TrendingUp,
  Calendar,
  Hammer
} from 'lucide-react';

interface RoadmapItem {
  quarter: string;
  status: 'completed' | 'current' | 'future';
  title: string;
  features: string[];
  icon: LucideIcon;
  progress?: number;
}

export function RoadmapSection() {
  const t = useTranslations();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Function to determine roadmap status - Q4 2025 is current (launch phase), others are future
  const getRoadmapStatus = (quarter: string): RoadmapItem['status'] => {
    if (quarter === 'Q4 2025') {
      return 'current';
    }
    return 'future';
  };

  const getStatusConfig = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return {
          statusIcon: CheckCircle2,
          statusLabel: 'Completed',
          gradient: 'from-blue-600 to-purple-600',
          hoverGradient: 'from-blue-700 to-purple-700',
          textColor: 'text-blue-700',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-100',
          progress: 100,
        };
      case 'current':
        return {
          statusIcon: PlayCircle,
          statusLabel: 'In Development',
          gradient: 'from-purple-600 to-pink-600',
          hoverGradient: 'from-purple-700 to-pink-700',
          textColor: 'text-purple-700',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-100',
          progress: 65,
        };
      case 'future':
        return {
          statusIcon: Clock,
          statusLabel: 'Planning',
          gradient: 'from-slate-600 to-gray-600',
          hoverGradient: 'from-slate-700 to-gray-700',
          textColor: 'text-slate-700',
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-100',
          progress: 0,
        };
    }
  };

  const getItemProgress = (quarter: string, status: RoadmapItem['status']): number => {
    if (status === 'completed') return 100;
    if (quarter === 'Q4 2025') return 55; // Launch and Consolidation phase specific progress
    return 0;
  };

  // Memoize roadmap items to prevent unnecessary recalculations
  const roadmapItems: RoadmapItem[] = useMemo(() => {
    const items = [];

    for (let i = 0; i < 4; i++) {
      const quarter = t(`roadmap.items.${i}.quarter`);
      const status = getRoadmapStatus(quarter);
      const icons = [BarChart3, Target, Users, Zap];

      items.push({
        quarter,
        status,
        title: t(`roadmap.items.${i}.title`),
        features: [
          t(`roadmap.items.${i}.features.0`),
          t(`roadmap.items.${i}.features.1`),
          t(`roadmap.items.${i}.features.2`),
        ],
        icon: icons[i],
        progress: getItemProgress(quarter, status),
      });
    }

    return items;
  }, [t]);

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (progress: number) => ({
      width: `${progress}%`,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.3,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative py-0 px-4 overflow-hidden bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Development Journey</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {t('roadmap.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('roadmap.titleHighlight')}
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
            {t('roadmap.subtitle')}
          </p>
        </motion.div>

        {/* Roadmap Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {roadmapItems.map((item, index) => {
            const config = getStatusConfig(item.status);
            const StatusIcon = config.statusIcon;
            const ItemIcon = item.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={cn('group relative', activeCard === index && 'z-10')}
              >
                <div className={`relative h-full min-h-[500px] p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 overflow-hidden flex flex-col`}>

                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Decorative Circle */}
                  <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${config.gradient} opacity-10 group-hover:opacity-20 rounded-full transition-opacity duration-500`}></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Quarter and Status Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${config.gradient} shadow-md`}>
                          <ItemIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.bgColor} ${config.borderColor} border rounded-full text-xs font-semibold ${config.textColor}`}>
                          <Calendar className="w-3 h-3" />
                          {item.quarter}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                    </div>

                    {/* Status Section - Similar to PricingSection's "Perfect For" */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-start space-x-2">
                        <StatusIcon className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-slate-700 mb-1">Status</h4>
                          <div className="text-xs text-slate-600 flex items-center gap-2">
                            {config.statusLabel}
                            <span className="inline-block w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <motion.div
                                custom={item.progress}
                                variants={progressVariants}
                                className={`h-full rounded-full transition-all duration-300 ${
                                  item.quarter === 'Q4 2025'
                                    ? `bg-slate-400 group-hover:bg-gradient-to-r group-hover:${config.gradient}`
                                    : `bg-gradient-to-r ${config.gradient}`
                                }`}
                              />
                            </span>
                            {item.progress}%
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* Features List */}
                    <div className="mb-6 flex-grow">
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">Features</h4>
                      <ul className="space-y-2">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <div className={`p-1 rounded-full bg-gradient-to-r ${config.gradient} flex-shrink-0 mt-0.5`}>
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-slate-600 text-xs">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <motion.div
                      className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 mt-auto border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.quarter === 'Q4 2025' ? (
                        <>
                          <Hammer className="w-4 h-4" />
                          <span>Work in Progress</span>
                        </>
                      ) : item.status === 'current' ? (
                        <>
                          <PlayCircle className="w-4 h-4" />
                          <span>View Progress</span>
                        </>
                      ) : item.status === 'completed' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          <span>Coming Soon</span>
                        </>
                      )}
                    </motion.div>

                    {/* Bottom Accent Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl z-10`}></div>
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
              {t('roadmap.cta')}
            </h3>
            <p className="text-base md:text-lg text-slate-600 mb-8">
              Stay updated with our development progress and be the first to access new features.
            </p>
            <motion.button
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Follow Our Progress
            </motion.button>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-slate-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>{roadmapItems.filter(item => item.status === 'completed').length} Features Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-purple-500" />
              <span>{roadmapItems.filter(item => item.status === 'current').length} In Development</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{roadmapItems.filter(item => item.status === 'future').length} Planned</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}