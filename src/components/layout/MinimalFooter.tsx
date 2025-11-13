'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BarChart3, Mail, Phone, MapPin, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { memo } from 'react';
import Link from 'next/link';
import { useMotionPreference } from '@/hooks/usePerformance';

export const MinimalFooter = memo(function MinimalFooter() {
  const t = useTranslations('footer');
  const tAccessibility = useTranslations('accessibility');
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
      className="bg-white border-t border-gray-200"
      role="contentinfo"
      aria-label={tAccessibility('skipLinks.footer')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Column 1: Logo & Company Info - 40% on desktop */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickFy
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 max-w-md leading-relaxed">
              {t('description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@quickfy.eu"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                aria-label={t('contact.emailAria')}
              >
                <Mail className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span>info@quickfy.eu</span>
              </a>

              <a
                href="tel:+420775113732"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                aria-label="Telefono: +420 775 113 732"
              >
                <Phone className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span>+420 775 113 732</span>
              </a>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Praga, Repubblica Ceca</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links - 30% on desktop */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
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
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              {t('followUs')}
            </h3>
            <div className="flex gap-4">
              <motion.a
                href="https://linkedin.com/company/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-600 flex items-center justify-center text-gray-600 hover:text-white transition-colors group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Seguici su LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </motion.a>

              <motion.a
                href="https://twitter.com/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-400 flex items-center justify-center text-gray-600 hover:text-white transition-colors group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Seguici su Twitter"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
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
                  href="/privacy-policy"
                  className="hover:text-blue-600 transition-colors"
                >
                  {t('links.privacy')}
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-blue-600 transition-colors"
                >
                  {t('links.terms')}
                </Link>
              </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 min-h-[56px] min-w-[56px] px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 touch-manipulation"
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label={t('backToTop')}
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium hidden sm:inline">
                {t('backToTop')}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
});
