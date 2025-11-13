import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variable configuration
  env: {
    // Custom environment variables
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Make sure NEXT_PUBLIC_ variables are properly exposed
  publicRuntimeConfig: {
    // These will be available on both server and client
    NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV || process.env.NODE_ENV,
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@tabler/icons-react',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-slot',
      'framer-motion'
    ],
    gzipSize: true,
    optimizeCss: true
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  images: {
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Reduced for better mobile
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment' as const,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config: any, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
    // Advanced webpack optimizations
    if (!dev && !isServer) {
      // Tree shaking for icons
      config.resolve.alias = {
        ...config.resolve.alias,
        '@tabler/icons-react$': '@tabler/icons-react/dist/esm/icons/index.mjs',
        'lucide-react$': 'lucide-react/dist/esm/lucide-react.js'
      };

      // Optimize chunks with safer configuration - DISABLED to fix Html import error
      // The aggressive chunking was causing Next.js to incorrectly bundle error page dependencies
      /*
      if (config.optimization && config.optimization.splitChunks) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // Large vendor packages for better caching
            react: {
              name: 'vendors-react',
              test: /[\/]node_modules[\/](react|react-dom|scheduler)[\/]/,
              chunks: 'all',
              priority: 20,
              reuseExistingChunk: true,
              enforce: true
            },
            // Animation libraries - safer chunking
            animations: {
              name: 'vendors-animations',
              test: /[\/]node_modules[\/](framer-motion)[\/]/,
              chunks: 'all',
              priority: 15,
              reuseExistingChunk: true,
              enforce: true,
              minSize: 20000 // Only create chunk if over 20KB
            },
            // Icon libraries
            icons: {
              name: 'vendors-icons',
              test: /[\/]node_modules[\/](@tabler\/icons-react|lucide-react|@radix-ui\/react-icons)[\/]/,
              chunks: 'all',
              priority: 12,
              reuseExistingChunk: true,
              minSize: 15000
            },
            // UI libraries
            ui: {
              name: 'vendors-ui',
              test: /[\/]node_modules[\/](@radix-ui|@hookform|react-hook-form|zod)[\/]/,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              minSize: 10000
            }
          }
        };
      }
      */
    }

    return config;
  },
  // Enable static optimization - temporarily disabled for development
  // output: 'standalone' as const,

  // Skip static generation for error pages to avoid Html import errors
  skipTrailingSlashRedirect: true,

  // Enable runtime optimizations
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}'
    },
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{kebabCase member}}'
    }
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};


export default withBundleAnalyzer(withNextIntl(nextConfig));
