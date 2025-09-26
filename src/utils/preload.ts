// Preload strategico delle sezioni in base alla priorità
export const preloadComponent = (importFn: () => Promise<unknown>) => {
  // Preload solo dopo che la pagina è stata caricata
  if (typeof window !== 'undefined') {
    requestIdleCallback(() => {
      importFn().catch(() => {}); // Silent fail for preload
    });
  }
};

// Preload delle sezioni non critiche dopo il load
export const preloadNonCriticalSections = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Preload TestimonialsSection dopo 2 secondi
        preloadComponent(() => import('@/components/sections/TestimonialsSection'));
        
        // Preload PricingSection dopo 1 secondo  
        setTimeout(() => {
          preloadComponent(() => import('@/components/sections/PricingSection'));
        }, 1000);

        // Preload LogosSection dopo 3 secondi
        setTimeout(() => {
          preloadComponent(() => import('@/components/sections/LogosSection'));
        }, 3000);

        // Preload ContactSection dopo 4 secondi
        setTimeout(() => {
          preloadComponent(() => import('@/components/sections/ContactSection'));
        }, 4000);
      }, 2000);
    });
  }
};

// Intersection-based preload per sezioni vicine al viewport
export const setupIntersectionPreload = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const nextSection = target.getAttribute('data-next-section');
            
            if (nextSection) {
              switch (nextSection) {
                case 'testimonials':
                  preloadComponent(() => import('@/components/sections/TestimonialsSection'));
                  break;
                case 'pricing':
                  preloadComponent(() => import('@/components/sections/PricingSection'));
                  break;
                case 'logos':
                  preloadComponent(() => import('@/components/sections/LogosSection'));
                  break;
                case 'contact':
                  preloadComponent(() => import('@/components/sections/ContactSection'));
                  break;
              }
              observer.unobserve(target);
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    // Osserva le sezioni per preload anticipato
    document.querySelectorAll('[data-next-section]').forEach((el) => {
      observer.observe(el);
    });
  }
};