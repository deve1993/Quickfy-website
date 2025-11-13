'use client';

import { Building, Star, CheckCircle } from 'lucide-react';
import { memo } from 'react';

interface LogoPlaceholderProps {
  name?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed';
  verified?: boolean;
}

export const LogoPlaceholder = memo(function LogoPlaceholder({
  name = 'Company',
  className = '',
  variant = 'default',
  verified = false
}: LogoPlaceholderProps) {

  const generateLogo = (companyName: string) => {
    const initials = companyName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-cyan-500 to-cyan-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ];

    const colorIndex = companyName.length % colors.length;

    return (
      <div className={`bg-gradient-to-br ${colors[colorIndex]} text-white font-bold rounded-lg flex items-center justify-center`}>
        {initials}
      </div>
    );
  };

  if (variant === 'minimal') {
    return (
      <div className={`relative group ${className}`}>
        <div className="w-20 h-12 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-lg flex items-center justify-center border border-gray-200">
          {generateLogo(name)}
        </div>
        {verified && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 group ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 relative">
            {generateLogo(name)}
            {verified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Building className="w-3 h-3" />
              <span>Trusted Partner</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`relative bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 relative">
          {generateLogo(name)}
          {verified && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 text-sm">{name}</h3>
          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 mt-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>4.9</span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Grid of client logos
export const ClientLogoGrid = memo(function ClientLogoGrid({ className = '' }: { className?: string }) {
  const clients = [
    'TechFlow Solutions',
    'Digital Marketing Pro',
    'Restaurant Chain',
    'E-commerce Plus',
    'Creative Agency',
    'Local Business',
    'Consulting Group',
    'Retail Masters',
    'Service Provider',
    'Growth Company',
    'Innovation Lab',
    'Smart Solutions'
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ${className}`}>
      {clients.map((client, index) => (
        <LogoPlaceholder
          key={index}
          name={client}
          variant="minimal"
          verified={index % 3 === 0} // Every third logo is verified
        />
      ))}
    </div>
  );
});

// Trusted by section
export const TrustedBySection = memo(function TrustedBySection({ className = '' }: { className?: string }) {
  const majorClients = [
    'Enterprise Corp',
    'Tech Startup',
    'Retail Chain',
    'Digital Agency',
    'SaaS Company',
    'E-commerce'
  ];

  return (
    <div className={`text-center ${className}`}>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Trusted by 500+ Companies
        </h3>
        <p className="text-gray-600">
          Join businesses that chose Whappi for better communication
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {majorClients.map((client, index) => (
          <LogoPlaceholder
            key={index}
            name={client}
            variant="minimal"
            verified={true}
          />
        ))}
      </div>

      {/* Trust indicators */}
      <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span>4.9/5 Average Rating</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>500+ Happy Clients</span>
        </div>
        <div className="flex items-center space-x-2">
          <Building className="w-4 h-4 text-blue-500" />
          <span>Enterprise Ready</span>
        </div>
      </div>
    </div>
  );
});

// Animated logo marquee
export const LogoMarquee = memo(function LogoMarquee({ className = '' }: { className?: string }) {
  const logos = [
    'Company A', 'Company B', 'Company C', 'Company D',
    'Company E', 'Company F', 'Company G', 'Company H'
  ];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex space-x-8">
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <LogoPlaceholder
              name={logo}
              variant="minimal"
              className="opacity-60 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

// Industry specific logos
export const IndustryLogos = memo(function IndustryLogos({
  industry = 'technology',
  className = ''
}: {
  industry?: 'technology' | 'retail' | 'healthcare' | 'finance';
  className?: string;
}) {
  const industryClients = {
    technology: ['TechCorp', 'DevStudio', 'AI Solutions', 'Cloud Services'],
    retail: ['Fashion Store', 'Electronics', 'Supermarket', 'Online Shop'],
    healthcare: ['HealthCare+', 'MedTech', 'Wellness', 'Pharma Co'],
    finance: ['FinanceApp', 'CreditUnion', 'Investment', 'Banking']
  };

  const clients = industryClients[industry] || industryClients.technology;

  return (
    <div className={`${className}`}>
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-gray-800 capitalize">
          {industry} Leaders Trust Whappi
        </h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {clients.map((client, index) => (
          <LogoPlaceholder
            key={index}
            name={client}
            variant="minimal"
            verified={true}
          />
        ))}
      </div>
    </div>
  );
});