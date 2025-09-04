'use client';

import { motion } from 'framer-motion';

const logos = [
  {
    name: 'TechItalia',
    logo: '/logos/techitalia.svg',
    width: 120,
    height: 40
  },
  {
    name: 'InnovateCorp',
    logo: '/logos/innovatecorp.svg',
    width: 140,
    height: 35
  },
  {
    name: 'DigitalFlow',
    logo: '/logos/digitalflow.svg',
    width: 130,
    height: 42
  },
  {
    name: 'MarketPro',
    logo: '/logos/marketpro.svg',
    width: 125,
    height: 38
  },
  {
    name: 'GrowthLab',
    logo: '/logos/growthlab.svg',
    width: 135,
    height: 40
  },
  {
    name: 'ScaleUp',
    logo: '/logos/scaleup.svg',
    width: 115,
    height: 36
  }
];

export function LogosSection() {


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
            Trusted by leading companies worldwide
          </h2>
        </motion.div>

        {/* Infinite horizontal scrolling logos */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-12 items-center"
            animate={{ x: [-1200, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            style={{ width: "200%" }}
          >
            {/* First set of logos */}
            {logos.map((logo) => (
              <motion.div
                key={`first-${logo.name}`}
                className="group relative flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div 
                    className="flex items-center justify-center text-gray-400 font-bold text-lg whitespace-nowrap"
                    style={{ width: logo.width, height: logo.height }}
                  >
                    {logo.name}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {logos.map((logo) => (
              <motion.div
                key={`second-${logo.name}`}
                className="group relative flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div 
                    className="flex items-center justify-center text-gray-400 font-bold text-lg whitespace-nowrap"
                    style={{ width: logo.width, height: logo.height }}
                  >
                    {logo.name}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
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
            Join 500+ companies that trust QuickFy for their marketing automation
          </p>
        </motion.div>
      </div>
    </section>
  );
}