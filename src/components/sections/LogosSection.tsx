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
  const { animation } = partnersConfig;

  // If no logos are enabled, don't render the section
  if (enabledLogos.length === 0) {
    return null;
  }

  const renderLogo = (logo: PartnerLogo, keyPrefix: string) => (
    <motion.div
      key={`${keyPrefix}-${logo.id}`}
      className="relative flex-shrink-0 mx-6"
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
    >
      <div className="relative">
        <div
          className="flex items-center justify-center relative"
          style={{
            width: Math.min(logo.width * 2, 500), // 2x bigger, max 500px
            height: Math.min(logo.height * 2, 250) // 2x bigger, max 250px
          }}
        >
          <Image
            src={logo.logoPath}
            alt={logo.alt || `${logo.name} logo`}
            width={logo.width * 2}
            height={logo.height * 2}
            className="object-contain max-w-full max-h-full transition-transform duration-300"
            priority={false}
            style={{
              width: logo.width * 2,
              height: logo.height * 2,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
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
    </motion.div>
  );

  return (
    <section className="relative py-0 px-4 overflow-visible">
      <div className="max-w-6xl mx-auto py-12 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 pt-12 pb-4 overflow-visible"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-relaxed" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            {t('title')}
          </h2>
        </motion.div>

        {/* Infinite horizontal scrolling logos */}
        <div
          className="relative overflow-hidden py-12"
          style={{
            mask: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
            WebkitMask: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
            minHeight: '280px'
          }}
        >
          <motion.div
            className="flex items-center will-change-transform"
            style={{
              gap: '0rem', // No gap - logos close together
              width: "200%"
            }}
            animate={animation.enabled ? { x: [`0%`, `-50%`] } : {}}
            transition={{
              duration: animation.scrollDuration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
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
