// Service Worker initialization - Extracted from inline to reduce render blocking
(function() {
  'use strict';

  // Check if service workers are supported and enabled
  function isServiceWorkerEnabled() {
    // Check if SW is available
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    // Check environment settings if available
    if (typeof window !== 'undefined' && window.__QUICKFY_ENV__) {
      // Only enable in production or when explicitly enabled
      return window.__QUICKFY_ENV__.NODE_ENV === 'production' ||
             window.__QUICKFY_ENV__.SERVICE_WORKER_ENABLED === 'true';
    }

    // Default: enable only if not on localhost
    return window.location.hostname !== 'localhost' &&
           window.location.hostname !== '127.0.0.1';
  }

  // Enhanced service worker registration with better error handling
  function registerServiceWorker() {
    if (!isServiceWorkerEnabled()) {
      console.log('Service Worker disabled for current environment');
      return;
    }

    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none' // Always fetch fresh SW script
    })
    .then((registration) => {
      console.log('Service Worker registered successfully:', registration.scope);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user or auto-refresh
              console.log('New content available, page will refresh...');
              // Optional: Show user notification here
              window.location.reload();
            }
          });
        }
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute
    })
    .catch((error) => {
      console.warn('Service Worker registration failed:', error);

      // Send error to monitoring service if available
      if (typeof window !== 'undefined' && window.__QUICKFY_ENV__ &&
          window.__QUICKFY_ENV__.ANALYTICS_ENABLED) {
        // Report SW registration failure to analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'service_worker_error', {
            error_message: error.message,
            error_stack: error.stack
          });
        }
      }
    });
  }

  // Initialize when page loads
  if (document.readyState === 'loading') {
    window.addEventListener('load', registerServiceWorker);
  } else {
    // Document already loaded
    registerServiceWorker();
  }

  // Handle service worker messages
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
        // Handle service worker update notifications
        console.log('Service Worker update available');
      }
    });
  }
})();