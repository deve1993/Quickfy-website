'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getEnabledPartners, partnersConfig } from '@/config/partners';
import type { PartnerLogo } from '@/types/partners';
import { useTranslations } from 'next-intl';

export function LogosSection() {
  // Get translations
  const t = useTranslations('logos');
  
  // Get enabled partner logos from configuration
  const enabledLogos = getEnabledPartners();
  const { animation, display } = partnersConfig;

  // If no logos are enabled, don't render the section
  if (enabledLogos.length === 0) {
    return null;
  }

  const renderLogo = (logo: PartnerLogo, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${logo.id}`}
      className="relative flex-shrink-0"
    >
      <div className="relative p-8 rounded-xl bg-white/90 backdrop-blur-sm border border-white/40 shadow-sm">
        <div 
          className="flex items-center justify-center relative min-w-fit"
          style={{ width: logo.width, height: logo.height }}
        >
          <Image
            src={logo.logoPath}
            alt={logo.alt || `${logo.name} logo`}
            width={logo.width}
            height={logo.height}
            className="object-contain max-w-none"
            priority={false}
            onError={(e) => {
              // Fallback to text display if image fails to load
              const target = e.target as HTMLElement;
              if (target.parentElement) {
                target.parentElement.innerHTML = `
                  <div class="flex items-center justify-center text-gray-400 font-bold text-lg whitespace-nowrap w-full h-full">
                    ${logo.name}
                  </div>
                `;
              }
            }}
          />
        </div>
        
        {/* Optional website link */}
        {logo.website && (
          <a
            href={logo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Visit ${logo.name} website`}
          />
        )}
      </div>
    </div>
  );

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
            {t('title')}
          </h2>
        </motion.div>

        {/* Infinite horizontal scrolling logos */}
        <div 
          className="relative overflow-hidden" 
          style={{
            mask: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
            WebkitMask: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)'
          }}
        >
          <motion.div
            className={`flex ${display.gap} items-center will-change-transform`}
            animate={animation.enabled ? { x: [`0%`, `-50%`] } : {}}
            transition={{
              duration: animation.scrollDuration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            style={{ width: "200%" }}
          >
            {/* First set of logos */}
            {enabledLogos.map((logo) => renderLogo(logo, 'first'))}
            
            {/* Duplicate set for seamless loop */}
            {enabledLogos.map((logo) => renderLogo(logo, 'second'))}
          </motion.div>
        </div>

        {/* Stats or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('description', { count: Math.round(enabledLogos.length * 85) })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}