import { create } from 'zustand';

export type Language = 'it' | 'en' | 'cs';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Get initial language from localStorage synchronously
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'it';
  }

  try {
    const stored = localStorage.getItem('quickfy-language');

    if (stored) {
      const parsed = JSON.parse(stored);
      const lang = parsed.state?.language || parsed.language || 'it';
      return lang as Language;
    }
  } catch (error) {
    console.error('Error loading language from localStorage:', error);
  }

  return 'it';
}

export const useLanguageStore = create<LanguageState>()((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    // Save to localStorage
    localStorage.setItem('quickfy-language', JSON.stringify({
      state: { language },
      version: 0
    }));

    // Update state
    set({ language });
  },
}));
