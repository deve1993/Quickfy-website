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
      width: 170,  // Increased from 140 to accommodate natural SVG dimensions
      height: 55,  // Increased from 45 to maintain aspect ratio
      alt: 'EasyChange company logo',
      enabled: true,
      order: 1
    },
    {
      id: 'europlatba',
      name: 'Europlatba',
      logoPath: '/logos/europlatba_logo.svg',
      width: 160,  // Increased from 130 for better visibility
      height: 50,  // Increased from 40 to prevent cropping
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
      width: 140,  // Reduced from 190 to balance with other logos (26% reduction)
      height: 40,  // Reduced from 55 to maintain aspect ratio (27% reduction)
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