'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, Clock } from 'lucide-react';
import { MetricsComparison } from './MetricsComparison';

interface Metrics {
  before: string;
  after: string;
  improvement: string;
}

interface StoryCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  timeframe: string;
  metrics?: Metrics;
  isLeft?: boolean;
  gradient: string;
  delay?: number;
}

export function StoryCard({
  name,
  role,
  company,
  content,
  avatar,
  rating,
  timeframe,
  metrics,
  isLeft = false,
  gradient,
  delay = 0
}: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
      className={`relative ${isLeft ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'} max-w-2xl`}
    >
      {/* Glassmorphism Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden"
      >
        {/* Decorative gradient overlay */}
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-3xl -z-10`} />

        {/* Quote Decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <Quote className="w-4 h-4 text-blue-600/60 transform rotate-180" />
        </div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <Quote className="w-4 h-4 text-purple-600/60" />
        </div>

        {/* Timeframe Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">{timeframe}</span>
        </motion.div>

        {/* Star Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          viewport={{ once: true }}
          className="flex gap-1 mb-4"
        >
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
          ))}
        </motion.div>

        {/* Testimonial Content */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
          viewport={{ once: true }}
          className="text-lg text-gray-800 leading-relaxed mb-6 italic relative z-10"
        >
          &ldquo;{content}&rdquo;
        </motion.blockquote>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-lg relative z-10">
              <Image
                src={avatar}
                alt={name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${gradient} opacity-30 animate-pulse`} />
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600 font-medium">{role}</p>
            <p className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {company}
            </p>
          </div>
        </motion.div>

        {/* Metrics Comparison */}
        {metrics && (
          <MetricsComparison
            before={metrics.before}
            after={metrics.after}
            improvement={metrics.improvement}
          />
        )}
      </motion.div>

      {/* Connection dot to timeline (desktop only) */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.6 }}
        viewport={{ once: true }}
        className={`hidden md:block absolute top-8 ${isLeft ? 'right-8' : 'left-8'} w-4 h-4 rounded-full bg-gradient-to-r ${gradient} shadow-lg ring-4 ring-white`}
      />
    </motion.div>
  );
}
