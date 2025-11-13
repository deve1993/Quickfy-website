'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Settings } from 'lucide-react';

interface CookieSettingsLinkProps {
  className?: string;
  showIcon?: boolean;
  variant?: 'link' | 'button';
}

export const CookieSettingsLink: React.FC<CookieSettingsLinkProps> = ({
  className = '',
  showIcon = false,
  variant = 'link'
}) => {
  const t = useTranslations();
  const { resetConsent } = useCookieConsent();

  const handleClick = () => {
    resetConsent(); // This will clear consent and show banner again
  };

  const baseClasses = variant === 'button' 
    ? 'inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200'
    : 'inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline transition-colors duration-200';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${className}`}
      type="button"
    >
      {showIcon && <Settings size={16} />}
      {t('cookieConsent.managePreferences')}
    </button>
  );
};