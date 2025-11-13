'use client';

import { ReactNode } from 'react';
import { ClientOnly } from './ClientOnly';

interface PhoneLinkProps {
  phoneNumber: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * PhoneLink component that prevents hydration mismatches caused by
 * browser extensions (like 3CX) that modify phone number links.
 * Wraps the phone link in ClientOnly to ensure consistent rendering.
 */
export function PhoneLink({ 
  phoneNumber, 
  children, 
  className = '',
  ariaLabel 
}: PhoneLinkProps) {
  return (
    <ClientOnly 
      fallback={
        <span className={className} aria-label={ariaLabel}>
          {children}
        </span>
      }
    >
      <a 
        href={`tel:${phoneNumber}`}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    </ClientOnly>
  );
}

export default PhoneLink;