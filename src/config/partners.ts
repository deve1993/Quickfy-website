import { PartnersConfig } from '@/types/partners';

/**
 * Partner logos configuration
 *
 * To add a new partner logo:
 * 1. Add the SVG file to /public/logos/
 * 2. Add a new entry to the logos array below
 * 3. Set enabled: true and appropriate order value
 *
 * To temporarily hide a logo, set enabled: false
 *
 * Note: Dimensions are base sizes that will be scaled up automatically
 * to prevent cropping while maintaining aspect ratios.
 */
export const partnersConfig: PartnersConfig = {
  logos: [
    {
      id: 'easychange',
      name: 'EasyChange',
      logoPath: '/logos/easychange_logo.svg',
      width: 510,  // Doubled from 255 (100% increase)
      height: 166, // Doubled from 83 (100% increase)
      alt: 'EasyChange company logo',
      enabled: true,
      order: 1
    },
    {
      id: 'europlatba',
      name: 'Europlatba',
      logoPath: '/logos/europlatba_logo.svg',
      width: 480,  // Doubled from 240 (100% increase)
      height: 150, // Doubled from 75 (100% increase)
      alt: 'Europlatba company logo',
      enabled: true,
      order: 2
    },
    {
      id: 'fl1-odoo-magic',
      name: 'FL1 Odoo Magic',
      logoPath: '/logos/FL1 _ Odoo Magic.svg',
      width: 300,  // Doubled from 150 (100% increase)
      height: 100, // Doubled from 50 (100% increase)
      alt: 'FL1 Odoo Magic company logo',
      enabled: true,
      order: 3
    },
    {
      id: 'easyfunding',
      name: 'EasyFunding',
      logoPath: '/logos/logo_easyfunding_regular.svg',
      width: 168,  // Doubled from 84 (100% increase)
      height: 48,  // Doubled from 24 (100% increase)
      alt: 'EasyFunding company logo',
      enabled: true,
      order: 4
    },
    {
      id: 'terramare',
      name: 'TerraeMare',
      logoPath: '/logos/Logo_TerraeMare_black.svg',
      width: 260,  // Doubled from 130 (100% increase)
      height: 70,  // Doubled from 35 (100% increase)
      alt: 'TerraeMare company logo',
      enabled: true,
      order: 5
    },
    {
      id: 'minuteshop',
      name: 'Minuteshop',
      logoPath: '/logos/Minuteshop.svg',
      width: 240,  // Doubled from 120 (100% increase)
      height: 70,  // Doubled from 35 (100% increase)
      alt: 'Minuteshop company logo',
      enabled: true,
      order: 6
    }
  ],
  animation: {
    scrollDuration: 60,
    enabled: true
  },
  display: {
    gap: 'gap-2.5', // OPTIMIZED: Updated from gap-7 (28px) to gap-2.5 (10px) - Maximum proximity achieved with 0.625rem spacing for optimal brand recognition and mobile usability
    showHoverEffects: false
  }
};

/**
 * Get enabled partner logos sorted by order
 */
export const getEnabledPartners = () => {
  return partnersConfig.logos
    .filter(logo => logo.enabled)
    .sort((a, b) => a.order - b.order);
};

/**
 * Get partner by ID
 */
export const getPartnerById = (id: string) => {
  return partnersConfig.logos.find(logo => logo.id === id);
};

/**
 * Add a new partner (useful for dynamic management)
 */
export const addPartner = (partner: Omit<import('@/types/partners').PartnerLogo, 'id'> & { id?: string }) => {
  const newPartner = {
    ...partner,
    id: partner.id || partner.name.toLowerCase().replace(/\s+/g, '-'),
  };

  partnersConfig.logos.push(newPartner as import('@/types/partners').PartnerLogo);
  return newPartner;
};