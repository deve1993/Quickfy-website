import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { FeaturesSectionSkeleton } from '@/components/ui/skeleton';
import { BreadcrumbLayout } from '@/components/layout/BreadcrumbLayout';

// Optimized lazy loading with exact skeleton matching for zero CLS
const FeaturesSection = dynamic(
  () => import('@/components/sections/FeaturesSection').then(mod => ({ default: mod.FeaturesSection })),
  {
    loading: () => <FeaturesSectionSkeleton />
  }
);

const BenefitsSection = dynamic(
  () => import('@/components/sections/BenefitsSection').then(mod => ({ default: mod.BenefitsSection })),
  {
    loading: () => (
      <div className="py-16 lg:py-20 px-4" role="status" aria-label="Loading benefits">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full mb-6 mx-auto">
              <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
            <div className="h-5 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-5 xl:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 lg:p-4 xl:p-3 border border-white/20 space-y-4 lg:space-y-2 xl:space-y-1 min-h-[280px] lg:min-h-[200px] xl:min-h-[180px]">
                <div className="flex items-end gap-2 mb-3 lg:mb-2 xl:mb-1">
                  <div className="h-10 lg:h-8 xl:h-6 w-16 lg:w-12 xl:w-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded animate-pulse" />
                  <div className="h-4 lg:h-3 xl:h-2 w-12 lg:w-10 xl:w-8 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-6 lg:h-5 xl:h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                <div className="h-4 lg:h-3 xl:h-2 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 lg:h-3 xl:h-2 bg-gray-200 rounded animate-pulse w-5/6" />
              </div>
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
      <div className="py-20 px-4" role="status" aria-label="Loading pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
            <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`relative bg-white rounded-2xl p-8 border-2 space-y-6 ${
                i === 0 ? 'border-blue-200 shadow-lg transform scale-105' : 'border-gray-200'
              }`}>
                {i === 0 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="h-8 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" />
                  </div>
                )}
                <div className="text-center space-y-4">
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
                  <div className="flex justify-center items-baseline space-x-2">
                    <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="space-y-2 pt-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6">
                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-full" />
                </div>
              </div>
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
      <div className="py-24 px-4" role="status" aria-label="Loading testimonials">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
            <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
          </div>

          {/* Trust indicators skeleton */}
          <div className="flex justify-center items-center space-x-8 mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Main testimonial skeleton */}
          <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-yellow-100 rounded-full animate-pulse mr-1" />
                ))}
              </div>

              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6 mx-auto" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-4/6 mx-auto" />
              </div>

              <div className="pt-8 space-y-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mx-auto" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mx-auto" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mx-auto" />
              </div>
            </div>
          </div>

          {/* Navigation dots skeleton */}
          <div className="flex justify-center items-center space-x-3 mt-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full animate-pulse ${
                i === 0 ? 'bg-blue-400' : 'bg-gray-300'
              }`} />
            ))}
          </div>
        </div>
      </div>
    )
  }
);

const LogosSection = dynamic(
  () => import('@/components/sections/LogosSection').then(mod => ({ default: mod.LogosSection })),
  {
    loading: () => (
      <div className="py-20 px-4" role="status" aria-label="Loading partners">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <div className="h-8 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-1/3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="h-12 w-32 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
);

const RoadmapSection = dynamic(
  () => import('@/components/sections/RoadmapSection').then(mod => ({ default: mod.RoadmapSection })),
  {
    loading: () => (
      <div className="py-24 px-4" role="status" aria-label="Loading roadmap">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
            <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
          </div>

          {/* Desktop Timeline Skeleton */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 rounded-full animate-pulse" />
              <div className="absolute top-[72px] left-0 right-0 flex justify-between">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-6 pt-32">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 space-y-4 min-h-[320px]">
                    <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse" />
                      <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="space-y-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse flex-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tablet Timeline Skeleton */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 space-y-4 min-h-[280px]">
                  <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse" />
                    <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline Skeleton */}
          <div className="md:hidden">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 animate-pulse" />
              <div className="space-y-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative pl-16">
                    <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-gray-300 animate-pulse transform -translate-x-1/2" />
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 space-y-4 min-h-[240px]">
                      <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse" />
                        <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                      </div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse" />
                      <div className="space-y-2">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA Skeleton */}
          <div className="text-center mt-16">
            <div className="h-12 w-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-pulse mx-auto" />
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
      <div className="py-20 px-4" role="status" aria-label="Loading contact form">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
            <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                  <div className="h-12 bg-gray-100 rounded-xl animate-pulse w-full" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-32 bg-gray-100 rounded-xl animate-pulse w-full" />
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>

            <div className="h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse w-full" />
          </div>
        </div>
      </div>
    )
  }
);

export default async function HomePage() {
  return (
    <>
      <BreadcrumbLayout showBreadcrumb={false}>
        <main id="main-content" className="min-h-screen" role="main">
          {/* Critical above-the-fold content - no lazy loading to ensure LCP */}
          <HeroSection />

        {/* Lazy loaded sections with precise skeleton matching for zero CLS */}
        <Suspense fallback={<FeaturesSectionSkeleton />}>
          <div data-next-section="features" id="features">
            <FeaturesSection />
          </div>
        </Suspense>

        <Suspense fallback={
          <div className="py-16 lg:py-20 px-4" role="status" aria-label="Loading benefits">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-12 lg:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full mb-6 mx-auto">
                  <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
                <div className="h-5 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-5 xl:gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 lg:p-4 xl:p-3 border border-white/20 space-y-4 lg:space-y-2 xl:space-y-1 min-h-[280px] lg:min-h-[200px] xl:min-h-[180px]">
                    <div className="flex items-end gap-2 mb-3 lg:mb-2 xl:mb-1">
                      <div className="h-10 lg:h-8 xl:h-6 w-16 lg:w-12 xl:w-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded animate-pulse" />
                      <div className="h-4 lg:h-3 xl:h-2 w-12 lg:w-10 xl:w-8 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-6 lg:h-5 xl:h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                    <div className="h-4 lg:h-3 xl:h-2 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-4 lg:h-3 xl:h-2 bg-gray-200 rounded animate-pulse w-5/6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          <div data-next-section="benefits" id="benefits">
            <BenefitsSection />
          </div>
        </Suspense>

        <Suspense fallback={
          <div className="py-20 px-4" role="status" aria-label="Loading pricing">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
                <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`relative bg-white rounded-2xl p-8 border-2 space-y-6 ${
                    i === 0 ? 'border-blue-200 shadow-lg transform scale-105' : 'border-gray-200'
                  }`}>
                    {i === 0 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="h-8 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" />
                      </div>
                    )}
                    <div className="text-center space-y-4">
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
                      <div className="flex justify-center items-baseline space-x-2">
                        <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                      <div className="space-y-2 pt-4">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-green-100 rounded-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6">
                      <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          <div data-next-section="pricing" id="pricing">
            <PricingSection />
          </div>
        </Suspense>

        <Suspense fallback={
          <div className="py-24 px-4" role="status" aria-label="Loading roadmap">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-20">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
                <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
              </div>

              {/* Desktop Timeline Skeleton */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 rounded-full animate-pulse" />
                  <div className="absolute top-[72px] left-0 right-0 flex justify-between">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-6 pt-32">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 space-y-4 min-h-[320px]">
                        <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse" />
                          <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                        </div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse" />
                        <div className="space-y-2">
                          {[...Array(3)].map((_, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                              <div className="h-3 bg-gray-200 rounded animate-pulse flex-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tablet Timeline Skeleton */}
              <div className="hidden md:block lg:hidden">
                <div className="grid grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 space-y-4 min-h-[280px]">
                      <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse" />
                        <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                      </div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse" />
                      <div className="space-y-2">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Timeline Skeleton */}
              <div className="md:hidden">
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 animate-pulse" />
                  <div className="space-y-8">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="relative pl-16">
                        <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-gray-300 animate-pulse transform -translate-x-1/2" />
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 space-y-4 min-h-[240px]">
                          <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse" />
                            <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                          </div>
                          <div className="h-6 bg-gray-200 rounded animate-pulse" />
                          <div className="space-y-2">
                            {[...Array(3)].map((_, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Skeleton */}
              <div className="text-center mt-16">
                <div className="h-12 w-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-pulse mx-auto" />
              </div>
            </div>
          </div>
        }>
          <div data-next-section="roadmap" id="roadmap">
            <RoadmapSection />
          </div>
        </Suspense>

        <Suspense fallback={
          <div className="py-24 px-4" role="status" aria-label="Loading testimonials">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
                <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
              </div>

              <div className="flex justify-center items-center space-x-8 mb-16">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
                <div className="text-center space-y-6">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-yellow-100 rounded-full animate-pulse mr-1" />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6 mx-auto" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-4/6 mx-auto" />
                  </div>

                  <div className="pt-8 space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mx-auto" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mx-auto" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mx-auto" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center space-x-3 mt-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full animate-pulse ${
                    i === 0 ? 'bg-blue-400' : 'bg-gray-300'
                  }`} />
                ))}
              </div>
            </div>
          </div>
        }>
          <div data-next-section="testimonials" id="testimonials">
            <TestimonialsSection />
          </div>
        </Suspense>

        <Suspense fallback={
          <div className="py-20 px-4" role="status" aria-label="Loading partners">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <div className="h-8 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-1/3" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-center">
                    <div className="h-12 w-32 bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          <div data-next-section="logos" id="partners">
            <LogosSection />
          </div>
        </Suspense>

        <Suspense fallback={
          <div className="py-20 px-4" role="status" aria-label="Loading contact form">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse mx-auto w-1/2" />
                <div className="h-6 bg-gray-200 rounded-xl animate-pulse mx-auto w-3/4" />
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                      <div className="h-12 bg-gray-100 rounded-xl animate-pulse w-full" />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                  <div className="h-32 bg-gray-100 rounded-xl animate-pulse w-full" />
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>

                <div className="h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl animate-pulse w-full" />
              </div>
            </div>
          </div>
        }>
          <div data-next-section="contact" id="contact">
            <ContactSection />
          </div>
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