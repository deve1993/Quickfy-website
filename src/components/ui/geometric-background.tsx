'use client';

import { motion } from 'framer-motion';

export default function GeometricBackground({
  children
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Simple static geometric pattern */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20" />

      {/* Floating geometric shapes - static positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static circles */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/20 blur-3xl" />
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-gradient-to-br from-purple-100/30 to-pink-100/20 blur-2xl" />
        <div className="absolute bottom-32 left-40 w-20 h-20 rounded-full bg-gradient-to-br from-blue-100/20 to-cyan-100/10 blur-xl" />
        
        {/* Static geometric shapes */}
        <svg className="absolute top-32 right-20 w-16 h-16 text-blue-200/20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
        </svg>
        <svg className="absolute bottom-40 right-60 w-12 h-12 text-purple-200/15" fill="currentColor" viewBox="0 0 24 24">
          <polygon points="12,2 22,20 2,20" />
        </svg>
        <svg className="absolute top-60 left-60 w-14 h-14 text-cyan-200/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
      </div>

      {/* Animated floating elements with subtle movement */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-24 h-24 bg-gradient-to-r from-blue-100/30 to-purple-100/20 rounded-full blur-2xl"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-2/3 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-100/20 to-pink-100/15 rounded-full blur-xl"
        animate={{
          y: [0, 8, 0],
          x: [0, -6, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
}