import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import HeroSection directly for critical above-the-fold content
import { HeroSection } from '@/components/sections/HeroSection';

// Dynamic imports with lazy loading for below-the-fold sections
const FeaturesSection = dynamic(
  () => import('@/components/sections/FeaturesSection').then(mod => ({ default: mod.FeaturesSection })),
  {
    loading: () => <SectionSkeleton />,
    ssr: true // Keep SSR for SEO
  }
);

const BenefitsSection = dynamic(
  () => import('@/components/sections/BenefitsSection').then(mod => ({ default: mod.BenefitsSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const WhappiSummarySection = dynamic(
  () => import('@/components/sections/WhappiSummarySection').then(mod => ({ default: mod.WhappiSummarySection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const PricingSection = dynamic(
  () => import('@/components/sections/PricingSection').then(mod => ({ default: mod.PricingSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const RoadmapSection = dynamic(
  () => import('@/components/sections/RoadmapSection').then(mod => ({ default: mod.RoadmapSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const LogosSection = dynamic(
  () => import('@/components/sections/LogosSection').then(mod => ({ default: mod.LogosSection })),
  {
    loading: () => <SectionSkeleton height="h-32" />
  }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

// Optimized lightweight skeleton components
function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <section
      className={`w-full ${height} bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20`}
      style={{ contentVisibility: 'auto' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200/80 rounded-lg mb-4 max-w-md mx-auto"></div>
          <div className="h-4 bg-gray-200/60 rounded-lg max-w-lg mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-24 bg-gray-200/70 rounded mb-3"></div>
              <div className="h-4 bg-gray-200/70 rounded mb-2"></div>
              <div className="h-3 bg-gray-200/50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  return (
    <>
      {/* Page heading for screen readers */}
      <h1 className="sr-only">QuickFy - Marketing Automation Platform</h1>

      <main id="main-content" className="min-h-screen" role="main" aria-label="Main content">
        {/* Hero Section - No Suspense for critical content */}
        <HeroSection />

        {/* Features Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturesSection />
        </Suspense>

        {/* Benefits Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <BenefitsSection />
        </Suspense>

        {/* Pricing Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <PricingSection />
        </Suspense>

        {/* Roadmap Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <RoadmapSection />
        </Suspense>

        {/* Whappi Summary Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <WhappiSummarySection />
        </Suspense>

        {/* Testimonials Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>

        {/* Logos Section */}
        <Suspense fallback={<SectionSkeleton height="h-32" />}>
          <LogosSection />
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
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