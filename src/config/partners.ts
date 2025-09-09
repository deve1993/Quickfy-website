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
 */
export const partnersConfig: PartnersConfig = {
  logos: [
    {
      id: 'easychange',
      name: 'EasyChange',
      logoPath: '/logos/easychange_logo.svg',
      width: 140,
      height: 45,
      alt: 'EasyChange company logo',
      enabled: true,
      order: 1
    },
    {
      id: 'europlatba',
      name: 'Europlatba',
      logoPath: '/logos/europlatba_logo.svg',
      width: 130,
      height: 40,
      alt: 'Europlatba company logo',
      enabled: true,
      order: 2
    },
    {
      id: 'fl1-odoo-magic',
      name: 'FL1 Odoo Magic',
      logoPath: '/logos/FL1 _ Odoo Magic.svg',
      width: 120,
      height: 40,
      alt: 'FL1 Odoo Magic company logo',
      enabled: true,
      order: 3
    },
    {
      id: 'easyfunding',
      name: 'EasyFunding',
      logoPath: '/logos/logo_easyfunding_regular.svg',
      width: 160,
      height: 45,
      alt: 'EasyFunding company logo',
      enabled: true,
      order: 4
    },
    {
      id: 'terramare',
      name: 'TerraeMare',
      logoPath: '/logos/Logo_TerraeMare_black.svg',
      width: 104,
      height: 28,
      alt: 'TerraeMare company logo',
      enabled: true,
      order: 5
    },
    {
      id: 'minuteshop',
      name: 'Minuteshop',
      logoPath: '/logos/Minuteshop.svg',
      width: 95,
      height: 27,
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
    gap: 'gap-6 md:gap-8 lg:gap-10',
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