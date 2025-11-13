'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { BarChart3, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardMockupProps {
  imageSrc?: string;
  alt?: string;
  enableParallax?: boolean;
  enableTilt?: boolean;
  enableFloating?: boolean;
  className?: string;
}

export function DashboardMockup({
  imageSrc = '/screenshots/2.png',
  alt = 'QuickFy Dashboard Interface',
  enableParallax = true,
  enableTilt = true,
  enableFloating = true,
  className
}: DashboardMockupProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 20
  });

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Floating animation variants
  const floatingVariants = enableFloating ? {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  } : undefined;

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Disable animations if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full perspective-[1200px]', className)}
      onMouseMove={shouldAnimate && enableTilt ? handleMouseMove : undefined}
      onMouseEnter={() => shouldAnimate && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        variants={shouldAnimate ? floatingVariants : undefined}
        animate="animate"
        style={{
          rotateX: shouldAnimate && enableTilt ? rotateX : 0,
          rotateY: shouldAnimate && enableTilt ? rotateY : 0,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full"
      >
        {/* Glassmorphic Frame */}
        <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0"
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Dashboard Image */}
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover object-center"
              style={{ objectPosition: 'center 30%' }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
            />
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>

        {/* Badge Analytics posizionato in alto a destra */}
        <div className="absolute top-16 -right-8 z-10">
          <Badge icon={BarChart3} label="Analytics" color="blue" />
        </div>

        {/* Badge viola posizionato al centro */}
        <div className="absolute top-1/2 -left-8 z-10">
          <Badge icon={Users} label="Team" color="purple" />
        </div>

        {/* Badge rosa posizionato in basso più a destra */}
        <div className="absolute -bottom-2 left-20 z-10">
          <Badge icon={TrendingUp} label="Growth" color="pink" />
        </div>

        {/* 3D Depth Shadow */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent blur-2xl rounded-full"
          style={{ transform: 'translateZ(-50px)' }}
        />
      </motion.div>
    </div>
  );
}

// Badge component for feature indicators
interface BadgeProps {
  icon: React.ElementType;
  label: string;
  color: 'green' | 'blue' | 'purple' | 'pink';
}

function Badge({ icon: Icon, label, color }: BadgeProps) {
  const colorClasses = {
    green: 'from-green-500/90 to-emerald-500/90',
    blue: 'from-blue-500/90 to-cyan-500/90',
    purple: 'from-purple-500/90 to-violet-500/90',
    pink: 'from-pink-500/90 to-rose-500/90'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'bg-gradient-to-r backdrop-blur-sm',
        'text-white text-xs font-semibold',
        // Enhanced shadow for floating effect
        'shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)]',
        'hover:shadow-[0_12px_24px_rgba(0,0,0,0.35),0_6px_12px_rgba(0,0,0,0.25)]',
        'transition-shadow duration-300',
        colorClasses[color]
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </motion.div>
  );
}
