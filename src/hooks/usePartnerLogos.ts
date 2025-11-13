import { useMemo } from 'react';
import { getEnabledPartners, getPartnerById, partnersConfig } from '@/config/partners';
import type { PartnerLogo } from '@/types/partners';

/**
 * Custom hook for managing partner logos
 * Provides convenient methods for accessing and filtering partner data
 */
export const usePartnerLogos = () => {
  const enabledLogos = useMemo(() => getEnabledPartners(), []);
  
  const getPartner = useMemo(() => (id: string): PartnerLogo | undefined => {
    return getPartnerById(id);
  }, []);
  
  const getLogosByCategory = useMemo(() => (filterFn: (logo: PartnerLogo) => boolean) => {
    return enabledLogos.filter(filterFn);
  }, [enabledLogos]);
  
  const getRandomLogos = useMemo(() => (count: number): PartnerLogo[] => {
    const shuffled = [...enabledLogos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, [enabledLogos]);
  
  const stats = useMemo(() => ({
    total: partnersConfig.logos.length,
    enabled: enabledLogos.length,
    disabled: partnersConfig.logos.length - enabledLogos.length
  }), [enabledLogos.length]);
  
  return {
    /** All enabled partner logos sorted by order */
    logos: enabledLogos,
    /** Get a specific partner by ID */
    getPartner,
    /** Filter logos by custom criteria */
    getLogosByCategory,
    /** Get random selection of logos */
    getRandomLogos,
    /** Statistics about logos */
    stats,
    /** Configuration settings */
    config: partnersConfig
  };
};