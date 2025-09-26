'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isLoading] = useState(false);
  const t = useTranslations('navigation');
  const pathname = usePathname();

  // Refs for keyboard navigation
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Check if we're on the home page (any locale home page)
  const isHomePage = pathname === '/' || pathname.match(/^\/[a-z]{2}$/);

  const navigationItems = [
    { id: 'features', label: t('features') },
    { id: 'benefits', label: t('benefits') },
    { id: 'pricing', label: t('pricing') },
    { id: 'testimonials', label: t('testimonials') },
    { id: 'contact', label: t('contact') }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMenuOpen) return;

      const totalItems = navigationItems.length + 1; // +1 for CTA button

      switch (e.key) {
        case 'Escape':
          setIsMenuOpen(false);
          setFocusedIndex(-1);
          menuButtonRef.current?.focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev < totalItems - 1 ? prev + 1 : 0;
            navigationItemsRef.current[next]?.focus();
            return next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev > 0 ? prev - 1 : totalItems - 1;
            navigationItemsRef.current[next]?.focus();
            return next;
          });
          break;

        case 'Home':
          e.preventDefault();
          setFocusedIndex(0);
          navigationItemsRef.current[0]?.focus();
          break;

        case 'End':
          e.preventDefault();
          setFocusedIndex(totalItems - 1);
          navigationItemsRef.current[totalItems - 1]?.focus();
          break;

        case 'Tab':
          // Allow natural tab navigation but update focus index
          if (!e.shiftKey && focusedIndex === totalItems - 1) {
            // Tab out of menu
            setIsMenuOpen(false);
            setFocusedIndex(-1);
          } else if (e.shiftKey && focusedIndex === 0) {
            // Shift+Tab to menu button
            e.preventDefault();
            menuButtonRef.current?.focus();
            setIsMenuOpen(false);
            setFocusedIndex(-1);
          }
          break;

        case 'Enter':
        case ' ':
          if (focusedIndex >= 0) {
            e.preventDefault();
            navigationItemsRef.current[focusedIndex]?.click();
          }
          break;
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scroll when menu is open
      document.body.style.overflow = 'hidden';

      // Focus first item when menu opens
      setTimeout(() => {
        if (navigationItemsRef.current[0]) {
          navigationItemsRef.current[0].focus();
          setFocusedIndex(0);
        }
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      setFocusedIndex(-1);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, focusedIndex, navigationItems.length]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mobile-menu]')) {
        setIsMenuOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      // If we're on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMenuOpen(false);
        setFocusedIndex(-1);
      }
    } else {
      // If we're not on home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleBrandClick = () => {
    if (isHomePage) {
      // If we're on home page, scroll to top/main content
      const element = document.getElementById('main-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // If we're not on home page, Link component will handle navigation
  };

  const BrandContent = (
    <motion.div
      onClick={isHomePage ? handleBrandClick : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl px-3 py-2 transition-all duration-300 cursor-pointer group"
      aria-label={t('logoAria')}
      tabIndex={isHomePage ? 0 : -1}
      onKeyDown={(e) => {
        if (isHomePage && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleBrandClick();
        }
      }}
    >
      <div className="flex items-center space-x-2">
        {/* Modern Logo Icon */}
        <motion.div
          className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isScrolled
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-md'
              : 'bg-white/20 backdrop-blur-sm border border-white/30'
          }`}
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sparkles className={`w-4 h-4 transition-colors duration-300 ${
            isScrolled ? 'text-white' : 'text-white'
          }`} />
        </motion.div>

        {/* Brand Text with Modern Typography */}
        <div>
          <h1 className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${
            isScrolled
              ? 'text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text'
              : 'text-white group-hover:text-blue-200'
          }`}>
            QuickFy
          </h1>
          <motion.div
            className={`h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full ${
              isScrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'from-blue-400 to-purple-400'
            }`}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-xl shadow-black/5'
          : 'bg-gradient-to-b from-black/20 via-black/10 to-transparent backdrop-blur-sm'
      }`}
      role="banner"
    >
      {/* Animated border line */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-500 ${
          isScrolled ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
        animate={{
          backgroundPosition: isScrolled ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />

      <div className={`max-w-7xl mx-auto px-4 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4 md:py-6'
      }`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            {isHomePage ? (
              BrandContent
            ) : (
              <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
                {BrandContent}
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
            {/* Navigation Items with Enhanced Styling */}
            <div className="flex items-center space-x-1 mr-8">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isScrolled
                      ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/80'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  aria-label={t('sectionAria', { section: item.label })}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover background effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      isScrolled
                        ? 'bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10'
                        : 'bg-white/0 group-hover:bg-white/10'
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                  />

                  {/* Underline effect */}
                  <motion.div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                      isScrolled ? 'group-hover:w-3/4' : 'group-hover:w-3/4'
                    }`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '75%' }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <motion.button
              onClick={() => scrollToSection('contact')}
              className={`relative px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group overflow-hidden ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-500 hover:to-purple-600 shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20'
              }`}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              aria-label={t('startNowAria')}
            >
              {/* Button content */}
              <span className="relative z-10 flex items-center space-x-2">
                <span>{t('startNow')}</span>
                <motion.div
                  className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ChevronDown className="w-2.5 h-2.5 rotate-[-90deg]" />
                </motion.div>
              </span>

              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ width: '200%' }}
              />
            </motion.button>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            ref={menuButtonRef}
            data-mobile-menu
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setFocusedIndex(-1);
            }}
            className={`md:hidden relative p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 group ${
              isScrolled
                ? 'text-gray-900 hover:bg-gray-100/80 active:bg-gray-200/50'
                : 'text-white hover:bg-white/10 active:bg-white/20 backdrop-blur-sm border border-white/20'
            }`}
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated menu icon */}
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                className={`absolute w-6 h-0.5 rounded-full transition-colors duration-300 ${
                  isScrolled ? 'bg-gray-900' : 'bg-white'
                }`}
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 0 : -4
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className={`absolute w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? 'bg-gray-900' : 'bg-white'
                }`}
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  scale: isMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`absolute w-6 h-0.5 rounded-full transition-colors duration-300 ${
                  isScrolled ? 'bg-gray-900' : 'bg-white'
                }`}
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? 0 : 4
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>

            {/* Ripple effect */}
            <motion.div
              className={`absolute inset-0 rounded-xl ${
                isScrolled ? 'bg-blue-500/20' : 'bg-white/20'
              }`}
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              data-mobile-menu
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`md:hidden mt-6 pb-6 rounded-2xl mx-2 backdrop-blur-xl transition-all duration-300 ${
                isScrolled
                  ? 'bg-white/95 border border-gray-200/50 shadow-2xl shadow-black/10'
                  : 'bg-black/20 border border-white/20 shadow-2xl shadow-black/20'
              }`}
              role="menu"
              aria-label={t('mobileMenu')}
              aria-orientation="vertical"
            >
              <div className="flex flex-col space-y-2 p-4">
                {/* Navigation items with enhanced styling */}
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    ref={(el) => {
                      navigationItemsRef.current[index] = el;
                    }}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.9 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative text-left px-5 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 focus:bg-blue-50'
                        : 'text-gray-200 hover:bg-white/10 hover:text-white focus:bg-white/10 backdrop-blur-sm'
                    } ${focusedIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                    role="menuitem"
                    aria-label={t('sectionAria', { section: item.label })}
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      <motion.div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isScrolled
                            ? 'bg-blue-100 group-hover:bg-blue-200'
                            : 'bg-white/10 group-hover:bg-white/20'
                        }`}
                        whileHover={{ rotate: 90 }}
                      >
                        <ChevronDown className={`w-3 h-3 transition-colors duration-300 ${
                          isScrolled ? 'text-blue-600' : 'text-white'
                        } rotate-[-90deg]`} />
                      </motion.div>
                    </div>

                    {/* Subtle border effect */}
                    <motion.div
                      className={`absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}

                {/* Enhanced CTA button for mobile */}
                <motion.button
                  ref={(el) => {
                    navigationItemsRef.current[navigationItems.length] = el;
                  }}
                  onClick={() => scrollToSection('contact')}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{
                    delay: navigationItems.length * 0.05 + 0.1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative mt-6 mx-2 px-6 py-4 rounded-xl text-white font-semibold text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${
                    isScrolled
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl'
                      : 'bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-500 hover:to-purple-600 shadow-2xl backdrop-blur-sm border border-white/20'
                  } ${focusedIndex === navigationItems.length ? 'ring-2 ring-blue-500' : ''}`}
                  role="menuitem"
                  aria-label={t('startNowAria')}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{t('startNow')}</span>
                  </span>

                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}