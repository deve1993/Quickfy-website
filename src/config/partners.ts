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
      width: 255,  // Scaled up 50% from 170 (170 * 1.5 = 255)
      height: 83,  // Scaled up 50% from 55 (55 * 1.5 = 82.5, rounded to 83)
      alt: 'EasyChange company logo',
      enabled: true,
      order: 1
    },
    {
      id: 'europlatba',
      name: 'Europlatba',
      logoPath: '/logos/europlatba_logo.svg',
      width: 240,  // Scaled up 50% from 160 (160 * 1.5 = 240)
      height: 75,  // Scaled up 50% from 50 (50 * 1.5 = 75)
      alt: 'Europlatba company logo',
      enabled: true,
      order: 2
    },
    {
      id: 'fl1-odoo-magic',
      name: 'FL1 Odoo Magic',
      logoPath: '/logos/FL1 _ Odoo Magic.svg',
      width: 150,  // Increased from 120 for better readability
      height: 50,  // Increased from 40 to prevent text cropping
      alt: 'FL1 Odoo Magic company logo',
      enabled: true,
      order: 3
    },
    {
      id: 'easyfunding',
      name: 'EasyFunding',
      logoPath: '/logos/logo_easyfunding_regular.svg',
      width: 84,  // Reduced by 40% from 140 (140 * 0.6 = 84)
      height: 24,  // Reduced by 40% from 40 (40 * 0.6 = 24)
      alt: 'EasyFunding company logo',
      enabled: true,
      order: 4
    },
    {
      id: 'terramare',
      name: 'TerraeMare',
      logoPath: '/logos/Logo_TerraeMare_black.svg',
      width: 130,  // Increased from 104 for better visibility
      height: 35,  // Increased from 28 to prevent cropping
      alt: 'TerraeMare company logo',
      enabled: true,
      order: 5
    },
    {
      id: 'minuteshop',
      name: 'Minuteshop',
      logoPath: '/logos/Minuteshop.svg',
      width: 120,  // Increased from 95 for better readability
      height: 35,  // Increased from 27 to prevent cropping
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
    gap: 'gap-8 md:gap-10 lg:gap-12', // Increased gaps for better spacing with larger logos
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