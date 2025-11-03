"use client";

import { createContext, useContext, ReactNode } from "react";
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
  const { language } = useLanguageStore();
  const currentMessages = messages[language] || messages.it;

  return (
    <TranslationsContext.Provider
      value={{ messages: currentMessages, language }}
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
