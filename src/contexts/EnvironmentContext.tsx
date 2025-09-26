'use client';

import { createContext, useContext, ReactNode } from 'react';
import { clientEnv, isDevelopment, isProduction, isLocalhost } from '@/lib/env';

interface EnvironmentContextValue {
  env: typeof clientEnv;
  isDevelopment: boolean;
  isProduction: boolean;
  isLocalhost: boolean;
}

const EnvironmentContext = createContext<EnvironmentContextValue | null>(null);

interface EnvironmentProviderProps {
  children: ReactNode;
}

export function EnvironmentProvider({ children }: EnvironmentProviderProps) {
  const value: EnvironmentContextValue = {
    env: clientEnv,
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isLocalhost: isLocalhost(),
  };

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
}

// Hook for safe environment access in client components
export function useEnv() {
  const { env } = useEnvironment();
  return env;
}

// Hook for environment detection
export function useEnvCheck() {
  const { isDevelopment, isProduction, isLocalhost } = useEnvironment();
  return { isDevelopment, isProduction, isLocalhost };
}