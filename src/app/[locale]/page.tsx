import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import dynamicImport from 'next/dynamic';

// Import HeroSection directly for critical above-the-fold content
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

// Dynamic imports with lazy loading for below-the-fold sections
const FeaturesSection = dynamicImport(
  () => import('@/components/sections/FeaturesSection').then(mod => ({ default: mod.FeaturesSection })),
  {
    loading: () => <SectionSkeleton />,
    ssr: true // Keep SSR for SEO
  }
);

const BenefitsSection = dynamicImport(
  () => import('@/components/sections/BenefitsSection').then(mod => ({ default: mod.BenefitsSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const LogosSection = dynamicImport(
  () => import('@/components/sections/LogosSection').then(mod => ({ default: mod.LogosSection })),
  {
    loading: () => <SectionSkeleton height="h-32" />,
    ssr: true // Keep SSR for social proof visibility
  }
);

const PricingSection = dynamicImport(
  () => import('@/components/sections/PricingSection').then(mod => ({ default: mod.PricingSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const TestimonialsCarousel = dynamicImport(
  () => import('@/components/sections/TestimonialsCarousel').then(mod => ({ default: mod.TestimonialsCarousel })),
  {
    loading: () => <SectionSkeleton />
  }
);

const ContactSection = dynamicImport(
  () => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })),
  {
    loading: () => <SectionSkeleton />
  }
);

const FAQSection = dynamicImport(
  () => import('@/components/sections/FAQSection').then(mod => ({ default: mod.FAQSection })),
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

      {/* Structured Data - Product Schema */}
      <ProductSchema />

      {/* Breadcrumb Navigation Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'QuickFy Marketing Automation', url: '/#features' }
        ]}
      />

      <main id="main-content" className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30" role="main" aria-label="Main content">
        {/* Hero Section - No Suspense for critical content */}
        <HeroSection />

        {/* Logos Section - Social proof early for trust building */}
        <Suspense fallback={<SectionSkeleton height="h-32" />}>
          <LogosSection />
        </Suspense>

        {/* Features Section - Core value proposition */}
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturesSection />
        </Suspense>

        {/* Benefits Section - Quantified outcomes */}
        <Suspense fallback={<SectionSkeleton />}>
          <BenefitsSection />
        </Suspense>

        {/* Pricing Section - Conversion focus */}
        <Suspense fallback={<SectionSkeleton />}>
          <PricingSection />
        </Suspense>

        {/* Testimonials Carousel - Detailed social proof with statistics */}
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsCarousel />
        </Suspense>

        {/* FAQ Section - Answer common questions */}
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>

        {/* Contact Section - Final conversion point */}
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://quickfy.com';
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('meta.title'),
      template: '%s | QuickFy'
    },
    description: t('meta.description'),
    keywords: [
      'marketing automation',
      'CRM',
      'WhatsApp marketing',
      'business automation',
      'ROI optimization',
      'analytics platform',
      'SMB marketing tools'
    ],
    authors: [{ name: 'QuickFy Team' }],
    creator: 'QuickFy',
    publisher: 'QuickFy',

    // Open Graph
    openGraph: {
      type: 'website',
      locale,
      alternateLocale: ['cs', 'en', 'it'].filter(l => l !== locale),
      url: canonicalUrl,
      title: t('meta.title'),
      description: t('meta.description'),
      siteName: 'QuickFy',
      images: [
        {
          url: `${baseUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: t('meta.title')
        }
      ]
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: [`${baseUrl}/twitter-image.svg`],
      creator: '@quickfy'
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    // Canonical & Alternates
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `${baseUrl}/cs`,
        'en': `${baseUrl}/en`,
        'it': `${baseUrl}/it`
      }
    }
  };
}