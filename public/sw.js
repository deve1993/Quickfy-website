// Service Worker for performance optimization and BFCache compatibility

const CACHE_NAME = 'quickfy-v1';
const STATIC_CACHE_NAME = 'quickfy-static-v1';

// Assets to cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/chunks/',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName !== CACHE_NAME && 
            cacheName !== STATIC_CACHE_NAME
          )
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Handle static assets
  if (request.url.includes('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request).then((response) => {
        // Cache successful responses
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Handle HTML pages with stale-while-revalidate
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.match(request).then((response) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
          });
          return networkResponse;
        });

        return response || fetchPromise;
      })
    );
  }
});

// Handle background sync (for offline form submissions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(
      // Handle queued form submissions when back online
      processQueuedForms()
    );
  }
});

async function processQueuedForms() {
  // Implementation for handling offline form submissions
  // This would process any forms stored in IndexedDB while offline
  console.log('Processing queued forms...');
}

// Optimize service worker for BFCache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Clean up any long-running operations before page goes to BFCache
  if (event.data && event.data.type === 'PREPARE_BFCACHE') {
    // Cancel any ongoing network requests
    // Clean up timers or intervals
    // Remove event listeners that might prevent BFCache
  }
});

// Prevent service worker from interfering with BFCache
self.addEventListener('beforeunload', () => {
  // Clean up resources before page unload
});

// Handle push notifications (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'quickfy-notification',
        requireInteraction: false,
        actions: data.actions || []
      })
    );
  }
});