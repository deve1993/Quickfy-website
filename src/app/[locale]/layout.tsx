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
import { FloatingBreadcrumb } from '@/components/ui/QuickfyBreadcrumb';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import './globals.css';
import Script from 'next/script';

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
        {/* Favicon and PWA Configuration */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QuickFy" />
        
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Critical CSS is automatically handled by Next.js 15 */}
        
        {/* Google Analytics with consent management */}
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Initialize with denied consent by default
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
              
              // Configure GA4 (replace with your actual measurement ID)
              // gtag('config', 'GA_MEASUREMENT_ID');
            `
          }}
        />
        
        {/* Performance monitoring */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                  });
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
              }
            `
          }}
        />
      </head>
      <body className={`${inter.className} relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-x-hidden`}>
        {/* Enhanced Background Elements */}
        <div className="fixed inset-0 z-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>
        
        <div className="relative z-10">
          <NextIntlClientProvider messages={messages}>
            <CookieConsentProvider>
              <ToastProvider>
                <Header />
                {children}
                <Footer />
                <ClientOnly>
                  <FloatingLanguageSwitcher />
                  <FloatingBreadcrumb />
                  <PerformanceMonitor />
                  <ResourceMonitor />
                  <CookieConsentBanner />
                </ClientOnly>
              </ToastProvider>
            </CookieConsentProvider>
          </NextIntlClientProvider>
        </div>
        
        {/* Service Worker for performance and offline support */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // BFCache optimization
              window.addEventListener('beforeunload', () => {
                if (navigator.serviceWorker.controller) {
                  navigator.serviceWorker.controller.postMessage({
                    type: 'PREPARE_BFCACHE'
                  });
                }
              });
              
              // Clean up event listeners for BFCache
              window.addEventListener('pagehide', (event) => {
                if (event.persisted) {
                  // Page is being stored in BFCache
                  // Clean up any resources that might prevent BFCache
                  document.querySelectorAll('video, audio').forEach(el => {
                    el.pause();
                  });
                }
              });
            `
          }}
        />
      </body>
    </html>
  );
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}