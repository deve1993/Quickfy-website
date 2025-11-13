'use client';

import { Users, Zap, Shield, TrendingUp, MessageSquare, Settings, BarChart3 } from 'lucide-react';
import { memo } from 'react';

interface FeatureIconProps {
  type: 'team' | 'integrations' | 'security' | 'performance' | 'analytics' | 'communication';
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FeatureIcon = memo(function FeatureIcon({
  type,
  className = '',
  animate = true,
  size = 'md'
}: FeatureIconProps) {

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const getIconConfig = () => {
    switch (type) {
      case 'team':
        return {
          icon: Users,
          gradient: 'from-blue-500 to-blue-600',
          bgGradient: 'from-blue-100 to-blue-200',
          pulse: 'from-blue-400 to-blue-500'
        };
      case 'integrations':
        return {
          icon: Zap,
          gradient: 'from-purple-500 to-purple-600',
          bgGradient: 'from-purple-100 to-purple-200',
          pulse: 'from-purple-400 to-purple-500'
        };
      case 'security':
        return {
          icon: Shield,
          gradient: 'from-green-500 to-green-600',
          bgGradient: 'from-green-100 to-green-200',
          pulse: 'from-green-400 to-green-500'
        };
      case 'performance':
        return {
          icon: TrendingUp,
          gradient: 'from-pink-500 to-pink-600',
          bgGradient: 'from-pink-100 to-pink-200',
          pulse: 'from-pink-400 to-pink-500'
        };
      case 'analytics':
        return {
          icon: BarChart3,
          gradient: 'from-cyan-500 to-cyan-600',
          bgGradient: 'from-cyan-100 to-cyan-200',
          pulse: 'from-cyan-400 to-cyan-500'
        };
      case 'communication':
        return {
          icon: MessageSquare,
          gradient: 'from-orange-500 to-orange-600',
          bgGradient: 'from-orange-100 to-orange-200',
          pulse: 'from-orange-400 to-orange-500'
        };
      default:
        return {
          icon: Settings,
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-100 to-gray-200',
          pulse: 'from-gray-400 to-gray-500'
        };
    }
  };

  const config = getIconConfig();
  const IconComponent = config.icon;

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Animated pulse background */}
      {animate && (
        <div className={`absolute inset-0 bg-gradient-to-br ${config.pulse} rounded-2xl animate-pulse opacity-30`} />
      )}

      {/* Main icon container */}
      <div className={`relative ${sizeClasses[size]} bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl`}>
        <IconComponent className={`${iconSizes[size]} text-white`} />
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 blur-xl`} />
    </div>
  );
});

// Custom SVG Icons for specific use cases
export const WhatsAppIcon = memo(function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
    </svg>
  );
});

export const TelegramIcon = memo(function TelegramIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L24 5.548c.309-1.239-.473-1.8-1.335-1.831z"/>
    </svg>
  );
});

export const MessengerIcon = memo(function MessengerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.133 3.26L19.764 8l-6.573 6.963z"/>
    </svg>
  );
});

// Composite icon for multi-platform integration
export const IntegrationIcon = memo(function IntegrationIcon({
  className = '',
  size = 'md'
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const containerSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`relative ${containerSizes[size]} ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl animate-pulse opacity-20" />

      {/* Main container */}
      <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
        {/* Central connection hub */}
        <div className="absolute w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <Zap className="w-3 h-3 text-purple-600" />
        </div>

        {/* Platform icons positioned around the center */}
        <div className="absolute top-1 left-1">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <WhatsAppIcon className={`${iconSizes[size]} text-white`} />
          </div>
        </div>

        <div className="absolute top-1 right-1">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <TelegramIcon className={`${iconSizes[size]} text-white`} />
          </div>
        </div>

        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
            <MessengerIcon className={`${iconSizes[size]} text-white`} />
          </div>
        </div>
      </div>
    </div>
  );
});