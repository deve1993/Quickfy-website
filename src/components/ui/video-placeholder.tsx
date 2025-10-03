'use client';

import { Play, Volume2, Maximize } from 'lucide-react';
import { memo, useState } from 'react';

interface VideoPlaceholderProps {
  title?: string;
  description?: string;
  duration?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed';
  onPlay?: () => void;
}

export const VideoPlaceholder = memo(function VideoPlaceholder({
  title = 'Whappi Demo',
  description = 'See how Whappi transforms team communication',
  duration = '2:30',
  className = '',
  variant = 'default',
  onPlay
}: VideoPlaceholderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    } else {
      // Default behavior - could open a modal or navigate to video
      console.log('Playing video:', title);
    }
  };

  if (variant === 'minimal') {
    return (
      <div
        className={`relative bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 rounded-xl overflow-hidden cursor-pointer group ${className}`}
        onClick={handlePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        </div>

        {/* Content */}
        <div className="relative p-8 text-center">
          <div className={`w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
            isHovered ? 'scale-110 bg-white/30' : ''
          }`}>
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
          <h3 className="text-white font-semibold mt-4">{title}</h3>
          <p className="text-white/80 text-sm mt-2">{description}</p>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div
        className={`relative bg-gray-900 rounded-3xl overflow-hidden cursor-pointer group ${className}`}
        onClick={handlePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fake video thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative">
          {/* Mock interface elements */}
          <div className="absolute inset-0 p-6">
            {/* Mock WhatsApp chat */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
                <div>
                  <div className="h-3 w-20 bg-white/40 rounded mb-1" />
                  <div className="h-2 w-16 bg-white/30 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-32 bg-white/40 rounded" />
                <div className="h-3 w-24 bg-white/30 rounded" />
              </div>
            </div>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isHovered ? 'scale-110 bg-white shadow-3xl' : ''
            }`}>
              <Play className="w-10 h-10 text-gray-800 ml-1" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {duration}
          </div>

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* Video controls bar */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <Maximize className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full w-0 group-hover:w-1/4 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`relative aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl ${className}`}
      onClick={handlePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Mock app interface */}
        <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm rounded-xl p-3 max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-green-400 rounded-full" />
            <div className="h-2 w-16 bg-white/60 rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-2 w-24 bg-white/50 rounded" />
            <div className="h-2 w-20 bg-white/40 rounded" />
          </div>
        </div>

        {/* Platform badges */}
        <div className="absolute bottom-6 left-6 flex space-x-2">
          <div className="bg-green-500/20 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
            WhatsApp
          </div>
          <div className="bg-blue-500/20 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
            Telegram
          </div>
          <div className="bg-purple-500/20 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
            Messenger
          </div>
        </div>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isHovered ? 'scale-110 bg-white shadow-3xl' : ''
        }`}>
          <Play className="w-12 h-12 text-gray-800 ml-1" />
        </div>
      </div>

      {/* Duration and title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {duration}
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Subtle animation lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-60" />
    </div>
  );
});

// Simple play button component
export const PlayButton = memo(function PlayButton({
  size = 'md',
  className = '',
  onClick
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-white hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <Play className={`${iconSizes[size]} text-gray-800 ml-0.5`} />
    </button>
  );
});

// Video thumbnail grid
export const VideoGrid = memo(function VideoGrid({ className = '' }: { className?: string }) {
  const videos = [
    {
      title: 'Getting Started',
      description: 'Quick setup guide',
      duration: '1:45'
    },
    {
      title: 'Team Collaboration',
      description: 'Working together seamlessly',
      duration: '2:30'
    },
    {
      title: 'Advanced Features',
      description: 'Power user tips',
      duration: '3:15'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {videos.map((video, index) => (
        <VideoPlaceholder
          key={index}
          {...video}
          variant="minimal"
        />
      ))}
    </div>
  );
});