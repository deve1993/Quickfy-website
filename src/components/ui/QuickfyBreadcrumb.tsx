'use client';

import { motion } from 'framer-motion';
// import { useTranslations } from 'next-intl';
import { SmartBreadcrumb, useBreadcrumb } from './breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  id?: string;
}

interface QuickfyBreadcrumbProps {
  currentSection?: string;
  customItems?: BreadcrumbItem[];
  className?: string;
  variant?: 'default' | 'floating' | 'sticky';
}

// QuickFy branded breadcrumb with enhanced styling
export function QuickfyBreadcrumb({ 
  currentSection, 
  customItems,
  className = '',
  variant = 'default'
}: QuickfyBreadcrumbProps) {
  // const t = useTranslations('navigation');
  const { createBreadcrumbItem } = useBreadcrumb();

  // Create breadcrumb items based on current section
  const getBreadcrumbItems = () => {
    if (customItems) return customItems;
    if (!currentSection) return [];

    return [createBreadcrumbItem(currentSection)];
  };

  const items = getBreadcrumbItems();

  const baseClasses = `
    ${variant === 'floating' 
      ? 'bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 px-4 py-3' 
      : variant === 'sticky'
      ? 'bg-gradient-to-r from-gray-50/95 to-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-2'
      : 'bg-transparent px-4 py-2'
    }
  `;

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: variant === 'floating' ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`${baseClasses} ${className}`}
    >
      <SmartBreadcrumb 
        className="text-sm font-medium"
        showJsonLd={true}
      />
      
      {/* QuickFy branding accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </motion.div>
  );
}

// Section-aware breadcrumb wrapper
export function SectionBreadcrumb() {
  return (
    <div className="sticky top-16 z-30">
      <QuickfyBreadcrumb 
        variant="sticky"
        className="relative"
      />
    </div>
  );
}

// Floating breadcrumb for enhanced UX
export function FloatingBreadcrumb() {
  return (
    <div className="fixed top-20 left-4 z-40 hidden lg:block">
      <QuickfyBreadcrumb 
        variant="floating"
        className="relative max-w-sm"
      />
    </div>
  );
}