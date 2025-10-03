'use client';

import { memo } from 'react';
import { WhappiHeroSection } from './WhappiHeroSection';
import { WhappiSection } from './WhappiSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { ContactSection } from './ContactSection';
import { BreadcrumbLayout } from '@/components/layout/BreadcrumbLayout';

export const WhappiLandingPage = memo(function WhappiLandingPage() {
  return (
    <BreadcrumbLayout showBreadcrumb={true}>
      <main className="min-h-screen" role="main">
        {/* Hero Section with App Mockup and Trust Indicators */}
        <WhappiHeroSection />

        {/* Enhanced Features Section with Visual Components */}
        <WhappiSection />

        {/* Testimonials with New Placeholder Cards */}
        <TestimonialsSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
    </BreadcrumbLayout>
  );
});