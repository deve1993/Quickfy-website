'use client';

import { Suspense } from 'react';
import { cn } from '@/lib/utils';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

// Default loading skeleton
const DefaultSkeleton = ({ className, minHeight = '400px' }: { className?: string; minHeight?: string }) => (
  <div className={cn('animate-pulse bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl', className)} style={{ minHeight }}>
    <div className="p-8 space-y-4">
      <div className="h-8 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="h-20 bg-gray-300 rounded"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

export function LazyComponent({
  children,
  fallback,
  className,
  minHeight = '400px'
}: LazyComponentProps) {
  return (
    <Suspense fallback={fallback || <DefaultSkeleton className={className} minHeight={minHeight} />}>
      {children}
    </Suspense>
  );
}

// Specific loading skeletons for different components
export const RoadmapSkeleton = () => (
  <div className="animate-pulse py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
    </div>
  </div>
);

export const BenefitsSkeleton = () => (
  <div className="animate-pulse py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-200 rounded-lg w-1/3 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-3xl"></div>
        ))}
      </div>
    </div>
  </div>
);