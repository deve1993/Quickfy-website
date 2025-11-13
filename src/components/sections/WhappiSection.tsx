'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  Users,
  Zap,
  CheckCircle,
  MessageCircle,
  Send,
  Calendar,
  Play,
  Smartphone,
  Star,
  Clock,
  TrendingDown,
  AlertCircle,
  X,
  Sparkles,
  Rocket,
  Target,
  Layers,
  Gift,
  Award,
  Check,
  Percent,
  Chrome,
  Mail,
  BarChart,
  Phone,
  MessageSquare,
  Instagram
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';
import { memo } from 'react';

export const WhappiSection = memo(function WhappiSection() {
  const t = useTranslations('whappi');

  const { ref: heroRef, isIntersecting: isHeroInView } = useInView({ threshold: 0.2 });
  const { ref: demoRef, isIntersecting: isDemoInView } = useInView({ threshold: 0.1 });
  const { ref: integrationsRef, isIntersecting: isIntegrationsInView } = useInView({ threshold: 0.1 });
  const { ref: comparisonRef, isIntersecting: isComparisonInView } = useInView({ threshold: 0.1 });
  const { ref: roadmapRef, isIntersecting: isRoadmapInView } = useInView({ threshold: 0.1 });
  const { ref: pricingRef, isIntersecting: isPricingInView } = useInView({ threshold: 0.2 });

  return (
    <>

      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        id="whappi-hero"
        className="relative py-0 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 overflow-hidden"
        aria-label="Whappi messaging platform"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full mb-8"
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </div>
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                  {t('badge')}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-900"
              >
                {t('hero.title')}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-slate-600 mb-8 leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8"
              >
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-700 mb-2">{t('hero.painPoint.title')}</h3>
                    <p className="text-red-600">
                      {t('hero.painPoint.description')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href="#whappi-preorder"
                  className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="relative z-10">{t('hero.cta.pricing')}</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Visual Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Mobile + Desktop Mockup */}
              <div className="relative">
                {/* Desktop Dashboard */}
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 mb-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="flex-1 bg-white/90 rounded px-3 py-1 text-xs text-slate-600">whappi.quickfy.com</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/90 rounded px-3 py-2 text-sm text-slate-700">WhatsApp Integration Active</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/90 rounded px-3 py-2 text-sm text-slate-700">Telegram Connected</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/90 rounded px-3 py-2 text-sm text-slate-700">Team: 5 Members Online</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile App Mockup */}
                <div className="absolute -bottom-4 -right-4 w-32 h-56 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-3 shadow-lg">
                  <div className="w-full h-4 bg-slate-200 rounded-full mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-300 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="h-2 bg-slate-300 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section
        ref={demoRef}
        id="whappi-features"
        className="relative py-0 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 overflow-hidden"
        aria-label="Whappi product demo"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isDemoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('demo.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isDemoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
            >
              {t('demo.subtitle')}
            </motion.p>
          </div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isDemoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative aspect-video bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto hover:scale-110 transition-transform cursor-pointer shadow-lg">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Product Demo</h3>
                  <p className="text-slate-600">Coming Soon - Q2 2026</p>
                </div>
              </div>

              {/* Mockup Interface */}
              <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1 text-xs text-slate-600 text-center">Whappi Dashboard Preview</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-xs text-green-700">WhatsApp</span>
                  </div>
                  <div className="h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs text-blue-700">Telegram</span>
                  </div>
                  <div className="h-8 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-xs text-purple-700">Meta</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Integrations Visual */}
      <section
        ref={integrationsRef}
        id="whappi-integrations"
        className="relative py-0 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 overflow-hidden"
        aria-label="Whappi platform integrations"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isIntegrationsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Chrome className="w-4 h-4" />
              {t('integrations.chromeExtension')}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('integrations.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
            >
              {t('integrations.subtitle')}
            </motion.p>
          </div>

          {/* Tool Logos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
              {t('integrations.worksInsideTools')}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Gmail */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-red-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.tools.gmail.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.tools.gmail.type')}</div>
                </div>
              </motion.div>

              {/* HubSpot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-orange-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.tools.hubspot.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.tools.hubspot.type')}</div>
                </div>
              </motion.div>

              {/* Salesforce */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.tools.salesforce.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.tools.salesforce.type')}</div>
                </div>
              </motion.div>

              {/* Pipedrive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-green-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BarChart className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.tools.pipedrive.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.tools.pipedrive.type')}</div>
                </div>
              </motion.div>

              {/* Zendesk */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-teal-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.tools.zendesk.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.tools.zendesk.type')}</div>
                </div>
              </motion.div>

              {/* +More */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.65 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-slate-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">+</span>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.tools.more.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.tools.more.type')}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 7 Messaging Channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
              {t('integrations.allChannelsUnified')}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {/* WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-green-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.platforms.whatsapp.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.platforms.whatsapp.type')}</div>
                </div>
              </motion.div>

              {/* Facebook Messenger */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.65 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.platforms.facebook.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.platforms.facebook.type')}</div>
                </div>
              </motion.div>

              {/* Instagram */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-pink-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.platforms.instagram.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.platforms.instagram.type')}</div>
                </div>
              </motion.div>

              {/* Telegram */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.75 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Send className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.platforms.telegram.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.platforms.telegram.type')}</div>
                </div>
              </motion.div>

              {/* Viber */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.platforms.viber.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.platforms.viber.type')}</div>
                </div>
              </motion.div>

              {/* SMS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.85 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.platforms.sms.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.platforms.sms.type')}</div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-orange-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 text-sm">{t('integrations.platforms.email.name')}</div>
                  <div className="text-xs text-slate-600">{t('integrations.platforms.email.type')}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Chrome Web Store Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntegrationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border-2 border-slate-200">
              <Chrome className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <div className="text-xs text-slate-500 font-semibold">Available on</div>
                <div className="text-lg font-bold text-slate-900">Chrome Web Store</div>
              </div>
              <div className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                Coming Q2 2026
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Comparison */}
      <section
        ref={comparisonRef}
        id="whappi-comparison"
        className="relative py-0 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 overflow-hidden"
        aria-label="Whappi competitive comparison"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isComparisonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('comparison.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isComparisonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
            >
              {t('comparison.subtitle')}
            </motion.p>
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isComparisonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-blue-200 overflow-hidden transition-all duration-300 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 text-center">{t('comparison.tableTitle')}</h3>
            </div>

            {/* Comparison content would continue here - keeping the rest of the comparison section as is */}
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                {/* Feature Column */}
                <div className="flex flex-col">
                  <div className="font-bold text-slate-900 text-base h-12 flex items-center justify-center">{t('comparison.columnHeaders.feature')}</div>
                  <div className="text-xs text-slate-700 h-16 flex items-center justify-center border-t border-slate-100">{t('comparison.features.cost')}</div>
                  <div className="text-xs text-slate-700 h-12 flex items-center justify-center border-t border-slate-100">{t('comparison.features.multiPlatform')}</div>
                  <div className="text-xs text-slate-700 h-12 flex items-center justify-center border-t border-slate-100">{t('comparison.features.teamCollaboration')}</div>
                  <div className="text-xs text-slate-700 h-16 flex items-center justify-center border-t border-slate-100">{t('comparison.features.gdpr')}</div>
                  <div className="text-xs text-slate-700 h-16 flex items-center justify-center border-t border-slate-100">{t('comparison.features.setup')}</div>
                  <div className="text-xs text-slate-700 h-12 flex items-center justify-center border-t border-slate-100">{t('comparison.features.smb')}</div>
                </div>

                {/* Whappi Column */}
                <div className="flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3">
                  <div className="font-bold text-blue-700 text-base h-12 flex items-center justify-center">{t('comparison.whappi.name')}</div>
                  <div className="h-16 flex flex-col items-center justify-center border-t border-blue-100">
                    <div className="text-lg font-bold text-green-600">{t('comparison.whappi.pricing')}</div>
                    <div className="text-xs text-slate-600">{t('comparison.whappi.pricingUnit')}</div>
                  </div>
                  <div className="h-12 flex items-center justify-center border-t border-blue-100"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                  <div className="h-12 flex items-center justify-center border-t border-blue-100"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                  <div className="h-16 flex flex-col items-center justify-center border-t border-blue-100">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="text-xs text-slate-600 mt-1">{t('comparison.whappi.gdprNote')}</div>
                  </div>
                  <div className="h-16 flex flex-col items-center justify-center border-t border-blue-100">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="text-xs text-slate-600 mt-1">{t('comparison.whappi.setupNote')}</div>
                  </div>
                  <div className="h-12 flex items-center justify-center border-t border-blue-100"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                </div>

                {/* Competitors Column */}
                <div className="flex flex-col">
                  <div className="font-bold text-slate-700 text-base h-12 flex items-center justify-center">{t('comparison.competitors.name')}</div>
                  <div className="h-16 flex flex-col items-center justify-center border-t border-slate-100">
                    <div className="text-lg font-bold text-red-600">{t('comparison.competitors.pricing')}</div>
                    <div className="text-xs text-slate-600">{t('comparison.competitors.pricingUnit')}</div>
                  </div>
                  <div className="h-12 flex items-center justify-center border-t border-slate-100"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                  <div className="h-12 flex items-center justify-center border-t border-slate-100"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                  <div className="h-16 flex flex-col items-center justify-center border-t border-slate-100">
                    <CheckCircle className="w-5 h-5 text-yellow-500" />
                    <div className="text-xs text-slate-600 mt-1">{t('comparison.competitors.gdprNote')}</div>
                  </div>
                  <div className="h-16 flex flex-col items-center justify-center border-t border-slate-100">
                    <X className="w-5 h-5 text-red-500" />
                    <div className="text-xs text-slate-600 mt-1">{t('comparison.competitors.setupNote')}</div>
                  </div>
                  <div className="h-12 flex items-center justify-center border-t border-slate-100"><X className="w-5 h-5 text-red-500" /></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPACT Development Roadmap Section */}
      <section
        ref={roadmapRef}
        id="whappi-roadmap"
        className="relative py-0 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 overflow-hidden"
        aria-label="Whappi development roadmap"
      >
        {/* Enhanced Background with Animated Gradients */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            // Deterministic pseudo-random values based on index to prevent hydration mismatch
            const seedY = (i * 67) % 100 + 50; // Initial y position (50-150)
            const seedX = (i * 37) % 100; // Initial x position (0-100)
            const seedLeft = (i * 47 + 13) % 100; // Left percentage (0-100)
            const seedTop = (i * 73 + 7) % 100; // Top percentage (0-100)
            const seedDuration = 3 + ((i * 23) % 20) / 10; // Duration (3-5)
            const seedDelay = ((i * 31) % 30) / 10; // Delay (0-3)
            const seedRepeatDelay = ((i * 19) % 20) / 10; // Repeat delay (0-2)
            const animateX = ((i * 53 + 29) % 200); // Animated x position (0-200)

            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: seedY,
                  x: seedX
                }}
                animate={isRoadmapInView ? {
                  opacity: [0, 1, 0],
                  y: -100,
                  x: animateX
                } : {}}
                transition={{
                  duration: seedDuration,
                  delay: seedDelay,
                  repeat: Infinity,
                  repeatDelay: seedRepeatDelay
                }}
                className="absolute"
                style={{
                  left: `${seedLeft}%`,
                  top: `${seedTop}%`,
                }}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
              </motion.div>
            );
          })}
        </div>

        <div className="relative max-w-7xl mx-auto py-16">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isRoadmapInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border-2 border-blue-200/60 rounded-full px-6 py-3 mb-6 shadow-xl"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
                <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                Development Roadmap
              </span>
              <Rocket className="w-4 h-4 text-orange-500" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isRoadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight"
            >
              Journey to{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Q2 2026 Launch
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isRoadmapInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full origin-left"
                />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isRoadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            >
              Track our progress as we build the future of small business messaging
            </motion.p>
          </div>

          {/* Enhanced Timeline Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Animated Timeline Spine with Gradient Flow */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 overflow-hidden rounded-full">
              {/* Background spine */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isRoadmapInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-b from-green-400 via-blue-500 via-purple-500 to-orange-500 origin-top shadow-lg"
              />

              {/* Animated flowing light */}
              <motion.div
                initial={{ y: '-100%', opacity: 0 }}
                animate={isRoadmapInView ? {
                  y: '300%',
                  opacity: [0, 1, 1, 0]
                } : { y: '-100%', opacity: 0 }}
                transition={{
                  duration: 4,
                  delay: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
                className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-white to-transparent"
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-16 md:space-y-20">
              {/* Q3 2024 - Completed */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={isRoadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative flex items-center"
              >
                {/* Mobile/Tablet: Left-aligned layout */}
                <div className="md:hidden w-full pl-20">
                  <RoadmapCard
                    color="green"
                    status="COMPLETED"
                    progress={100}
                    date="September 2024"
                    title="Core Platform Architecture"
                    description="Foundation systems completed including security framework, database architecture, and core API development."
                    features={[
                      { label: "Security Layer", status: "✓ Implemented" },
                      { label: "Core APIs", status: "✓ Ready" }
                    ]}
                    icon={<Layers className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.0}
                  />
                </div>

                {/* Desktop: Right side content */}
                <div className="hidden md:block flex-1 pr-16">
                  <RoadmapCard
                    color="green"
                    status="COMPLETED"
                    progress={100}
                    date="September 2024"
                    title="Core Platform Architecture"
                    description="Foundation systems completed including security framework, database architecture, and core API development."
                    features={[
                      { label: "Security Layer", status: "✓ Implemented" },
                      { label: "Core APIs", status: "✓ Ready" }
                    ]}
                    icon={<Layers className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.0}
                    align="right"
                  />
                </div>

                {/* Timeline Node */}
                <TimelineNode
                  color="green"
                  icon={<CheckCircle className="w-4 h-4" />}
                  isInView={isRoadmapInView}
                  delay={1.0}
                />

                <div className="hidden md:block flex-1 pl-16"></div>
              </motion.div>

              {/* Q4 2024 - In Progress */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={isRoadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="relative flex items-center"
              >
                {/* Mobile/Tablet: Left-aligned layout */}
                <div className="md:hidden w-full pl-20">
                  <RoadmapCard
                    color="blue"
                    status="IN PROGRESS"
                    progress={75}
                    date="December 2024"
                    title="Platform Integrations"
                    description="Active development of WhatsApp Business API, Telegram Bot API, and Meta Messenger integrations."
                    features={[
                      { label: "WhatsApp API", status: "🚧 In Development" },
                      { label: "Telegram Bot", status: "🚧 Testing Phase" }
                    ]}
                    icon={<Target className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.2}
                    pulsing
                  />
                </div>

                {/* Desktop: Left side empty, right side content */}
                <div className="hidden md:block flex-1 pr-16"></div>

                {/* Timeline Node */}
                <TimelineNode
                  color="blue"
                  icon={<Clock className="w-4 h-4" />}
                  isInView={isRoadmapInView}
                  delay={1.2}
                  pulsing
                />

                <div className="hidden md:block flex-1 pl-16">
                  <RoadmapCard
                    color="blue"
                    status="IN PROGRESS"
                    progress={75}
                    date="December 2024"
                    title="Platform Integrations"
                    description="Active development of WhatsApp Business API, Telegram Bot API, and Meta Messenger integrations."
                    features={[
                      { label: "WhatsApp API", status: "🚧 In Development" },
                      { label: "Telegram Bot", status: "🚧 Testing Phase" }
                    ]}
                    icon={<Target className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.2}
                    align="left"
                    pulsing
                  />
                </div>
              </motion.div>

              {/* Q1 2025 - Planned */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={isRoadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="relative flex items-center"
              >
                {/* Mobile/Tablet: Left-aligned layout */}
                <div className="md:hidden w-full pl-20">
                  <RoadmapCard
                    color="purple"
                    status="PLANNED"
                    progress={25}
                    date="March 2025"
                    title="Advanced Team Features"
                    description="Team collaboration tools, conversation assignment, internal notes, and user management systems."
                    features={[
                      { label: "Team Management", status: "📋 Design Phase" },
                      { label: "Collaboration", status: "📋 Planned" }
                    ]}
                    icon={<Users className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.4}
                  />
                </div>

                {/* Desktop: Right side content */}
                <div className="hidden md:block flex-1 pr-16">
                  <RoadmapCard
                    color="purple"
                    status="PLANNED"
                    progress={25}
                    date="March 2025"
                    title="Advanced Team Features"
                    description="Team collaboration tools, conversation assignment, internal notes, and user management systems."
                    features={[
                      { label: "Team Management", status: "📋 Design Phase" },
                      { label: "Collaboration", status: "📋 Planned" }
                    ]}
                    icon={<Users className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.4}
                    align="right"
                  />
                </div>

                {/* Timeline Node */}
                <TimelineNode
                  color="purple"
                  icon={<Calendar className="w-4 h-4" />}
                  isInView={isRoadmapInView}
                  delay={1.4}
                />

                <div className="hidden md:block flex-1 pl-16"></div>
              </motion.div>

              {/* Q2 2026 - Launch Ready */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={isRoadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="relative flex items-center"
              >
                {/* Mobile/Tablet: Left-aligned layout */}
                <div className="md:hidden w-full pl-20">
                  <RoadmapCard
                    color="orange"
                    status="🚀 LAUNCH READY"
                    progress={10}
                    date="March 2026"
                    title="Full Platform Launch"
                    description="Complete platform ready with all features, mobile applications, comprehensive documentation, and 24/7 support."
                    features={[
                      { label: "Mobile Apps", status: "🎯 Ready for Launch" },
                      { label: "24/7 Support", status: "🎯 Full Service" }
                    ]}
                    icon={<Rocket className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.6}
                    isLaunch
                  />
                </div>

                {/* Desktop: Left side empty, right side content */}
                <div className="hidden md:block flex-1 pr-16"></div>

                {/* Timeline Node - Special Launch Node */}
                <div className="absolute left-8 md:left-1/2 md:-ml-3 z-20">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isRoadmapInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 200 }}
                    className="relative w-6 h-6 md:w-8 md:h-8"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-ping opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </motion.div>
                </div>

                <div className="hidden md:block flex-1 pl-16">
                  <RoadmapCard
                    color="orange"
                    status="🚀 LAUNCH READY"
                    progress={10}
                    date="March 2026"
                    title="Full Platform Launch"
                    description="Complete platform ready with all features, mobile applications, comprehensive documentation, and 24/7 support."
                    features={[
                      { label: "Mobile Apps", status: "🎯 Ready for Launch" },
                      { label: "24/7 Support", status: "🎯 Full Service" }
                    ]}
                    icon={<Rocket className="w-5 h-5" />}
                    isInView={isRoadmapInView}
                    delay={1.6}
                    align="left"
                    isLaunch
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ULTRA COMPACT Progress Summary Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isRoadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative bg-white/90 backdrop-blur-2xl border-2 border-slate-200/60 rounded-3xl p-6 shadow-2xl overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 via-purple-500 to-orange-500"></div>

              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isRoadmapInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 2.0, type: "spring" }}
                  className="inline-block mb-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Development Progress Overview</h3>
                <p className="text-sm text-slate-600">Real-time development milestones tracking our journey to launch</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <ProgressStat
                  value="100%"
                  label="Core Platform"
                  color="green"
                  isInView={isRoadmapInView}
                  delay={2.1}
                />
                <ProgressStat
                  value="75%"
                  label="Integrations"
                  color="blue"
                  isInView={isRoadmapInView}
                  delay={2.2}
                />
                <ProgressStat
                  value="25%"
                  label="Team Features"
                  color="purple"
                  isInView={isRoadmapInView}
                  delay={2.3}
                />
                <ProgressStat
                  value="Q2 2026"
                  label="Launch Target"
                  color="orange"
                  isInView={isRoadmapInView}
                  delay={2.4}
                  isSpecial
                />
              </div>

              {/* Call to Action - MORE COMPACT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isRoadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 2.5 }}
                className="mt-6 pt-4 border-t border-slate-200 text-center"
              >
                <p className="text-xs text-slate-600 mb-2">
                  🎉 Pre-order now and save <span className="font-bold text-orange-600">24%</span> off regular pricing
                </p>
                <Link
                  href="#whappi-preorder"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  Secure Your Pre-Order
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED Pricing Section with Original Text */}
      <section
        ref={pricingRef}
        id="whappi-preorder"
        className="relative py-0 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 overflow-hidden"
        aria-label="Whappi pricing"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isPricingInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-200 rounded-full px-6 py-3 mb-6 shadow-lg"
            >
              <Gift className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">
                Limited Time Pre-Order Offer
              </span>
              <Sparkles className="w-5 h-5 text-orange-600" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('pricing.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
            >
              {t('pricing.subtitle')}
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Pre-Order Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isPricingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

              <div className="relative bg-white rounded-2xl border-2 border-orange-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Badge */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 px-3">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-xs">
                    <Award className="w-4 h-4" />
                    {t('pricing.preorder.badge')}
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <div className="pt-14 p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                    {t('pricing.preorder.title')}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="flex items-start justify-center gap-1 mb-1">
                      <span className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {t('pricing.preorder.price')}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">{t('pricing.preorder.subtitle')}</p>
                  </div>

                  {/* Savings Badge */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg p-2.5 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <Percent className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-green-700 text-xs">{t('pricing.preorder.savings')}</span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">Tutto Incluso</h4>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-xs leading-tight">{t('pricing.features.0')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-xs leading-tight">{t('pricing.features.1')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-xs leading-tight">{t('pricing.features.2')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-xs leading-tight">Made in Czech Republic - GDPR Garantito</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="#contact"
                    className="group/btn relative w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-3"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="relative z-10">{t('pricing.preorder.cta')}</span>
                  </Link>

                  {/* Launch Date */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs">
                      <Rocket className="w-3.5 h-3.5 text-orange-500" />
                      <span>Launch: Q2 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Regular Price Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isPricingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl border-2 border-slate-300 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Badge */}
                <div className="bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 text-center py-2 px-3">
                  <div className="font-bold text-xs">Standard Pricing</div>
                </div>

                <div className="pt-8 p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                    {t('pricing.regular.title')}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <div className="flex items-start justify-center gap-1 mb-1">
                        <span className="text-4xl font-black text-slate-400 line-through decoration-red-500 decoration-2">
                          {t('pricing.regular.price')}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs">{t('pricing.regular.subtitle')}</p>
                  </div>

                  {/* Comparison */}
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-2.5 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span className="text-slate-700 text-xs">Pre-order ti fa risparmiare <span className="font-bold text-red-600">€14/anno</span></span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">Tutto Incluso</h4>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-500 text-xs leading-tight">{t('pricing.features.0')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-500 text-xs leading-tight">{t('pricing.features.1')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-500 text-xs leading-tight">{t('pricing.features.2')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-500 text-xs leading-tight">Made in Czech Republic - GDPR Garantito</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-slate-300 text-slate-500 font-bold text-sm rounded-xl cursor-not-allowed mb-3"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{t('pricing.regular.cta')}</span>
                  </button>

                  {/* Note */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{t('pricing.regular.note')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
});

// Reusable Roadmap Card Component - ULTRA COMPACT
interface RoadmapCardProps {
  color: 'green' | 'blue' | 'purple' | 'orange';
  status: string;
  progress: number;
  date: string;
  title: string;
  description: string;
  features: Array<{ label: string; status: string }>;
  icon: React.ReactNode;
  isInView: boolean;
  delay: number;
  align?: 'left' | 'right';
  pulsing?: boolean;
  isLaunch?: boolean;
}

const RoadmapCard = memo(function RoadmapCard({
  color,
  status,
  progress,
  date,
  title,
  description,
  features,
  icon,
  isInView,
  delay,
  align = 'left',
  pulsing = false,
  isLaunch = false
}: RoadmapCardProps) {
  const colorClasses = {
    green: {
      bg: 'from-green-50/90 to-emerald-50/70',
      border: 'border-green-200/60 hover:border-green-300/80',
      badge: 'bg-green-100 text-green-700 border-green-200',
      progress: '#10b981',
      text: 'text-green-600',
      featureBg: 'bg-green-50',
      featureBorder: 'border-green-200'
    },
    blue: {
      bg: 'from-blue-50/90 to-cyan-50/70',
      border: 'border-blue-200/60 hover:border-blue-300/80',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      progress: '#3b82f6',
      text: 'text-blue-600',
      featureBg: 'bg-blue-50',
      featureBorder: 'border-blue-200'
    },
    purple: {
      bg: 'from-purple-50/90 to-pink-50/70',
      border: 'border-purple-200/60 hover:border-purple-300/80',
      badge: 'bg-purple-100 text-purple-700 border-purple-200',
      progress: '#8b5cf6',
      text: 'text-purple-600',
      featureBg: 'bg-purple-50',
      featureBorder: 'border-purple-200'
    },
    orange: {
      bg: 'from-orange-50/90 to-red-50/70',
      border: 'border-orange-200/60 hover:border-orange-300/80',
      badge: 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200',
      progress: '#f97316',
      text: 'text-orange-600',
      featureBg: 'bg-gradient-to-br from-orange-50 to-red-50',
      featureBorder: 'border-orange-200'
    }
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      className={`
        group relative bg-gradient-to-br ${classes.bg} backdrop-blur-2xl
        border-2 ${classes.border} rounded-2xl p-4
        shadow-lg hover:shadow-xl transition-all duration-500
        transform hover:scale-105 ${align === 'right' ? 'text-right' : ''}
        ${isLaunch ? 'ring-2 ring-orange-300 ring-opacity-50' : ''}
      `}
    >
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white/30 rounded-2xl backdrop-blur-sm"></div>

      {/* Progress Indicator - ULTRA COMPACT */}
      <div className={`relative flex items-center ${align === 'right' ? 'justify-end' : ''} gap-2 mb-3`}>
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#e5e7eb"
              strokeWidth="3"
              fill="none"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              stroke={classes.progress}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: progress / 100 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: delay + 0.3, ease: "easeInOut" }}
              strokeDasharray="125.6"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${classes.text}`}>
              {icon}
            </div>
          </div>
        </div>

        <div className={align === 'right' ? 'text-right' : ''}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold ${classes.badge} px-2 py-0.5 rounded-full border ${pulsing ? 'animate-pulse' : ''}`}>
              {status}
            </span>
            <div className={`text-xs ${classes.text} font-semibold`}>{progress}%</div>
          </div>
          <div className="text-xs text-slate-500 font-medium">{date}</div>
        </div>
      </div>

      <h3 className={`relative text-base md:text-lg font-bold text-slate-900 mb-2 ${isLaunch ? 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent' : ''}`}>
        {title}
      </h3>

      <p className="relative text-slate-700 mb-3 leading-relaxed text-xs">
        {description}
      </p>

      {/* Feature Highlights - ULTRA COMPACT */}
      <div className="relative grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'right' ? 20 : -20 }}
            transition={{ duration: 0.6, delay: delay + 0.4 + (index * 0.1) }}
            className={`${classes.featureBg} border ${classes.featureBorder} rounded-lg p-2 hover:scale-105 transition-transform`}
          >
            <div className={`text-xs font-semibold ${classes.text} mb-0.5`}>{feature.label}</div>
            <div className="text-xs text-slate-600">{feature.status}</div>
          </motion.div>
        ))}
      </div>

      {/* Launch Special CTA - ULTRA COMPACT */}
      {isLaunch && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: delay + 0.8 }}
          className="relative mt-3 pt-3 border-t border-orange-200/60"
        >
          <div className="text-center">
            <div className="text-xs text-orange-700 font-bold mb-2">🎉 Pre-order now and save 24%</div>
            <div className="inline-flex items-center gap-2 bg-white/90 border-2 border-orange-300 rounded-full px-3 py-1.5 text-xs font-semibold text-orange-700 shadow-lg">
              <Calendar className="w-3 h-3" />
              Expected Launch: Q2 2026
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

// Timeline Node Component - COMPACT
interface TimelineNodeProps {
  color: 'green' | 'blue' | 'purple' | 'orange';
  icon: React.ReactNode;
  isInView: boolean;
  delay: number;
  pulsing?: boolean;
}

const TimelineNode = memo(function TimelineNode({
  color,
  icon,
  isInView,
  delay,
  pulsing = false
}: TimelineNodeProps) {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-gradient-to-r from-orange-500 to-red-500'
  };

  return (
    <div className="absolute left-8 md:left-1/2 md:-ml-2.5 z-20">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
        className="relative w-5 h-5 md:w-6 md:h-6"
      >
        <div className={`absolute inset-0 ${colorClasses[color]} rounded-full border-4 border-white shadow-xl ${pulsing ? 'animate-pulse' : ''}`}></div>
        {pulsing && (
          <div className={`absolute inset-0 ${colorClasses[color]} rounded-full animate-ping opacity-30`}></div>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
          {icon}
        </div>
      </motion.div>
    </div>
  );
});

// Progress Stat Component - COMPACT
interface ProgressStatProps {
  value: string;
  label: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
  isInView: boolean;
  delay: number;
  isSpecial?: boolean;
}

const ProgressStat = memo(function ProgressStat({
  value,
  label,
  color,
  isInView,
  delay,
  isSpecial = false
}: ProgressStatProps) {
  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
      className="text-center p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
    >
      <div className={`text-2xl font-black mb-1 ${isSpecial ? colorClasses.orange : colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-xs font-medium text-slate-600">{label}</div>
    </motion.div>
  );
});
