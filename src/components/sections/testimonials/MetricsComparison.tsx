'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MetricsComparisonProps {
  before: string;
  after: string;
  improvement: string;
}

export function MetricsComparison({ before, after, improvement }: MetricsComparisonProps) {
  const [_isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [setIsVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-6 p-6 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <span className="text-sm font-bold text-gray-800">Measurable Results</span>
      </div>

      {/* Before/After Comparison */}
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Before</div>
          <div className="text-2xl font-bold text-red-600">{before}</div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-xs font-semibold text-gray-500 uppercase mb-2">After</div>
          <div className="text-2xl font-bold text-green-600">{after}</div>
        </motion.div>
      </div>

      {/* Improvement Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        viewport={{ once: true }}
        className="mt-4 text-center"
      >
        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold rounded-full shadow-lg">
          {improvement}
        </span>
      </motion.div>
    </motion.div>
  );
}
