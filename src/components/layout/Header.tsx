'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
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
      whileHover={{ scale: 1.05 }}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1 transition-all duration-300 cursor-pointer"
      aria-label={t('logoAria')}
      tabIndex={isHomePage ? 0 : -1}
      onKeyDown={(e) => {
        if (isHomePage && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleBrandClick();
        }
      }}
    >
      <h1 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
        isScrolled
          ? 'text-gray-900 hover:text-blue-600'
          : 'text-white hover:text-blue-400'
      }`}>
        QuickFy
      </h1>
    </motion.div>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
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
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-blue-600'
                    : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('sectionAria', { section: item.label })}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 px-6 py-2 rounded-lg text-white font-semibold text-sm shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t('startNowAria')}
            >
              {t('startNow')}
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            data-mobile-menu
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setFocusedIndex(-1);
            }}
            className={`md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            data-mobile-menu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200"
            role="menu"
            aria-label={t('mobileMenu')}
            aria-orientation="vertical"
          >
            <div className="flex flex-col space-y-3 pt-4">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  ref={(el) => {
                    navigationItemsRef.current[index] = el;
                  }}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white focus:bg-white/10'
                  } ${focusedIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                  role="menuitem"
                  aria-label={t('sectionAria', { section: item.label })}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                ref={(el) => {
                  navigationItemsRef.current[navigationItems.length] = el;
                }}
                onClick={() => scrollToSection('contact')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigationItems.length * 0.1 }}
                className={`mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 px-4 py-3 rounded-lg text-white font-semibold text-center shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  focusedIndex === navigationItems.length ? 'ring-2 ring-blue-500' : ''
                }`}
                role="menuitem"
                aria-label={t('startNowAria')}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                {t('startNow')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}