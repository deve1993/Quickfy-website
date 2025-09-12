'use client';

import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
// import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  id?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  showJsonLd?: boolean;
}

interface JsonLdBreadcrumbItem {
  "@type": string;
  position: number;
  name: string;
  item?: string;
}

interface JsonLdBreadcrumb {
  "@context": string;
  "@type": string;
  itemListElement: JsonLdBreadcrumbItem[];
}

// Generate structured data for SEO
function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[], 
  homeLabel: string, 
  locale: string
): JsonLdBreadcrumb {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const homeUrl = `${baseUrl}/${locale}`;
  
  const itemListElement: JsonLdBreadcrumbItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeLabel,
      item: homeUrl
    }
  ];

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const breadcrumbItem: JsonLdBreadcrumbItem = {
      "@type": "ListItem",
      position: index + 2,
      name: item.label
    };
    
    if (!isLast) {
      breadcrumbItem.item = `${homeUrl}#${item.id || item.href?.replace('#', '') || ''}`;
    }
    
    itemListElement.push(breadcrumbItem);
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };
}

// Auto-generate breadcrumb from current section
function useAutoBreadcrumb() {
  const [currentSection, setCurrentSection] = useState<string>('');
  const t = useTranslations('navigation');
  
  useEffect(() => {
    const updateCurrentSection = () => {
      const sections = ['features', 'benefits', 'pricing', 'testimonials', 'contact'];
      const windowHeight = window.innerHeight;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setCurrentSection(sectionId);
            return;
          }
        }
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(updateCurrentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCurrentSection();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentSection) return null;

  const sectionLabels: Record<string, string> = {
    features: t('features'),
    benefits: t('benefits'), 
    pricing: t('pricing'),
    testimonials: t('testimonials'),
    contact: t('contact')
  };

  return {
    label: sectionLabels[currentSection],
    id: currentSection,
    href: `#${currentSection}`
  };
}

export function Breadcrumb({ 
  items = [], 
  className = '', 
  showHome = false, // Changed default to false to hide home icon by default
  showJsonLd = true 
}: BreadcrumbProps) {
  const t = useTranslations('breadcrumb');
  const locale = useLocale();
  // const pathname = usePathname();
  const autoItem = useAutoBreadcrumb();
  
  // Use auto-generated breadcrumb if no items provided
  const breadcrumbItems = items.length > 0 ? items : (autoItem ? [autoItem] : []);
  
  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      const element = document.getElementById(item.href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleHomeClick = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (breadcrumbItems.length === 0 && !showHome) {
    return null;
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      {showJsonLd && breadcrumbItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateBreadcrumbJsonLd(breadcrumbItems, t('home'), locale)
            )
          }}
        />
      )}
      
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label={t('navigationAria')}
        className={`flex items-center space-x-2 text-sm ${className}`}
        role="navigation"
      >
        <ol className="flex items-center space-x-2 list-none">
          {/* Home icon section removed - showHome parameter still functional but default changed */}
          {showHome && (
            <li>
              <motion.button
                onClick={handleHomeClick}
                className="flex items-center text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md px-2 py-1 transition-colors"
                aria-label={t('homeAria')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </li>
          )}
          
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={item.id || index} className="flex items-center space-x-2">
                {(showHome || index > 0) && (
                  <ChevronRight 
                    className="w-4 h-4 text-gray-400" 
                    aria-hidden="true" 
                  />
                )}
                
                {isLast ? (
                  // Current page - not clickable
                  <span 
                    className="text-gray-900 font-medium"
                    aria-current="page"
                    aria-label={t('currentPageAria')}
                  >
                    {item.label}
                  </span>
                ) : (
                  // Clickable breadcrumb item
                  <motion.button
                    onClick={() => handleItemClick(item)}
                    className="text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md px-2 py-1 transition-colors"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`${t('separator')} ${item.label}`}
                  >
                    {item.label}
                  </motion.button>
                )}
              </li>
            );
          })}
        </ol>
      </motion.nav>
    </>
  );
}

