'use client';

import { Shield, MapPin, Award, CheckCircle } from 'lucide-react';
import { memo } from 'react';

interface TrustBadgeProps {
  type: 'gdpr' | 'madeInItaly' | 'certified' | 'verified';
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed';
}

export const TrustBadge = memo(function TrustBadge({
  type,
  className = '',
  variant = 'default'
}: TrustBadgeProps) {

  const getBadgeConfig = () => {
    switch (type) {
      case 'gdpr':
        return {
          icon: Shield,
          title: 'GDPR Compliant',
          subtitle: 'EU Data Protection',
          gradient: 'from-green-500 to-green-600',
          bgGradient: 'from-green-50 to-green-100',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          subtitleColor: 'text-green-600'
        };
      case 'madeInItaly':
        return {
          icon: MapPin,
          title: 'Made in Italy',
          subtitle: 'Developed in Italy',
          gradient: 'from-red-500 via-white to-green-500',
          bgGradient: 'from-red-50 via-white to-green-50',
          borderColor: 'border-red-200',
          textColor: 'text-gray-800',
          subtitleColor: 'text-gray-600',
          isFlag: true
        };
      case 'certified':
        return {
          icon: Award,
          title: 'ISO Certified',
          subtitle: 'Quality Standards',
          gradient: 'from-blue-500 to-blue-600',
          bgGradient: 'from-blue-50 to-blue-100',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          subtitleColor: 'text-blue-600'
        };
      case 'verified':
        return {
          icon: CheckCircle,
          title: 'Verified',
          subtitle: 'Trusted Platform',
          gradient: 'from-purple-500 to-purple-600',
          bgGradient: 'from-purple-50 to-purple-100',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-700',
          subtitleColor: 'text-purple-600'
        };
      default:
        return {
          icon: Shield,
          title: 'Secure',
          subtitle: 'Protected',
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-100',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700',
          subtitleColor: 'text-gray-600'
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm border ${config.borderColor} rounded-full ${className}`}>
        <div className={`w-5 h-5 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center`}>
          <IconComponent className="w-3 h-3 text-white" />
        </div>
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.title}
        </span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-white/90 backdrop-blur-sm border ${config.borderColor} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-md`}>
            {config.isFlag ? (
              <ItalianFlag className="w-8 h-6" />
            ) : (
              <IconComponent className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className={`font-semibold ${config.textColor}`}>
              {config.title}
            </h3>
            <p className={`text-sm ${config.subtitleColor}`}>
              {config.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`inline-flex items-center space-x-3 px-4 py-3 bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      <div className={`w-8 h-8 bg-gradient-to-br ${config.gradient} rounded-lg flex items-center justify-center`}>
        {config.isFlag ? (
          <ItalianFlag className="w-6 h-4" />
        ) : (
          <IconComponent className="w-4 h-4 text-white" />
        )}
      </div>
      <div>
        <div className={`font-semibold text-sm ${config.textColor}`}>
          {config.title}
        </div>
        <div className={`text-xs ${config.subtitleColor}`}>
          {config.subtitle}
        </div>
      </div>
    </div>
  );
});

// Italian Flag SVG Component
const ItalianFlag = memo(function ItalianFlag({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none">
      <rect width="8" height="16" fill="#009246" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#CE2B37" />
    </svg>
  );
});

// Security and GDPR specific badge
export const SecurityBadge = memo(function SecurityBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full inline-flex items-center space-x-2 shadow-lg ${className}`}>
      <Shield className="w-5 h-5" />
      <span className="font-semibold text-sm">GDPR Compliant</span>
      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
    </div>
  );
});

// Made in Italy badge with flag
export const MadeInItalyBadge = memo(function MadeInItalyBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <ItalianFlag className="w-6 h-4" />
      <span className="font-semibold text-gray-800 text-sm">Made in Italy</span>
    </div>
  );
});

// Composite trust indicator
export const TrustIndicator = memo(function TrustIndicator({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      <TrustBadge type="gdpr" variant="minimal" />
      <TrustBadge type="madeInItaly" variant="minimal" />
      <div className="inline-flex items-center space-x-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded-full">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-blue-700">EU Hosted</span>
      </div>
    </div>
  );
});