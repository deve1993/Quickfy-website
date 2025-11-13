import { Organization, WithContext } from 'schema-dts';

/**
 * OrganizationSchema component for SEO
 * Implements Schema.org Organization structured data
 */
export function OrganizationSchema() {
  const schema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QuickFy',
    url: 'https://quickfy.com',
    logo: 'https://quickfy.com/quickfy_logo.svg',
    description: 'Marketing automation platform for SMBs - Streamline your marketing with AI-powered tools',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Czech', 'English', 'Italian'],
      email: 'info@quickfy.com'
    },
    sameAs: [
      'https://facebook.com/quickfy',
      'https://linkedin.com/company/quickfy',
      'https://twitter.com/quickfy'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebsiteSchema component for SEO
 * Implements Schema.org WebSite structured data with search action
 */
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'QuickFy',
    url: 'https://quickfy.com',
    description: 'Marketing automation platform for SMBs',
    publisher: {
      '@type': 'Organization',
      name: 'QuickFy'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://quickfy.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * SoftwareApplicationSchema for Whappi product
 */
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Whappi',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '19',
      priceCurrency: 'EUR',
      priceValidUntil: '2025-12-31'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127'
    },
    description: 'WhatsApp marketing automation tool for businesses'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
