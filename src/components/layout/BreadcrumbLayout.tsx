'use client';

import { SmartBreadcrumb, CompactBreadcrumb } from '@/components/ui/breadcrumb';
import { motion } from 'framer-motion';

interface BreadcrumbLayoutProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  compact?: boolean;
  className?: string;
}

export function BreadcrumbLayout({ 
  children, 
  showBreadcrumb = true, 
  compact = false,
  className = ''
}: BreadcrumbLayoutProps) {
  if (!showBreadcrumb) {
    return <>{children}</>;
  }

  return (
    <div className={className}>
      {/* Breadcrumb Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3"
      >
        <div className="max-w-7xl mx-auto px-4">
          {compact ? (
            <div className="block md:hidden">
              <CompactBreadcrumb className="text-xs" />
            </div>
          ) : null}
          
          <div className={compact ? "hidden md:block" : ""}>
            <SmartBreadcrumb 
              className="text-sm" 
              showJsonLd={true}
            />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      {children}
    </div>
  );
}

// Breadcrumb overlay for sections
export function BreadcrumbOverlay({ className = '' }: { className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className={`fixed top-20 left-4 z-30 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-gray-200 ${className}`}
    >
      <div className="hidden sm:block">
        <SmartBreadcrumb className="text-sm" showJsonLd={false} />
      </div>
      <div className="block sm:hidden">
        <CompactBreadcrumb className="text-xs" />
      </div>
    </motion.div>
  );
}