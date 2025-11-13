'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { clientEnv, isDevelopment, isProduction } from '@/lib/env';

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
  // Initialize with safe default values
  const [isLocalhost, setIsLocalhost] = useState(false);

  // Check localhost only on client side after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLocalhost(
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      );
    }
  }, []);

  const value: EnvironmentContextValue = {
    env: clientEnv,
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isLocalhost,
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
