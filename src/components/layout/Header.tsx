'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const t = useTranslations('navigation');
  const tProducts = useTranslations('products');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  // Refs for keyboard navigation
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const productsDropdownRef = useRef<HTMLDivElement>(null);

  // Page context detection
  const isHomePage = pathname === '/' || pathname?.match(/^\/[a-z]{2}$/);

  // Products data - Whappi removed
  const products = useMemo(() => [
    {
      id: 'quickfy',
      title: tProducts('quickfy.title'),
      subtitle: tProducts('quickfy.subtitle'),
      href: `/${locale}`,
      isActive: true
    }
  ], [locale, tProducts]);

  // Navigation items
  const getNavigationItems = useMemo(() => {
    return [
      { id: 'hero', label: t('home'), type: 'scroll' },
      { id: 'features', label: t('features'), type: 'scroll' },
      { id: 'benefits', label: t('benefits'), type: 'scroll' },
      { id: 'pricing', label: t('pricing'), type: 'scroll' },
      { id: 'testimonials', label: t('testimonials'), type: 'scroll' },
      { id: 'contact', label: t('contact'), type: 'scroll' }
    ];
  }, [t]);

  // CTA configuration
  const ctaConfig = useMemo(() => {
    const scrollToCTA = () => {
      // Close menus FIRST to unlock body scroll
      setIsMenuOpen(false);
      setIsProductsOpen(false);

      // Wait for menu to close and body to unlock before scrolling
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    };

    return {
      text: t('startNow'),
      action: scrollToCTA,
      gradient: 'from-blue-600 to-purple-600',
      hoverGradient: 'from-blue-700 to-purple-700'
    };
  }, [t]);

  // Track active section for text color highlighting
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (typeof window !== 'undefined') {
            const sections = ['hero', 'features', 'benefits', 'pricing', 'testimonials', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
              const element = document.getElementById(section);
              if (element) {
                const offsetTop = element.offsetTop;
                const offsetBottom = offsetTop + element.offsetHeight;

                if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                  setActiveSection(prevSection => {
                    // Only update if section actually changed
                    return prevSection !== section ? section : prevSection;
                  });
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Store original body styles
      const scrollY = window.scrollY;
      const body = document.body;

      // Lock scroll
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';

      // Cleanup function
      return () => {
        // Restore scroll position
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMenuOpen]);

  // Close dropdowns when clicking outside - Enhanced
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Close products dropdown if clicking outside
      if (isProductsOpen &&
          !target.closest('[data-products-dropdown]') &&
          !target.closest('[data-products-trigger]')) {
        setIsProductsOpen(false);
      }

      // Close mobile menu if clicking outside (improved behavior)
      if (isMenuOpen &&
          !target.closest('[data-mobile-menu]') &&
          !menuButtonRef.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    if (isProductsOpen || isMenuOpen) {
      // Use capture phase to handle clicks before they reach children
      document.addEventListener('mousedown', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isProductsOpen, isMenuOpen]);

  // Keyboard navigation for products dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isProductsOpen && e.key === 'Escape') {
        setIsProductsOpen(false);
      }
      if (isMenuOpen && e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isProductsOpen || isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProductsOpen, isMenuOpen]);

  // Focus trap for mobile menu - Enhanced accessibility
  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button[tabindex="0"], a[tabindex="0"]'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Focus first element when menu opens
      setTimeout(() => firstElement?.focus(), 100);

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // Close menus FIRST to unlock body scroll
    setIsMenuOpen(false);
    setIsProductsOpen(false);

    // Wait for menu to close and body to unlock before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNavigation = (item: { id: string; type: string; href?: string }) => {
    if (item.type === 'link' && item.href) {
      setIsMenuOpen(false);
      setIsProductsOpen(false);
      router.push(item.href);
    } else if (item.type === 'dropdown') {
      setIsProductsOpen(!isProductsOpen);
    } else if (item.type === 'scroll') {
      scrollToSection(item.id);
    }
  };

  const handleBrandClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProductClick = (product: typeof products[0]) => {
    setIsProductsOpen(false);
    setIsMenuOpen(false);
    router.push(product.href);
  };

  const BrandContent = (
    <motion.div
      onClick={isHomePage ? handleBrandClick : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl px-3 py-2 transition-all duration-300 cursor-pointer group"
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
        <motion.div
          className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            src="/screenshots/logo nav bar.png"
            alt="QuickFy Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </motion.div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
            QuickFy
          </h1>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:font-medium focus:shadow-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        {t('skipToContent')}
      </a>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-shadow duration-300"
        role="banner"
        aria-label="Main navigation header"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              {isHomePage ? (
                BrandContent
              ) : (
                <Link href={`/${locale}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg">
                  {BrandContent}
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
              <div className="flex items-center space-x-1 mr-8">
                {getNavigationItems.map((item) => (
                  <div key={item.id} className="relative">
                    {item.type === 'dropdown' ? (
                      <>
                        <motion.button
                          data-products-trigger
                          onClick={() => setIsProductsOpen(!isProductsOpen)}
                          className="relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all duration-200 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={t('productsAria')}
                          aria-expanded={isProductsOpen}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
                        </motion.button>

                        {/* Products Dropdown */}
                        <AnimatePresence>
                          {isProductsOpen && (
                            <motion.div
                              ref={productsDropdownRef}
                              data-products-dropdown
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                            >
                              {products.map((product) => (
                                <motion.button
                                  key={product.id}
                                  onClick={() => handleProductClick(product)}
                                  className={`w-full flex items-start justify-between px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
                                    product.isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                  }`}
                                  whileHover={{ x: 2 }}
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-slate-900">{product.title}</h3>
                                    </div>
                                    <p className="text-xs text-slate-600">{product.subtitle}</p>
                                  </div>
                                  {product.isActive && (
                                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                                  )}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.button
                        onClick={() => handleNavigation(item)}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg ${
                          activeSection === item.id && item.type === 'scroll'
                            ? 'text-blue-600 bg-blue-50 font-semibold'
                            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={t('sectionAria', { section: item.label })}
                        aria-current={activeSection === item.id && item.type === 'scroll' ? 'true' : undefined}
                      >
                        <span className="relative z-10">{item.label}</span>
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Button */}
              <motion.button
                onClick={ctaConfig.action}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-sm transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t('startNowAria')}
              >
                {ctaConfig.text}
              </motion.button>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              ref={menuButtonRef}
              data-mobile-menu
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative min-h-[56px] min-w-[56px] p-4 rounded-xl text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 touch-manipulation"
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className="absolute w-6 h-0.5 bg-slate-900 rounded-full"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 0 : -4
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-slate-900 rounded-full"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scale: isMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-slate-900 rounded-full"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? 0 : 4
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>

          {/* Enhanced Mobile Menu with Backdrop */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop Overlay - purely visual, no click events */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[45] pointer-events-none"
                  style={{ top: '72px' }}
                  aria-hidden="true"
                />

                {/* Mobile Menu - Fixed positioning with higher z-index */}
                <motion.div
                  ref={mobileMenuRef}
                  id="mobile-menu"
                  data-mobile-menu
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="md:hidden fixed left-0 right-0 mx-3 bg-white rounded-2xl border border-slate-200 shadow-2xl z-[60] max-h-[calc(100vh-100px)] overflow-y-auto pointer-events-auto"
                  style={{ top: '80px' }}
                  role="menu"
                  aria-label={t('mobileMenu')}
                  aria-orientation="vertical"
                >
                  <div className="flex flex-col p-5">
                    {/* Enhanced CTA button for mobile */}
                    <motion.button
                      onClick={ctaConfig.action}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      whileTap={{ scale: 0.97 }}
                      className="mb-5 min-h-[56px] px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-center text-base shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 active:scale-[0.97] touch-manipulation transition-all duration-300"
                      role="menuitem"
                      aria-label={t('startNowAria')}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      {ctaConfig.text}
                    </motion.button>

                    {/* Divider with gradient */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />

                    {/* Products section in mobile */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-3">
                        {t('products')}
                      </p>
                      <div className="space-y-2">
                        {products.map((product, index) => (
                          <motion.button
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + (index * 0.05), duration: 0.3 }}
                            className={`w-full text-left min-h-[56px] px-4 py-3 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset active:scale-[0.98] touch-manipulation ${
                              product.isActive
                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 text-blue-700'
                                : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                            }`}
                            whileTap={{ scale: 0.98 }}
                            role="menuitem"
                            tabIndex={isMenuOpen ? 0 : -1}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-base">{product.title}</span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">{product.subtitle}</p>
                              </div>
                              {product.isActive && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 ml-3" />
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Divider with gradient */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

                    {/* Navigation items */}
                    <div className="space-y-2">
                      {getNavigationItems.filter(item => item.type !== 'dropdown').map((item, index) => (
                        <motion.button
                          key={item.id}
                          ref={(el) => {
                            navigationItemsRef.current[index] = el;
                          }}
                          onClick={() => handleNavigation(item)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                          whileTap={{ scale: 0.98 }}
                          className={`text-left min-h-[56px] w-full px-4 py-4 rounded-xl transition-all duration-200 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset active:scale-[0.98] touch-manipulation ${
                            activeSection === item.id && item.type === 'scroll'
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                              : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100 hover:text-blue-600'
                          }`}
                          role="menuitem"
                          aria-label={t('sectionAria', { section: item.label })}
                          aria-current={activeSection === item.id && item.type === 'scroll' ? 'true' : undefined}
                          tabIndex={isMenuOpen ? 0 : -1}
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
