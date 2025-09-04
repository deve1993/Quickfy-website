'use client';

import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
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
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-sm ${className}`}
      role="navigation"
    >
      <ol className="flex items-center space-x-2 list-none">
        <li>
          <button
            onClick={() => handleItemClick({ label: 'Home', href: '#main-content' })}
            className="flex items-center text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md px-2 py-1 transition-colors"
            aria-label="Torna alla home"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
          </button>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight 
              className="w-4 h-4 text-gray-400" 
              aria-hidden="true" 
            />
            
            {index === items.length - 1 ? (
              // Current page - not clickable
              <span 
                className="text-gray-900 font-medium"
                aria-current="page"
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
                aria-label={`Vai a ${item.label}`}
              >
                {item.label}
              </motion.button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Breadcrumb con animazioni per sezioni dinamiche
export function AnimatedBreadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Breadcrumb items={items} className={className} />
    </motion.div>
  );
}

// Breadcrumb compatto per mobile
export function CompactBreadcrumb({ items, className = '' }: BreadcrumbProps) {
  if (items.length <= 1) {
    return <Breadcrumb items={items} className={className} />;
  }

  const currentItem = items[items.length - 1];
  const parentItem = items[items.length - 2];

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
    <nav 
      aria-label="Breadcrumb compatto" 
      className={`flex items-center space-x-2 text-sm ${className}`}
      role="navigation"
    >
      <ol className="flex items-center space-x-2 list-none">
        <li>
          <button
            onClick={() => handleItemClick(parentItem)}
            className="flex items-center text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md px-2 py-1 transition-colors"
            aria-label={`Torna a ${parentItem.label}`}
          >
            <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            <span className="ml-1">{parentItem.label}</span>
          </button>
        </li>
        
        <li className="flex items-center space-x-2">
          <ChevronRight 
            className="w-4 h-4 text-gray-400" 
            aria-hidden="true" 
          />
          <span 
            className="text-gray-900 font-medium"
            aria-current="page"
          >
            {currentItem.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}

// Hook per gestire breadcrumb dinamici
export function useBreadcrumb() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const createBreadcrumbItem = (
    label: string, 
    sectionId?: string,
    customOnClick?: () => void
  ): BreadcrumbItem => ({
    label,
    href: sectionId ? `#${sectionId}` : undefined,
    onClick: customOnClick || (sectionId ? () => scrollToSection(sectionId) : undefined)
  });

  return {
    scrollToSection,
    createBreadcrumbItem
  };
}