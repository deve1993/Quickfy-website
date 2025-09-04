'use client';

import { useEffect } from 'react';

export function PreloadScript() {
  useEffect(() => {
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = '/_next/static/css/app/[locale]/layout.css';
    criticalCSS.onload = () => {
      criticalCSS.rel = 'stylesheet';
    };
    document.head.appendChild(criticalCSS);

    // Preconnect to external resources
    const preconnectLinks = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://images.unsplash.com'
    ];

    preconnectLinks.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      if (url.includes('fonts.gstatic.com')) {
        link.crossOrigin = '';
      }
      document.head.appendChild(link);
    });

    // Optimize long tasks with scheduler
    if ('scheduler' in window) {
      const scheduler = (window as unknown as { scheduler: { postTask: (callback: () => void, options: { priority: string }) => void } }).scheduler;
      
      // Schedule non-critical work
      scheduler.postTask(() => {
        // Pre-warm service worker
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').catch(() => {
            // Silent fail for service worker
          });
        }
      }, { priority: 'background' });
    }

    // Intersection Observer for below-the-fold content
    const observerOptions = {
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-next-section');
          if (section) {
            // Trigger section-specific optimizations
            import(`../components/sections/${section}Section`).catch(() => {
              // Silent fail for dynamic imports
            });
          }
        }
      });
    }, observerOptions);

    // Observe sections for dynamic loading
    const sections = document.querySelectorAll('[data-next-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}