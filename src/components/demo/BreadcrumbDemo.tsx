'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// import { useTranslations } from 'next-intl';
import { 
  Breadcrumb, 
  SmartBreadcrumb, 
  CompactBreadcrumb, 
  useBreadcrumb
} from '@/components/ui/breadcrumb';
import { QuickfyBreadcrumb } from '@/components/ui/QuickfyBreadcrumb';

export function BreadcrumbDemo() {
  // const t = useTranslations('navigation');
  // const tb = useTranslations('breadcrumb');
  const { createBreadcrumbItem } = useBreadcrumb();
  const [activeDemo, setActiveDemo] = useState<string>('smart');

  // Sample breadcrumb configurations
  const demoConfigs = {
    smart: {
      title: 'Smart Auto-Detection',
      description: 'Automatically detects current section and shows relevant breadcrumb',
      component: <SmartBreadcrumb className="border rounded-lg p-4" />
    },
    compact: {
      title: 'Compact Mobile',
      description: 'Optimized for mobile devices with parent navigation',
      component: <CompactBreadcrumb 
        items={[
          createBreadcrumbItem('features'),
          createBreadcrumbItem('pricing')
        ]} 
        className="border rounded-lg p-4" 
      />
    },
    custom: {
      title: 'Custom Navigation',
      description: 'Manual breadcrumb with custom sections',
      component: <Breadcrumb 
        items={[
          createBreadcrumbItem('features'),
          createBreadcrumbItem('benefits'),
          { label: 'Custom Section', id: 'custom', href: '#custom' }
        ]}
        className="border rounded-lg p-4"
      />
    },
    quickfy: {
      title: 'QuickFy Branded',
      description: 'Enhanced styling with QuickFy brand elements',
      component: <QuickfyBreadcrumb 
        customItems={[createBreadcrumbItem('contact')]}
        variant="floating"
        className="relative border rounded-lg"
      />
    }
  };

  return (
    <div className="space-y-8 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          QuickFy Breadcrumb System
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive navigation system with SEO schema markup, multilingual support, and responsive design
        </p>
      </motion.div>

      {/* Demo Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(demoConfigs).map(([key, config]) => (
          <motion.button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeDemo === key
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {config.title}
          </motion.button>
        ))}
      </div>

      {/* Active Demo */}
      <motion.div
        key={activeDemo}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {demoConfigs[activeDemo as keyof typeof demoConfigs].title}
          </h3>
          <p className="text-gray-600">
            {demoConfigs[activeDemo as keyof typeof demoConfigs].description}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          {demoConfigs[activeDemo as keyof typeof demoConfigs].component}
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <FeatureCard
          title="SEO Optimized"
          description="JSON-LD structured data for enhanced search engine visibility"
          icon="🔍"
        />
        <FeatureCard
          title="Multilingual"
          description="Full support for Czech, English, and Italian translations"
          icon="🌐"
        />
        <FeatureCard
          title="Accessible"
          description="WCAG 2.1 AA compliant with proper ARIA attributes"
          icon="♿"
        />
        <FeatureCard
          title="Responsive"
          description="Mobile-first design with compact mode for small screens"
          icon="📱"
        />
        <FeatureCard
          title="Animated"
          description="Smooth Framer Motion animations for enhanced UX"
          icon="✨"
        />
        <FeatureCard
          title="Auto-Detection"
          description="Intelligent section detection based on scroll position"
          icon="🎯"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}