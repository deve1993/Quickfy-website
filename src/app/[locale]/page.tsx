import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import dynamic from 'next/dynamic';
import { Footer } from '@/components/layout/Footer';
import { PreloadScript } from '@/components/PreloadScript';
import { Suspense } from 'react';
import { FeaturesSectionSkeleton } from '@/components/ui/skeleton';

// Optimized lazy loading with reduced bundle size
const FeaturesSection = dynamic(
  () => import('@/components/sections/FeaturesSection').then(mod => ({ default: mod.FeaturesSection })), 
  {
    loading: () => (
      <div className="py-24 px-4" aria-label="Loading features">
        <div className="max-w-7xl mx-auto">
          <div className="h-16 bg-gray-200 rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }
);

const BenefitsSection = dynamic(
  () => import('@/components/sections/BenefitsSection').then(mod => ({ default: mod.BenefitsSection })), 
  {
    loading: () => (
      <div className="py-24 px-4" aria-label="Loading benefits">
        <div className="max-w-7xl mx-auto">
          <div className="h-16 bg-gray-200 rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }
);

const PricingSection = dynamic(
  () => import('@/components/sections/PricingSection').then(mod => ({ default: mod.PricingSection })), 
  {
    loading: () => (
      <div className="py-12 px-4" aria-label="Loading pricing">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })), 
  {
    loading: () => (
      <div className="py-24 px-4" aria-label="Loading testimonials">
        <div className="max-w-6xl mx-auto">
          <div className="h-16 bg-gray-200 rounded-xl animate-pulse mb-8" />
          <div className="h-96 bg-gray-100 rounded-3xl animate-pulse" />
        </div>
      </div>
    )
  }
);

const LogosSection = dynamic(
  () => import('@/components/sections/LogosSection').then(mod => ({ default: mod.LogosSection })), 
  {
    loading: () => (
      <div className="py-24 px-4" aria-label="Loading partners">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse mb-8" />
          <div className="flex gap-8 justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 w-32 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })), 
  {
    loading: () => (
      <div className="py-20 px-4" aria-label="Loading contact form">
        <div className="max-w-6xl mx-auto">
          <div className="h-16 bg-gray-200 rounded-xl animate-pulse mb-8" />
          <div className="max-w-2xl mx-auto h-96 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    )
  }
);

export default async function HomePage() {
  return (
    <>
      <PreloadScript />
      <main id="main-content" className="min-h-screen" role="main">
        {/* Critical above-the-fold content */}
        <HeroSection />
        
        {/* Lazy loaded sections with Suspense boundaries */}
        <Suspense fallback={<FeaturesSectionSkeleton />}>
          <div data-next-section="features" id="features">
            <FeaturesSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
          <div data-next-section="benefits" id="benefits">
            <BenefitsSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
          <div data-next-section="pricing" id="pricing">
            <PricingSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
          <div data-next-section="testimonials" id="testimonials">
            <TestimonialsSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
          <div data-next-section="logos" id="partners">
            <LogosSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
          <ContactSection />
        </Suspense>
        
        <Footer />
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      locale,
    },
  };
}