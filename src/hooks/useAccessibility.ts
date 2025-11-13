'use client';

import React, { useEffect, useRef, useState } from 'react';

// Hook per la gestione del focus trap
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
  
  return containerRef;
}

// Hook per la gestione della navigazione da tastiera
export function useKeyboardNavigation() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };
    
    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  useEffect(() => {
    if (isKeyboardUser) {
      document.body.classList.add('keyboard-user');
    } else {
      document.body.classList.remove('keyboard-user');
    }
  }, [isKeyboardUser]);
  
  return { isKeyboardUser };
}

// Hook per la gestione degli annunci screen reader
export function useAnnouncer() {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  
  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    
    // Pulisce l'annuncio dopo un breve delay
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  };
  
  return { announcements, announce };
}

// Hook per la gestione del contrasto e delle preferenze utente
export function useUserPreferences() {
  const [preferences, setPreferences] = useState({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: false,
  });
  
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: motionQuery.matches,
        prefersHighContrast: contrastQuery.matches,
        prefersDarkMode: darkModeQuery.matches,
      });
    };
    
    updatePreferences();
    
    motionQuery.addEventListener('change', updatePreferences);
    contrastQuery.addEventListener('change', updatePreferences);
    darkModeQuery.addEventListener('change', updatePreferences);
    
    return () => {
      motionQuery.removeEventListener('change', updatePreferences);
      contrastQuery.removeEventListener('change', updatePreferences);
      darkModeQuery.removeEventListener('change', updatePreferences);
    };
  }, []);
  
  return preferences;
}

// Hook per la gestione dell'ARIA live regions
export function useAriaLive() {
  const liveRef = useRef<HTMLDivElement>(null);
  
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (liveRef.current) {
      liveRef.current.setAttribute('aria-live', priority);
      liveRef.current.textContent = message;
      
      // Pulisce dopo un delay
      setTimeout(() => {
        if (liveRef.current) {
          liveRef.current.textContent = '';
        }
      }, 1000);
    }
  };
  
  const LiveRegion = () => {
    return React.createElement('div', {
      ref: liveRef,
      className: 'sr-only',
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true'
    });
  };
  
  return { announce, LiveRegion };
}

// Hook per il skip links
export function useSkipLinks(labels?: { content: string; navigation: string; footer: string }) {
  const skipLinks = [
    { href: '#main-content', label: labels?.content || 'Skip to main content' },
    { href: '#navigation', label: labels?.navigation || 'Skip to navigation' },
    { href: '#footer', label: labels?.footer || 'Skip to footer' },
  ];

  const SkipLinks = () => {
    return React.createElement('div', {
      className: 'sr-only focus-within:not-sr-only'
    }, skipLinks.map((link) =>
      React.createElement('a', {
        key: link.href,
        href: link.href,
        className: 'absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      }, link.label)
    ));
  };

  return { SkipLinks };
}

// Hook per la gestione dell'accessibilità dei modali
export function useModalAccessibility(isOpen: boolean, onClose: () => void) {
  const modalRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      // Salva l'elemento precedentemente focalizzato
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Impedisce lo scroll del body
      document.body.style.overflow = 'hidden';
      
      // Focus sul modale
      setTimeout(() => modalRef.current?.focus(), 100);
      
      // Gestisce l'ESC key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      // Ripristina il focus e lo scroll
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    }
  }, [isOpen, onClose]);
  
  return modalRef;
}