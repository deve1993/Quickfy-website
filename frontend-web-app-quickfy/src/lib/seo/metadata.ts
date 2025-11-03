import { Metadata } from "next";

/**
 * SEO metadata configuration for Quickfy
 */

// Base metadata shared across all pages
export const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Quickfy - Marketing Intelligence Platform",
    template: "%s | Quickfy",
  },
  description:
    "Piattaforma di marketing intelligence con AI. Gestisci Google Ads, social media, ticketing e ottieni insights in tempo reale per far crescere il tuo business.",
  keywords: [
    "marketing automation",
    "google ads",
    "social media management",
    "ai marketing",
    "marketing intelligence",
    "analytics dashboard",
    "business growth",
    "customer support",
  ],
  authors: [{ name: "Quickfy Team" }],
  creator: "Quickfy",
  publisher: "Quickfy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: "Quickfy",
    title: "Quickfy - Marketing Intelligence Platform",
    description:
      "Piattaforma di marketing intelligence con AI per far crescere il tuo business",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Quickfy Dashboard",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quickfy - Marketing Intelligence Platform",
    description:
      "Piattaforma di marketing intelligence con AI per far crescere il tuo business",
    images: ["/twitter-image.svg"],
    creator: "@quickfy",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }, // Fallback for older browsers
    ],
    shortcut: "/favicon-16x16.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/site.webmanifest",
};

/**
 * Generate metadata for dashboard pages
 */
export function generateDashboardMetadata(
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Quickfy`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Quickfy`,
      description,
    },
  };
}

/**
 * Page-specific metadata
 */
export const pageMetadata = {
  dashboard: generateDashboardMetadata(
    "Dashboard",
    "Panoramica completa delle tue metriche di marketing in tempo reale"
  ),
  tickets: generateDashboardMetadata(
    "Ticketing",
    "Gestisci richieste di supporto e segnalazioni clienti in modo efficiente"
  ),
  goals: generateDashboardMetadata(
    "Obiettivi & KPI",
    "Traccia e raggiungi i tuoi obiettivi aziendali con insights azionabili"
  ),
  campaigns: generateDashboardMetadata(
    "Google Ads",
    "Monitora e ottimizza le performance delle tue campagne pubblicitarie"
  ),
  reviews: generateDashboardMetadata(
    "Recensioni AI",
    "Analisi sentiment e suggerimenti automatici per gestire le recensioni"
  ),
  social: generateDashboardMetadata(
    "Social & AI",
    "Gestione social media e content generator con intelligenza artificiale"
  ),
  settings: generateDashboardMetadata(
    "Impostazioni",
    "Configura il tuo account e le preferenze della piattaforma"
  ),
};

/**
 * JSON-LD structured data for SEO
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Quickfy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
  },
  description:
    "Piattaforma di marketing intelligence con AI per gestire Google Ads, social media, ticketing e analytics",
  featureList: [
    "Dashboard Analytics in tempo reale",
    "Gestione Campagne Google Ads",
    "AI Marketing Assistant",
    "Ticketing e Customer Support",
    "Social Media Management",
    "Analisi Recensioni con AI",
  ],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
