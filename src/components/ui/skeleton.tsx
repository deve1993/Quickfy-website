'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className, animate = true, ...props }: SkeletonProps) {
  const baseProps = {
    className: cn('bg-gray-200 rounded-md', className),
    role: "status" as const,
    "aria-label": "Contenuto in caricamento"
  };
  
  if (animate) {
    return (
      <motion.div
        {...baseProps}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={props.style}
        onClick={props.onClick}
      />
    );
  }
  
  return (
    <div
      {...baseProps}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className, ...props }: { lines?: number } & SkeletonProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4 bg-gray-200',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('p-6 space-y-4', className)} {...props}>
      <Skeleton className="h-8 w-3/4" />
      <SkeletonText lines={3} />
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}

export function SkeletonButton({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton 
      className={cn('h-10 w-24 rounded-lg', className)} 
      {...props}
    />
  );
}

export function SkeletonImage({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton 
      className={cn('w-full aspect-video rounded-lg', className)} 
      {...props}
    />
  );
}

// Loading states for specific sections
export function HeroSectionSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" role="status" aria-label="Sezione Hero in caricamento">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-5/6 mx-auto" />
        </div>
        
        <SkeletonButton className="w-48 h-12 mx-auto" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/80 rounded-xl p-6 space-y-3">
              <Skeleton className="h-12 w-16 mx-auto" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturesSectionSkeleton() {
  return (
    <div className="py-24 px-4" role="status" aria-label="Sezione funzionalità in caricamento">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Skeleton className="h-12 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 space-y-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <Skeleton className="h-8 w-3/4" />
              <SkeletonText lines={4} />
              <div className="space-y-2 pt-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}