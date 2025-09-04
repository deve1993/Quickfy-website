import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react', 
      '@radix-ui/react-icons',
      '@tabler/icons-react',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-slot'
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    gzipSize: true
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

      // Optimize chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Separate vendor chunks for better caching
            react: {
              name: 'react-vendor',
              test: /[\/]node_modules[\/](react|react-dom|scheduler)[\/]/,
              chunks: 'all',
              priority: 20,
              enforce: true
            },
            motion: {
              name: 'motion-vendor',
              test: /[\/]node_modules[\/](framer-motion|motion)[\/]/,
              chunks: 'all',
              priority: 15,
              enforce: true
            },
            icons: {
              name: 'icons-vendor',
              test: /[\/]node_modules[\/](@tabler\/icons-react|lucide-react|@radix-ui\/react-icons)[\/]/,
              chunks: 'all',
              priority: 15,
              enforce: true
            },
            ui: {
              name: 'ui-vendor',
              test: /[\/]node_modules[\/](@radix-ui|@hookform|react-hook-form|zod)[\/]/,
              chunks: 'all',
              priority: 10,
              enforce: true
            }
          }
        }
      };
    }
    
    return config;
  },
  // Enable static optimization
  output: 'standalone' as const,
  // Enable runtime optimizations
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}'
    },
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{kebabCase member}}'
    }
  }
};


export default withBundleAnalyzer(withNextIntl(nextConfig));