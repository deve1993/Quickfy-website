'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { calculatePasswordStrength } from '@/lib/validations/onboarding';

export interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const strengthConfig = {
  weak: {
    label: 'Debole',
    color: 'bg-red-500',
    textColor: 'text-red-600',
    bars: 1,
  },
  medium: {
    label: 'Media',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bars: 2,
  },
  strong: {
    label: 'Forte',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    bars: 3,
  },
};

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const strength = calculatePasswordStrength(password);
  const config = strengthConfig[strength];

  if (!password) {
    return null;
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Barre indicatore */}
      <div className="flex gap-2">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-300',
              bar <= config.bars ? config.color : 'bg-gray-200'
            )}
          />
        ))}
      </div>

      {/* Label forza */}
      <p className={cn('text-sm font-medium', config.textColor)}>
        Password {config.label}
      </p>

      {/* Suggerimenti */}
      {strength === 'weak' && (
        <div className="text-xs text-gray-500 space-y-1">
          <p>La password deve contenere:</p>
          <ul className="list-disc list-inside pl-2">
            <li>Almeno 8 caratteri</li>
            <li>Almeno una maiuscola</li>
            <li>Almeno un numero</li>
            <li>Almeno un carattere speciale</li>
          </ul>
        </div>
      )}
    </div>
  );
}
