import { MetadataRoute } from "next";

/**
 * Robots.txt configuration for SEO
 * Controls which pages search engines can crawl
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/onboarding"],
        disallow: ["/dashboard/*", "/api/*"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/login", "/onboarding"],
        disallow: ["/dashboard/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
