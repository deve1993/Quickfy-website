'use client';

import { useTranslations } from 'next-intl';

export function ProductSchema() {
  const t = useTranslations();
  const tProductSchema = useTranslations('productSchema');

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || 'https://quickfy.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QuickFy',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Marketing Automation Software',
    operatingSystem: 'Web Browser',
    description: t('meta.description'),
    url: baseUrl,
    image: `${baseUrl}/og-image.svg`,
    screenshot: `${baseUrl}/og-image.svg`,

    offers: [
      {
        '@type': 'Offer',
        name: t('pricing.plans.starter.name'),
        price: '299',
        priceCurrency: 'EUR',
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/#pricing`,
        description: t('pricing.plans.starter.perfectFor'),
        seller: {
          '@type': 'Organization',
          name: 'QuickFy'
        }
      },
      {
        '@type': 'Offer',
        name: t('pricing.plans.plus.name'),
        price: '499',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/PreOrder',
        url: `${baseUrl}/#pricing`,
        description: t('pricing.plans.plus.perfectFor'),
        seller: {
          '@type': 'Organization',
          name: 'QuickFy'
        }
      },
      {
        '@type': 'Offer',
        name: t('pricing.plans.pro.name'),
        price: '899',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/PreOrder',
        url: `${baseUrl}/#pricing`,
        description: t('pricing.plans.pro.perfectFor'),
        seller: {
          '@type': 'Organization',
          name: 'QuickFy'
        }
      }
    ],

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1'
    },

    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: t('testimonials.testimonial1.name')
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: t('testimonials.testimonial1.content')
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: t('testimonials.testimonial2.name')
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: t('testimonials.testimonial2.content')
      }
    ],

    featureList: [
      tProductSchema('features.0'),
      tProductSchema('features.1'),
      tProductSchema('features.2'),
      tProductSchema('features.3'),
      tProductSchema('features.4'),
      tProductSchema('features.5'),
      tProductSchema('features.6')
    ],

    softwareVersion: '1.0',

    provider: {
      '@type': 'Organization',
      name: 'QuickFy',
      url: baseUrl,
      logo: `${baseUrl}/quickfy_logo.svg`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
