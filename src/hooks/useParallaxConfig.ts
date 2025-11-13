'use client';

import { useEffect, useState } from 'react';

interface ParallaxConfig {
  enableParallax: boolean;
  elementCount: number;
  animationIntensity: number;
  blurAmount: number;
  isClient: boolean;
}

// Default configuration that matches SSR
const defaultConfig: ParallaxConfig = {
  enableParallax: true,
  elementCount: 80,
  animationIntensity: 1,
  blurAmount: 1,
  isClient: false,
};

export function useParallaxConfig(): ParallaxConfig {
  const [config, setConfig] = useState<ParallaxConfig>(defaultConfig);

  useEffect(() => {
    // Only run client-side detection after component has mounted
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device capabilities
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isMobile = window.innerWidth <= 768;
    const connection = 'connection' in navigator ? (navigator as { connection?: { effectiveType?: string } }).connection : undefined;
    const isSlowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';

    let newConfig: ParallaxConfig = {
      enableParallax: true,
      elementCount: 80,
      animationIntensity: 1,
      blurAmount: 1,
      isClient: true,
    };

    // Disable or reduce animations for accessibility
    if (prefersReducedMotion) {
      newConfig = {
        enableParallax: false,
        elementCount: 0,
        animationIntensity: 0,
        blurAmount: 0,
        isClient: true,
      };
    }
    // Optimize for mobile devices
    else if (isMobile) {
      newConfig = {
        enableParallax: true,
        elementCount: 60, // Reduced count for mobile
        animationIntensity: 0.7, // Reduced intensity
        blurAmount: 0.8, // Less blur for better performance
        isClient: true,
      };
    }
    // Optimize for low-end devices
    else if (isLowEndDevice || isSlowConnection) {
      newConfig = {
        enableParallax: true,
        elementCount: 50, // Further reduced count
        animationIntensity: 0.5, // Minimal intensity
        blurAmount: 0.5, // Minimal blur
        isClient: true,
      };
    }

    setConfig(newConfig);
  }, []);

  return config;
}

export default useParallaxConfig;