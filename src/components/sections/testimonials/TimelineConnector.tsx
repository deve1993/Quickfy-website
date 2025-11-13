'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TimelineConnectorProps {
  phaseColors: {
    problem: { gradient: string; ringColor: string; emoticon: string };
    discovery: { gradient: string; ringColor: string; emoticon: string };
    implementation: { gradient: string; ringColor: string; emoticon: string };
    results: { gradient: string; ringColor: string; emoticon: string };
  };
}

export function TimelineConnector({ phaseColors: _ }: TimelineConnectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
      {/* Background line */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 rounded-full" />

      {/* Animated progress line */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-red-400 via-yellow-400 via-blue-500 to-green-500 rounded-full shadow-lg"
      />

      {/* Phase dots */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg ring-4 ring-red-100"
      />

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg ring-4 ring-yellow-100"
      />

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute top-2/3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-4 ring-blue-100"
      />

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg ring-4 ring-green-100"
      />
    </div>
  );
}
