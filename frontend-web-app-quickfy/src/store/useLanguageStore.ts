import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'it' | 'en' | 'cs';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'it',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'quickfy-language',
    }
  )
);
