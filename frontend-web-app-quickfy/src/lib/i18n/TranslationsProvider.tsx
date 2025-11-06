"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useLanguageStore, type Language } from "@/store/useLanguageStore";

// Import all translation files
import itMessages from "@/messages/it.json";
import enMessages from "@/messages/en.json";
import csMessages from "@/messages/cs.json";

type Messages = typeof itMessages;

const messages: Record<Language, Messages> = {
  it: itMessages,
  en: enMessages,
  cs: csMessages,
};

interface TranslationsContextType {
  messages: Messages;
  language: Language;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined
);

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage: setStoreLang } = useLanguageStore();
  const [hydrated, setHydrated] = useState(false);
  const [clientLanguage, setClientLanguage] = useState<Language>('it');

  // Handle client-side hydration - read directly from localStorage
  useEffect(() => {
    // Read from localStorage on client side
    try {
      const stored = localStorage.getItem('quickfy-language');

      if (stored) {
        const parsed = JSON.parse(stored);
        const lang = (parsed.state?.language || parsed.language || 'it') as Language;

        // Set both states in a batch
        setClientLanguage(lang);
        setHydrated(true);

        // Also update the store if different
        if (lang !== language) {
          setStoreLang(lang);
        }
      } else {
        setHydrated(true);
      }
    } catch (error) {
      console.error('Error reading localStorage in useEffect:', error);
      setHydrated(true);
    }
  }, []);

  // Use clientLanguage after hydration, italian before
  const currentLanguage = hydrated ? clientLanguage : 'it';
  const currentMessages = messages[currentLanguage] || messages.it;

  // Don't render children until hydrated to avoid showing wrong language
  if (!hydrated) {
    return (
      <TranslationsContext.Provider
        value={{ messages: messages.it, language: 'it' }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </TranslationsContext.Provider>
    );
  }

  return (
    <TranslationsContext.Provider
      value={{ messages: currentMessages, language: currentLanguage }}
    >
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslationsContext() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error(
      "useTranslationsContext must be used within TranslationsProvider"
    );
  }
  return context;
}
