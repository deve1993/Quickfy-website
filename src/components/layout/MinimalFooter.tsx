'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, ArrowUp, Facebook, Instagram } from 'lucide-react';
import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionPreference } from '@/hooks/usePerformance';

export const MinimalFooter = memo(function MinimalFooter() {
  const t = useTranslations('footer');
  const tAccessibility = useTranslations('accessibility');
  const locale = useLocale();
  const { shouldReduceMotion } = useMotionPreference();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20 border-t-2 border-blue-200/50"
      role="contentinfo"
      aria-label={tAccessibility('skipLinks.footer')}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Column 1: Logo & Company Info - 40% on desktop */}
          <div className="lg:col-span-5">
            {/* Logo - Same as Header */}
            <div className="flex items-center gap-3 mb-4 group">
              <motion.div
                className="relative w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/screenshots/logo nav bar.png"
                  alt="QuickFy Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </motion.div>
              <span className="text-2xl font-bold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                QuickFy
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 max-w-md leading-relaxed">
              {t('description')}
            </p>

            {/* Contact Info - Con icone colorate */}
            <div className="space-y-3">
              <a
                href="mailto:info@quickfy.eu"
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 transition-all group"
                aria-label={t('contact.emailAria')}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                  <Mail className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-medium">info@quickfy.eu</span>
              </a>

              <a
                href="tel:+420775113732"
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-purple-600 transition-all group"
                aria-label="Telefono: +420 775 113 732"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                  <Phone className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-medium">+420 775 113 732</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-medium">Praga, Repubblica Ceca</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links - 30% on desktop */}
          <div className="lg:col-span-4">
            <h3 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-5 uppercase tracking-wide">
              {t('quickLinks')}
            </h3>
            <nav aria-label="Link rapidi footer">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      Funzionalità
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      Vantaggi
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      Prezzi
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      Testimonianze
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      Contatti
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Social Links - 30% on desktop */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-5 uppercase tracking-wide">
              {t('followUs')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/company/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Seguici su LinkedIn"
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </motion.a>

              {/* Facebook */}
              <motion.a
                href="https://facebook.com/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Seguici su Facebook"
              >
                <Facebook className="w-6 h-6" aria-hidden="true" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://instagram.com/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Seguici su Instagram"
              >
                <Instagram className="w-6 h-6" aria-hidden="true" />
              </motion.a>

              {/* X (Twitter) */}
              <motion.a
                href="https://x.com/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Seguici su X (Twitter)"
              >
                {/* X Logo - Custom SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright & Legal Links */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <span>© {currentYear} QuickFy. {t('copyright')}</span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <div className="flex items-center gap-4">
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t('links.privacy')}
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href={`/${locale}/terms-and-conditions`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t('links.terms')}
                </Link>
              </div>
            </div>

            {/* Back to Top Button - Colorato */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 min-h-[56px] min-w-[56px] px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 touch-manipulation"
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label={t('backToTop')}
            >
              <ArrowUp className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-semibold hidden sm:inline">
                {t('backToTop')}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
});
