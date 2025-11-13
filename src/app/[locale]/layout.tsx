import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { locales } from '../../i18n/request';
import { FloatingLanguageSwitcher } from '@/components/ui/language-switcher';
import { PerformanceMonitor, ResourceMonitor } from '@/components/PerformanceMonitor';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/toast';
import { ClientOnly } from '@/components/ui/ClientOnly';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import { EnvironmentProvider } from '@/contexts/EnvironmentContext';
import { OrganizationSchema, WebsiteSchema } from '@/components/seo';
import '../globals.css';
import Script from 'next/script';
import { getEnvInjectionScriptContent } from '@/lib/env-injection';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif']
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Await the params to get the locale
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <head>
        {/* Environment injection - Must be first to be available to all external scripts */}
        <Script
          id="env-injection"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: getEnvInjectionScriptContent()
          }}
        />

        {/* Favicon and PWA Configuration */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Critical Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload critical assets */}
        <link rel="preload" href="/quickfy_logo.svg" as="image" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QuickFy" />

        {/* Critical CSS is automatically handled by Next.js 15 */}

        {/* Google Analytics with consent management */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  // Initialize with denied consent by default (GDPR compliance)
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                  });

                  // Configure GA4
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `
              }}
            />
          </>
        )}

        {/* Optimized performance monitoring - external file */}
        <Script
          src="/js/performance-monitor.js"
          strategy="lazyOnload"
          defer
        />

        {/* Structured Data for SEO */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`${inter.className} relative min-h-screen overflow-x-hidden pt-[72px]`}>
        {/* HIGH VISIBILITY TEST VERSION - Soft Gradient Mesh Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Layer 1: Enhanced visibility gradient mesh background */}
          <div className="absolute inset-0">
            {/* INCREASED OPACITY: from /30 to /70 for blue, purple from /20 to /60 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/70 via-white to-purple-100/70" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/60 via-transparent to-blue-100/60" />
          </div>

          {/* Orthogonal Grid Pattern - Adds structure and makes content stand out */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            aria-hidden="true"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(148, 163, 184) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(148, 163, 184) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Layer 2: MORE VISIBLE dot pattern - INCREASED from 0.03 to 0.15 */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, #3B82F6 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Layer 3: HIGHLY VISIBLE floating gradient orbs - INCREASED from /15 to /40 */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/40 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-300/40 to-transparent rounded-full blur-3xl animate-float-slow-delayed" />

          {/* Third orb - INCREASED from /10 to /30 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <NextIntlClientProvider messages={messages}>
            <EnvironmentProvider>
              <CookieConsentProvider>
                <ToastProvider>
                    <Header />
                    {children}
                    <Footer />
                    <ClientOnly>
                      <FloatingLanguageSwitcher />
                      <PerformanceMonitor />
                      <ResourceMonitor />
                      <CookieConsentBanner />
                    </ClientOnly>
                </ToastProvider>
              </CookieConsentProvider>
            </EnvironmentProvider>
          </NextIntlClientProvider>
        </div>

        {/* Optimized service worker - external file */}
        <Script
          src="/js/service-worker-init.js"
          strategy="lazyOnload"
          defer
        />
      </body>
    </html>
  );
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
