'use client';

import { useTranslations } from 'next-intl';
import { useState, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Star, TrendingUp, CheckCircle2, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TestimonialStats {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  industry: string;
  content: string;
  rating: number;
  avatar: string;
  verified: boolean;
  stats: TestimonialStats[];
  reviewCount?: number;
}

export const TestimonialsCarousel = memo(function TestimonialsCarousel() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Testimonials data with statistics
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonial1.name'),
      role: t('testimonial1.role'),
      company: t('testimonial1.company'),
      industry: 'Restaurant',
      content: t('testimonial1.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
      verified: true,
      reviewCount: 42,
      stats: [
        { label: 'Response Time', value: '2 min', change: '-85%', trend: 'up' },
        { label: 'Review Rating', value: '4.8/5', change: '+14%', trend: 'up' }
      ]
    },
    {
      id: 2,
      name: t('testimonial2.name'),
      role: t('testimonial2.role'),
      company: t('testimonial2.company'),
      industry: 'Beauty & Wellness',
      content: t('testimonial2.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format',
      verified: true,
      reviewCount: 87,
      stats: [
        { label: 'Instagram Growth', value: '+60%', change: '3 months', trend: 'up' },
        { label: 'Engagement Rate', value: '8.2%', change: '+120%', trend: 'up' }
      ]
    },
    {
      id: 3,
      name: t('testimonial3.name'),
      role: t('testimonial3.role'),
      company: t('testimonial3.company'),
      industry: 'Fitness & Sports',
      content: t('testimonial3.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
      verified: true,
      reviewCount: 156,
      stats: [
        { label: 'New Members', value: '+40%', change: 'Same budget', trend: 'up' },
        { label: 'Cost per Lead', value: '€18', change: '-35%', trend: 'up' }
      ]
    },
    {
      id: 4,
      name: t('testimonial4.name'),
      role: t('testimonial4.role'),
      company: t('testimonial4.company'),
      industry: 'Hospitality',
      content: t('testimonial4.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
      verified: true,
      reviewCount: 234,
      stats: [
        { label: 'Google Rating', value: '4.8★', change: '+0.6', trend: 'up' },
        { label: 'Bookings', value: '+60%', change: 'vs last year', trend: 'up' }
      ]
    },
    {
      id: 5,
      name: t('testimonial5.name'),
      role: t('testimonial5.role'),
      company: t('testimonial5.company'),
      industry: 'E-commerce',
      content: t('testimonial5.content'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format',
      verified: true,
      reviewCount: 89,
      stats: [
        { label: 'Campaign ROI', value: '+50%', change: 'First month', trend: 'up' },
        { label: 'Data Clarity', value: '100%', change: 'vs 20%', trend: 'up' }
      ]
    }
  ];

  const visibleCards = 3;
  const totalSlides = testimonials.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const _goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Ring colors for industries (matching badge colors)
  const getRingColor = (industry: string): string => {
    const ringColors: Record<string, string> = {
      'Restaurant': 'ring-orange-400/50',
      'Beauty & Wellness': 'ring-pink-400/50',
      'Fitness & Sports': 'ring-green-400/50',
      'Hospitality': 'ring-blue-400/50',
      'E-commerce': 'ring-violet-400/50'
    };
    return ringColors[industry] || 'ring-gray-300/50';
  };

  // Hover ring colors (more saturated for hover effect)
  const getHoverRingColor = (industry: string): string => {
    const hoverRingColors: Record<string, string> = {
      'Restaurant': 'hover:ring-orange-500',
      'Beauty & Wellness': 'hover:ring-pink-500',
      'Fitness & Sports': 'hover:ring-green-500',
      'Hospitality': 'hover:ring-blue-500',
      'E-commerce': 'hover:ring-violet-500'
    };
    return hoverRingColors[industry] || 'hover:ring-gray-400';
  };

  // Get visible cards (3 at a time)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % totalSlides;
      cards.push(testimonials[index]);
    }
    return cards;
  };

  const visibleTestimonials = getVisibleCards();

  return (
    <section className="relative py-24 overflow-hidden" id="testimonials">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Grid - Desktop: 3 cards, Mobile: 1 card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -300 : 300, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className={`${index > 0 ? 'hidden lg:block' : ''}`}
                >
                  {/* Testimonial Card */}
                  <motion.div
                    className={`relative bg-white rounded-3xl p-6 shadow-2xl border-2 border-transparent h-full flex flex-col ring-2 transition-all duration-300 ${getRingColor(testimonial.industry)} ${getHoverRingColor(testimonial.industry)}`}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      transition: { duration: 0.3, type: "spring", stiffness: 300 }
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {testimonial.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 ring-2 ring-white">
                            <BadgeCheck className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{testimonial.role}</p>
                        <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      {testimonial.reviewCount && (
                        <span className="text-sm text-gray-500">({testimonial.reviewCount} reviews)</span>
                      )}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-gray-700 leading-relaxed mb-6 italic flex-1">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    {/* Statistics */}
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-bold text-gray-800">Key Results</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {testimonial.stats.map((stat, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3">
                            <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {stat.value}
                            </div>
                            <div className="text-xs text-green-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {stat.change}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.button
              onClick={prevSlide}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent ring-2 ring-blue-400/50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent ring-2 ring-purple-400/50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </motion.button>
          </div>
        </div>

        {/* Trust Indicators (same as before) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Star, text: t('trustIndicators.rating'), gradient: 'from-yellow-400 to-orange-400', blur: 'from-yellow-600/10 to-orange-600/10' },
            { icon: CheckCircle2, text: t('trustIndicators.clients'), gradient: 'from-green-400 to-emerald-500', blur: 'from-green-600/10 to-emerald-600/10' },
            { icon: TrendingUp, text: t('trustIndicators.projects'), gradient: 'from-purple-500 to-blue-500', blur: 'from-purple-600/10 to-blue-600/10' }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.blur} rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl`} />
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-24 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-3">
                  <div className={`p-3 bg-gradient-to-r ${item.gradient} rounded-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
