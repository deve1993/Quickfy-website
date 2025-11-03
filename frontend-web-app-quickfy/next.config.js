const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allowed domains for external images
    domains: ['localhost'],
    // Remote patterns for more specific control (Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.quickfy.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Example for placeholder images
      },
    ],
    // Image formats to support (default: ['image/webp'])
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for next/image with sizes prop
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimization
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
    // Disable image optimization in development for faster builds
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    USE_MOCK_API: process.env.USE_MOCK_API || 'true',
  },
}

module.exports = withNextIntl(nextConfig)
