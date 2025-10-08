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
import '../globals.css';
import Script from 'next/script';
// Initialize environment and polyfills
import '@/lib/init';
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
        {/* SOLUZIONE ULTRA-AGGRESSIVA V2: Rimozione COMPLETA Next.js Dev Tools */}
        <Script
          id="remove-nextjs-devtools-complete"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                'use strict';

                // === METODO 1: Override di appendChild per bloccare l'inserimento ===
                const originalAppendChild = Element.prototype.appendChild;
                Element.prototype.appendChild = function(child) {
                  // Blocca l'inserimento se è il bottone dev tools o qualsiasi elemento correlato
                  if (child && child.nodeType === 1) {
                    const element = child;
                    // Controlla se è il bottone o contiene il bottone
                    if (
                      element.id === 'next-logo' ||
                      element.getAttribute?.('data-nextjs-dev-tools-button') === 'true' ||
                      element.getAttribute?.('data-next-mark') === 'true' ||
                      element.getAttribute?.('data-nextjs-portal') === 'true' ||
                      element.getAttribute?.('data-nextjs-dialog-overlay') === 'true' ||
                      element.querySelector?.('#next-logo') ||
                      element.querySelector?.('[data-nextjs-dev-tools-button="true"]') ||
                      element.querySelector?.('[data-nextjs-portal="true"]') ||
                      // Blocca elementi fixed in posizione bottom-left
                      (window.getComputedStyle &&
                       window.getComputedStyle(element).position === 'fixed' &&
                       element.style?.bottom?.includes('0') &&
                       element.style?.left?.includes('0'))
                    ) {
                      console.log('[DevTools Blocker] Blocked Next.js dev tools insertion:', element);
                      return child; // Return without appending
                    }
                  }
                  return originalAppendChild.call(this, child);
                };

                // === METODO 2: Override di insertBefore ===
                const originalInsertBefore = Element.prototype.insertBefore;
                Element.prototype.insertBefore = function(newNode, referenceNode) {
                  if (newNode && newNode.nodeType === 1) {
                    const element = newNode;
                    if (
                      element.id === 'next-logo' ||
                      element.getAttribute?.('data-nextjs-dev-tools-button') === 'true' ||
                      element.getAttribute?.('data-next-mark') === 'true' ||
                      element.getAttribute?.('data-nextjs-portal') === 'true' ||
                      element.getAttribute?.('data-nextjs-dialog-overlay') === 'true'
                    ) {
                      console.log('[DevTools Blocker] Blocked Next.js dev tools via insertBefore');
                      return newNode;
                    }
                  }
                  return originalInsertBefore.call(this, newNode, referenceNode);
                };

                // === METODO 3: Funzione di rimozione COMPLETA ===
                function removeDevToolsCompletely() {
                  const selectors = [
                    // Bottone principale
                    '#next-logo',
                    'button[id="next-logo"]',
                    'button[data-nextjs-dev-tools-button]',
                    'button[data-nextjs-dev-tools-button="true"]',
                    'button[data-next-mark]',
                    'button[data-next-mark="true"]',
                    'button[aria-label*="Next.js"]',
                    'button[aria-label*="Dev Tools"]',
                    'button[aria-label*="Open Next"]',
                    // Container e overlay
                    'div[data-nextjs-portal]',
                    'div[data-nextjs-portal="true"]',
                    'div[data-nextjs-dialog-overlay]',
                    'div[data-nextjs-dialog-overlay="true"]',
                    '[id*="nextjs-portal"]',
                    '[class*="nextjs-portal"]',
                    '[class*="next-dev-tools"]',
                    // Shadow DOM roots
                    'nextjs-portal',
                    'next-dev-tools',
                    // Elementi generici fixed in bottom-left che potrebbero essere residui
                    'body > div[style*="position: fixed"][style*="bottom"][style*="left"]',
                    'body > div[style*="position:fixed"][style*="bottom"][style*="left"]'
                  ];

                  let removed = false;
                  selectors.forEach(selector => {
                    try {
                      const elements = document.querySelectorAll(selector);
                      elements.forEach(el => {
                        if (el && el.parentNode) {
                          const parent = el.parentNode;
                          const computedStyle = window.getComputedStyle(el);

                          // Log per debug
                          console.log('[DevTools Blocker] Removing element:', {
                            selector,
                            tagName: el.tagName,
                            id: el.id,
                            position: computedStyle.position,
                            bottom: computedStyle.bottom,
                            left: computedStyle.left
                          });

                          // Rimuovi l'elemento
                          el.remove();
                          removed = true;

                          // Se il parent è vuoto e non è body/html, rimuovi anche quello
                          if (parent.children.length === 0 &&
                              parent !== document.body &&
                              parent !== document.documentElement) {
                            console.log('[DevTools Blocker] Removing empty parent container');
                            parent.remove();
                          }
                        }
                      });
                    } catch (e) {
                      // Ignora errori di selector non validi
                    }
                  });

                  // Ricerca avanzata: cerca elementi fixed in posizione bottom-left
                  try {
                    const allFixedElements = document.querySelectorAll('*');
                    allFixedElements.forEach(el => {
                      const style = window.getComputedStyle(el);
                      if (style.position === 'fixed') {
                        const bottom = parseFloat(style.bottom);
                        const left = parseFloat(style.left);

                        // Elementi in posizione bottom-left (entro 100px dai bordi)
                        if (bottom <= 100 && left <= 100 && bottom >= 0 && left >= 0) {
                          // Escludi elementi noti del nostro sistema
                          const isOurElement = el.closest('[data-quickfy]') ||
                                             el.classList.contains('floating-language-switcher') ||
                                             el.classList.contains('cookie-consent-banner');

                          if (!isOurElement && el.tagName !== 'BODY' && el.tagName !== 'HTML') {
                            console.log('[DevTools Blocker] Removing suspicious bottom-left fixed element:', {
                              tagName: el.tagName,
                              id: el.id,
                              className: el.className,
                              bottom: style.bottom,
                              left: style.left,
                              width: style.width,
                              height: style.height
                            });
                            el.remove();
                            removed = true;
                          }
                        }
                      }
                    });
                  } catch (e) {
                    console.warn('[DevTools Blocker] Error in advanced search:', e);
                  }

                  return removed;
                }

                // === METODO 4: MutationObserver avanzato ===
                function setupMutationObserver() {
                  const observer = new MutationObserver(function(mutations) {
                    let shouldCheck = false;

                    mutations.forEach(mutation => {
                      if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                          if (node.nodeType === 1) {
                            const element = node;
                            // Controlla se è il bottone o lo contiene
                            if (
                              element.id === 'next-logo' ||
                              element.getAttribute?.('data-nextjs-dev-tools-button') ||
                              element.getAttribute?.('data-nextjs-portal') ||
                              element.querySelector?.('#next-logo') ||
                              element.querySelector?.('[data-nextjs-dev-tools-button]') ||
                              element.querySelector?.('[data-nextjs-portal]')
                            ) {
                              shouldCheck = true;
                            }

                            // Controlla elementi fixed
                            if (element.style?.position === 'fixed') {
                              shouldCheck = true;
                            }
                          }
                        });
                      }
                    });

                    if (shouldCheck) {
                      removeDevToolsCompletely();
                    }
                  });

                  // Observer principale sul body
                  const startObserving = () => {
                    if (document.body) {
                      observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['style', 'class', 'data-nextjs-portal', 'data-nextjs-dev-tools-button']
                      });
                      console.log('[DevTools Blocker] MutationObserver attivato');
                    }
                  };

                  if (document.body) {
                    startObserving();
                  } else {
                    document.addEventListener('DOMContentLoaded', startObserving);
                  }
                }

                // === METODO 5: Controllo periodico di sicurezza ===
                function periodicCheck() {
                  removeDevToolsCompletely();
                }

                // === INIZIALIZZAZIONE ===
                // Rimozione immediata
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', () => {
                    removeDevToolsCompletely();
                    setupMutationObserver();
                  });
                } else {
                  removeDevToolsCompletely();
                  setupMutationObserver();
                }

                // Controllo periodico ogni secondo (safety net)
                setInterval(periodicCheck, 1000);

                // Controllo aggiuntivo dopo caricamento completo
                window.addEventListener('load', () => {
                  setTimeout(removeDevToolsCompletely, 100);
                  setTimeout(removeDevToolsCompletely, 500);
                  setTimeout(removeDevToolsCompletely, 1000);
                  setTimeout(removeDevToolsCompletely, 2000);
                });

                console.log('[DevTools Blocker] Sistema completo di rimozione Next.js Dev Tools attivato');
              })();
            `
          }}
        />

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

        {/* Optimized performance monitoring - external file */}
        <Script
          src="/js/performance-monitor.js"
          strategy="lazyOnload"
          defer
        />
      </head>
      <body className={`${inter.className} relative min-h-screen overflow-x-hidden`}>
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
