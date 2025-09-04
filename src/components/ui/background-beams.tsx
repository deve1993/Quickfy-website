'use client';

/**
 * BeamsBackground - A beautiful animated background component with light beams
 * 
 * Features:
 * - Animated light beams emanating from strategic points
 * - QuickFy brand colors (blue, purple, cyan)
 * - Smooth animations with varying speeds and delays
 * - Subtle floating orbs for depth
 * - Optimized for white backgrounds with good text contrast
 * - GPU-accelerated animations for smooth performance
 * 
 * Usage: Replace GeometricBackground with BeamsBackground for enhanced visual appeal
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BeamsBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function BeamsBackground({ children, className }: BeamsBackgroundProps) {
  // Generate multiple beam paths emanating from different strategic points
  const generateBeamPath = (startX: number, startY: number, endX: number, endY: number, curve: number = 0) => {
    const midX = (startX + endX) / 2 + curve;
    const midY = (startY + endY) / 2;
    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  const beams = [
    // Central radiating beams
    { path: generateBeamPath(400, 300, 100, 100, -50), duration: 12, delay: 0 },
    { path: generateBeamPath(400, 300, 700, 150, 80), duration: 15, delay: 2 },
    { path: generateBeamPath(400, 300, 200, 500, -30), duration: 18, delay: 4 },
    { path: generateBeamPath(400, 300, 600, 450, 60), duration: 14, delay: 1 },
    
    // Corner emanating beams
    { path: generateBeamPath(0, 0, 300, 200, 40), duration: 16, delay: 3 },
    { path: generateBeamPath(800, 0, 500, 250, -70), duration: 13, delay: 5 },
    { path: generateBeamPath(0, 600, 250, 350, 50), duration: 17, delay: 2.5 },
    { path: generateBeamPath(800, 600, 550, 400, -40), duration: 11, delay: 4.5 },
    
    // Diagonal crossing beams
    { path: generateBeamPath(150, 150, 650, 450, 100), duration: 20, delay: 1.5 },
    { path: generateBeamPath(650, 100, 200, 500, -80), duration: 19, delay: 3.5 },
    
    // Additional subtle beams for depth
    { path: generateBeamPath(300, 100, 500, 300, 30), duration: 22, delay: 6 },
    { path: generateBeamPath(100, 400, 700, 200, -90), duration: 16, delay: 7 },
  ];

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-white", className)}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="beams-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#beams-grid)" />
        </svg>
      </div>

      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-purple-50/15" />

      {/* Animated beams - GPU accelerated */}
      <div 
        className="absolute inset-0 pointer-events-none"
        role="presentation"
        aria-hidden="true"
      >
        <svg 
          className="w-full h-full will-change-transform" 
          viewBox="0 0 800 600" 
          fill="none"
          style={{ transform: 'translateZ(0)' }}
        >
          <defs>
            {beams.map((_, index) => (
              <motion.linearGradient
                key={`beam-gradient-${index}`}
                id={`beam-gradient-${index}`}
                gradientUnits="userSpaceOnUse"
                initial={{
                  x1: "0%",
                  y1: "0%",
                  x2: "0%",
                  y2: "0%"
                }}
                animate={{
                  x1: ["0%", "100%"],
                  y1: ["0%", "100%"],
                  x2: ["0%", "90%"],
                  y2: ["0%", "90%"]
                }}
                transition={{
                  duration: beams[index].duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: beams[index].delay
                }}
              >
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="20%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#06B6D4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </motion.linearGradient>
            ))}
            
            {/* Secondary gradient set for layering */}
            {beams.map((_, index) => (
              <motion.linearGradient
                key={`beam-gradient-secondary-${index}`}
                id={`beam-gradient-secondary-${index}`}
                gradientUnits="userSpaceOnUse"
                initial={{
                  x1: "100%",
                  y1: "100%",
                  x2: "100%",
                  y2: "100%"
                }}
                animate={{
                  x1: ["100%", "0%"],
                  y1: ["100%", "0%"],
                  x2: ["90%", "0%"],
                  y2: ["90%", "0%"]
                }}
                transition={{
                  duration: beams[index].duration + 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: beams[index].delay + 1
                }}
              >
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0" />
                <stop offset="30%" stopColor="#1D4ED8" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </motion.linearGradient>
            ))}
          </defs>
          
          {/* Render primary beams */}
          {beams.map((beam, index) => (
            <motion.path
              key={`beam-${index}`}
              d={beam.path}
              stroke={`url(#beam-gradient-${index})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: beam.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: beam.delay
              }}
            />
          ))}
          
          {/* Render secondary layer beams for depth */}
          {beams.map((beam, index) => (
            <motion.path
              key={`beam-secondary-${index}`}
              d={beam.path}
              stroke={`url(#beam-gradient-secondary-${index})`}
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: beam.duration + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: beam.delay + 2
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating light orbs - Subtle depth enhancement */}
      <div 
        className="absolute inset-0 pointer-events-none"
        role="presentation"
        aria-hidden="true"
      >
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/15 rounded-full blur-3xl"
          style={{ top: '20%', left: '15%' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-r from-cyan-300/25 to-blue-400/20 rounded-full blur-2xl"
          style={{ top: '60%', right: '20%' }}
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div
          className="absolute w-20 h-20 bg-gradient-to-r from-purple-300/20 to-cyan-300/15 rounded-full blur-xl"
          style={{ top: '40%', left: '70%' }}
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
}

BeamsBackground.displayName = 'BeamsBackground';

// Legacy export for backwards compatibility
export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => (
    <BeamsBackground className={className} />
  )
);

BackgroundBeams.displayName = 'BackgroundBeams';
