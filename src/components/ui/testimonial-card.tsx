'use client';

import { Star, Quote, Building, MapPin } from 'lucide-react';
import { memo } from 'react';

interface TestimonialCardProps {
  name?: string;
  role?: string;
  company?: string;
  location?: string;
  rating?: number;
  quote?: string;
  avatar?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed' | 'placeholder';
}

export const TestimonialCard = memo(function TestimonialCard({
  name = 'Marco Rossi',
  role = 'CEO',
  company = 'TechFlow Solutions',
  location = 'Milan, Italy',
  rating = 5,
  quote = 'Whappi has transformed how we handle customer communication. Our team collaboration improved by 300% and we never miss important messages anymore.',
  className = '',
  variant = 'default'
}: TestimonialCardProps) {

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const generateAvatar = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-blue-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-500'
    ];
    const colorIndex = name.length % colors.length;

    return (
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold`}>
        {initials}
      </div>
    );
  };

  if (variant === 'placeholder') {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200 ${className}`}>
        <div className="flex items-center space-x-3 mb-3">
          {generateAvatar(name)}
          <div className="flex-1">
            <div className="font-semibold text-gray-800">{name}</div>
            <div className="text-sm text-gray-600">{company}</div>
          </div>
          {renderStars(rating)}
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 ${className}`}>
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <Quote className="w-12 h-12 text-gray-400" />
        </div>

        {/* Rating */}
        <div className="flex justify-center mb-6">
          {renderStars(rating)}
        </div>

        {/* Quote */}
        <blockquote className="text-gray-800 text-lg leading-relaxed text-center mb-8 font-medium">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author info */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            {generateAvatar(name)}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-lg">{name}</div>
            <div className="text-gray-600">{role}</div>
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm mt-2">
              <Building className="w-4 h-4" />
              <span>{company}</span>
              {location && (
                <>
                  <span>•</span>
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Verification badge */}
        <div className="absolute bottom-4 right-4 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
          ✓ Verified
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Header with author info */}
      <div className="flex items-center space-x-4 mb-4">
        {generateAvatar(name)}
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-gray-600 text-sm">{role} at {company}</div>
          {location && (
            <div className="flex items-center space-x-1 text-gray-500 text-xs mt-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
          )}
        </div>
        {renderStars(rating)}
      </div>

      {/* Quote */}
      <p className="text-gray-700 leading-relaxed mb-4">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Bottom row with company info */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Building className="w-4 h-4" />
          <span>{company}</span>
        </div>
        <div className="text-green-600 font-medium">✓ Verified Review</div>
      </div>
    </div>
  );
});

// Social proof testimonials grid
export const TestimonialGrid = memo(function TestimonialGrid({ className = '' }: { className?: string }) {
  const testimonials = [
    {
      name: 'Marco Bianchi',
      role: 'Operations Manager',
      company: 'Retail Plus',
      location: 'Rome, Italy',
      rating: 5,
      quote: 'Customer support efficiency increased by 60%. Our team loves the unified inbox.'
    },
    {
      name: 'Sofia Greco',
      role: 'Marketing Director',
      company: 'Creative Studio',
      location: 'Florence, Italy',
      rating: 5,
      quote: 'Finally, all our messaging platforms in one place. Game changer for client communication.'
    },
    {
      name: 'Luigi Ferrari',
      role: 'CEO',
      company: 'Tech Solutions',
      location: 'Milan, Italy',
      rating: 5,
      quote: 'ROI was immediate. Saved 15 hours per week and never missed a customer message again.'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          {...testimonial}
          variant="default"
        />
      ))}
    </div>
  );
});

// Featured testimonial component
export const FeaturedTestimonial = memo(function FeaturedTestimonial({ className = '' }: { className?: string }) {
  return (
    <TestimonialCard
      name="Marco Rossi"
      role="Operations Director"
      company="TechItalia S.p.A."
      location="Milan, Italy"
      rating={5}
      quote="QuickFy helped us reduce administrative time by 60%. Our teams can now focus on strategic tasks instead of routine activities. ROI was achieved within just 3 months."
      variant="detailed"
      className={className}
    />
  );
});