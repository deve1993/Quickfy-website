'use client';

import { motion } from 'framer-motion';

interface PhaseHeaderProps {
  phase: 'problem' | 'discovery' | 'implementation' | 'results';
  phaseNumber: number;
  title: string;
  emoticon: string;
  gradient: string;
  ringColor: string;
}

export function PhaseHeader({ phase, phaseNumber, title, emoticon, gradient, ringColor }: PhaseHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-8"
    >
      {/* Emoticon Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        viewport={{ once: true }}
        className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl ${ringColor}`}
      >
        <span className="text-3xl" role="img" aria-label={phase}>
          {emoticon}
        </span>
      </motion.div>

      {/* Phase Title */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-2"
        >
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient} shadow-lg`}>
            Phase {phaseNumber}/4
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {title}
        </motion.h3>
      </div>
    </motion.div>
  );
}
