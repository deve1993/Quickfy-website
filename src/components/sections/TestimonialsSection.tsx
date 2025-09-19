'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause, ThumbsUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  // Get testimonials from translations
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonial1.name'),
      role: t('testimonial1.role'),
      company: t('testimonial1.company'),
      content: t('testimonial1.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      id: 2,
      name: t('testimonial2.name'),
      role: t('testimonial2.role'),
      company: t('testimonial2.company'),
      content: t('testimonial2.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      id: 3,
      name: t('testimonial3.name'),
      role: t('testimonial3.role'),
      company: t('testimonial3.company'),
      content: t('testimonial3.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      id: 4,
      name: t('testimonial4.name'),
      role: t('testimonial4.role'),
      company: t('testimonial4.company'),
      content: t('testimonial4.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      id: 5,
      name: t('testimonial5.name'),
      role: t('testimonial5.role'),
      company: t('testimonial5.company'),
      content: t('testimonial5.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format'
    }
  ];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 25 : -25,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 25 : -25,
      scale: 0.9
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="relative py-24" id="testimonials">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6"
          >
            <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
            Client Success Stories
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
            {t('title')}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Premium Testimonials Slider - Optimized Card Size */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto perspective-1000"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Card Container - Massive Reduction (60% total) */}
          <div className="relative min-h-[235px] md:min-h-[196px] overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  rotateY: { duration: 0.6 },
                  scale: { duration: 0.4 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    nextSlide();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevSlide();
                  }
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <div className="h-full bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  {/* Minimal Padding (60% total reduction) */}
                  <div className="relative h-full p-3 md:p-4 lg:p-6">
                    {/* Tiny Decorative Elements (60% total reduction) */}
                    <div className="absolute top-3 left-3 w-6 h-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Quote className="w-3 h-3 text-blue-600/60 transform rotate-180" />
                    </div>
                    <div className="absolute bottom-3 right-3 w-6 h-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Quote className="w-3 h-3 text-purple-600/60" />
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col justify-center h-full text-center relative z-10">
                      {/* Star Rating */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-3"
                      >
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.3 + i * 0.1,
                              type: "spring",
                              stiffness: 500,
                              damping: 15
                            }}
                          >
                            <Star className="w-4 h-4 text-yellow-400 fill-current mx-0.5 drop-shadow-sm" />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Testimonial Text - Reduced Font Size */}
                      <motion.blockquote
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg lg:text-xl font-light text-gray-800 leading-relaxed mb-4 italic max-w-xl mx-auto"
                      >
                        &ldquo;{testimonials[currentIndex].content}&rdquo;
                      </motion.blockquote>

                      {/* Author Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-2"
                      >
                        <div className="relative">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-lg relative z-10"
                          >
                            <Image
                              src={testimonials[currentIndex].avatar}
                              alt={testimonials[currentIndex].name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-600/30 animate-pulse" />
                        </div>

                        <div className="text-center sm:text-left">
                          <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1 font-medium">
                            {testimonials[currentIndex].role}
                          </p>
                          <p className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {testimonials[currentIndex].company}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Prominent Navigation Arrows */}
          <div className="absolute inset-y-0 -left-16 md:-left-20 flex items-center z-20">
            <motion.button
              whileHover={{
                scale: 1.15,
                x: -8,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="group relative p-4 md:p-5 bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 z-30"
              style={{
                filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.1))',
              }}
              aria-label={t('previousTestimonial')}
            >
              {/* Gradient Background Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Glowing Ring Effect */}
              <div className="absolute inset-0 rounded-full ring-4 ring-blue-400/0 group-hover:ring-blue-400/20 transition-all duration-300" />

              {/* Arrow Icon */}
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-blue-600 transition-all duration-300 relative z-10 transform group-hover:scale-110" />

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          <div className="absolute inset-y-0 -right-16 md:-right-20 flex items-center z-20">
            <motion.button
              whileHover={{
                scale: 1.15,
                x: 8,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="group relative p-4 md:p-5 bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 z-30"
              style={{
                filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.1))',
              }}
              aria-label={t('nextTestimonial')}
            >
              {/* Gradient Background Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Glowing Ring Effect */}
              <div className="absolute inset-0 rounded-full ring-4 ring-purple-400/0 group-hover:ring-purple-400/20 transition-all duration-300" />

              {/* Arrow Icon */}
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-purple-600 transition-all duration-300 relative z-10 transform group-hover:scale-110" />

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mt-16 space-y-8"
        >
          {/* Dots Navigation */}
          <div className="flex items-center space-x-4">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'w-12 h-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${t('goToTestimonial')} ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-white/40 rounded-full"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Playback Control */}
          <motion.button
            onClick={toggleAutoplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 text-gray-600 hover:text-blue-600 transition-all duration-300"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span className="text-sm font-medium">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Play</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Premium Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Rating Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-32 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {t('trustIndicators.rating')}
                </p>
              </div>
            </motion.div>

            {/* Satisfied Clients Card with Thumbs Up */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-32 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {t('trustIndicators.clients')}
                </p>
              </div>
            </motion.div>

            {/* Successful Projects Card with Checkmark */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-32 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {t('trustIndicators.projects')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}