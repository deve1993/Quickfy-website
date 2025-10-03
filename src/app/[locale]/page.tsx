import { getTranslations } from 'next-intl/server';
import { BreadcrumbLayout } from '@/components/layout/BreadcrumbLayout';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for performance optimization
const HeroSection = dynamic(() => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })), {
  loading: () => <HeroSkeleton />,
});

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection').then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <SectionSkeleton />,
});

const BenefitsSection = dynamic(() => import('@/components/sections/BenefitsSection').then(mod => ({ default: mod.BenefitsSection })), {
  loading: () => <SectionSkeleton />,
});

const WhappiSummarySection = dynamic(() => import('@/components/sections/WhappiSummarySection').then(mod => ({ default: mod.WhappiSummarySection })), {
  loading: () => <SectionSkeleton />,
});

const PricingSection = dynamic(() => import('@/components/sections/PricingSection').then(mod => ({ default: mod.PricingSection })), {
  loading: () => <SectionSkeleton />,
});

const RoadmapSection = dynamic(() => import('@/components/sections/RoadmapSection').then(mod => ({ default: mod.RoadmapSection })), {
  loading: () => <SectionSkeleton />,
});

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <SectionSkeleton />,
});

const LogosSection = dynamic(() => import('@/components/sections/LogosSection').then(mod => ({ default: mod.LogosSection })), {
  loading: () => <SectionSkeleton height="h-32" />,
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })), {
  loading: () => <SectionSkeleton />,
});

// Skeleton components for loading states
function HeroSkeleton() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20">
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-20 text-center min-h-[100dvh] flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded-lg mb-8 max-w-4xl mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded-lg mb-12 max-w-3xl mx-auto"></div>
          <div className="h-14 bg-gray-200 rounded-xl mb-16 max-w-xs mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/80 rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="h-12 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <section className={`w-full ${height} bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 animate-pulse`}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg mb-4 max-w-2xl mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded-lg max-w-3xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
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
      <BreadcrumbLayout showBreadcrumb={false}>
        {/* Page heading for screen readers */}
        <h1 className="sr-only">QuickFy - Marketing Automation Platform</h1>

        <main id="main-content" className="min-h-screen" role="main" aria-label="Main content">
          {/* Hero Section */}
          <Suspense fallback={<HeroSkeleton />}>
            <HeroSection />
          </Suspense>

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
      </BreadcrumbLayout>
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