// Breadcrumb with section auto-detection
export function SmartBreadcrumb({ className = '', showJsonLd = true }: Omit<BreadcrumbProps, 'items'>) {
  return (
    <Breadcrumb 
      className={className} 
      showJsonLd={showJsonLd}
      showHome={false} // Explicitly set to false to hide home icon
    />
  );
}

// Compact breadcrumb for mobile
export function CompactBreadcrumb({ items = [], className = '' }: BreadcrumbProps) {
  const t = useTranslations('breadcrumb');
  const autoItem = useAutoBreadcrumb();
  const breadcrumbItems = items.length > 0 ? items : (autoItem ? [autoItem] : []);
  
  if (breadcrumbItems.length <= 1) {
    return <Breadcrumb items={breadcrumbItems} className={className} showHome={false} />; // Changed to false
  }

  const currentItem = breadcrumbItems[breadcrumbItems.length - 1];
  const parentItem = breadcrumbItems[breadcrumbItems.length - 2] || { label: t('home'), href: '#main-content' };

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      const element = document.getElementById(item.href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={t('navigationAria')}
      className={`flex items-center space-x-2 text-sm ${className}`}
      role="navigation"
    >
      <ol className="flex items-center space-x-2 list-none">
        <li>
          <motion.button
            onClick={() => handleItemClick(parentItem)}
            className="flex items-center text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md px-2 py-1 transition-colors"
            aria-label={`${t('separator')} ${parentItem.label}`}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            <span className="ml-1">{parentItem.label}</span>
          </motion.button>
        </li>
        
        <li className="flex items-center space-x-2">
          <ChevronRight 
            className="w-4 h-4 text-gray-400" 
            aria-hidden="true" 
          />
          <span 
            className="text-gray-900 font-medium"
            aria-current="page"
            aria-label={t('currentPageAria')}
          >
            {currentItem.label}
          </span>
        </li>
      </ol>
    </motion.nav>
  );
}

// Hook for managing dynamic breadcrumbs with translations
export function useBreadcrumb() {
  const t = useTranslations('navigation');
  const tb = useTranslations('breadcrumb');
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const createBreadcrumbItem = (
    sectionId: string,
    customLabel?: string,
    customOnClick?: () => void
  ): BreadcrumbItem => {
    const sectionLabels: Record<string, string> = {
      features: t('features'),
      benefits: t('benefits'), 
      pricing: t('pricing'),
      testimonials: t('testimonials'),
      contact: t('contact')
    };

    return {
      id: sectionId,
      label: customLabel || sectionLabels[sectionId] || sectionId,
      href: `#${sectionId}`,
      onClick: customOnClick || (() => scrollToSection(sectionId))
    };
  };

  const createHomeBreadcrumb = (): BreadcrumbItem => ({
    id: 'home',
    label: tb('home'),
    href: '#main-content',
    onClick: () => scrollToSection('main-content')
  });

  return {
    scrollToSection,
    createBreadcrumbItem,
    createHomeBreadcrumb
  };
}

// Preset breadcrumb configurations
export const breadcrumbPresets = {
  features: (t: (key: string) => string) => [{ id: 'features', label: t('features'), href: '#features' }],
  benefits: (t: (key: string) => string) => [{ id: 'benefits', label: t('benefits'), href: '#benefits' }],
  pricing: (t: (key: string) => string) => [{ id: 'pricing', label: t('pricing'), href: '#pricing' }],
  testimonials: (t: (key: string) => string) => [{ id: 'testimonials', label: t('testimonials'), href: '#testimonials' }],
  contact: (t: (key: string) => string) => [{ id: 'contact', label: t('contact'), href: '#contact' }],
};

// Legacy support - AnimatedBreadcrumb alias
export const AnimatedBreadcrumb = SmartBreadcrumb;