// Complete i18next configuration template
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
]

// RTL languages
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur']

// Default namespace
export const DEFAULT_NS = 'common'

// All namespaces
export const NAMESPACES = [
  'common',      // Common UI text
  'auth',        // Authentication
  'dashboard',   // Dashboard
  'errors',      // Error messages
  'validation',  // Form validation
]

i18n
  // Load translations using http backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Fallback language when translation not available
    fallbackLng: 'en',

    // Supported languages
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),

    // Namespace configuration
    ns: NAMESPACES,
    defaultNS: DEFAULT_NS,

    // Debug mode (show missing translations in console)
    debug: process.env.NODE_ENV === 'development',

    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Backend plugin options
    backend: {
      // Path to load translations from
      loadPath: '/locales/{{lng}}/{{ns}}.json',

      // Allow cross-origin requests
      crossDomain: false,

      // Request options
      requestOptions: {
        cache: 'default',
      },
    },

    // Language detection options
    detection: {
      // Order of detection methods
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],

      // Keys to look for
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',

      // Cache user language
      caches: ['localStorage', 'cookie'],

      // Cookie options
      cookieMinutes: 10080, // 7 days
      cookieDomain: undefined,
    },

    // React-specific options
    react: {
      // Use Suspense for async loading
      useSuspense: true,

      // Bind i18n to React events
      bindI18n: 'languageChanged loaded',

      // Bind resources to React events
      bindI18nStore: 'added removed',

      // How to handle translation updates
      transEmptyNodeValue: '',

      // Trans component defaults
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'p'],
    },

    // Missing key handler
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lngs, ns, key, fallbackValue) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation: ${ns}:${key}`)
      }
    },

    // Return objects for namespace
    returnObjects: false,

    // Join keys with separator
    keySeparator: '.',

    // Nesting separator
    nsSeparator: ':',

    // Plural forms
    pluralSeparator: '_',

    // Context separator
    contextSeparator: '_',
  })

// Helper to check if language is RTL
export function isRTL(language: string): boolean {
  return RTL_LANGUAGES.includes(language)
}

// Helper to get language direction
export function getDirection(language: string): 'ltr' | 'rtl' {
  return isRTL(language) ? 'rtl' : 'ltr'
}

// Helper to get language info
export function getLanguageInfo(code: string) {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code)
}

export default i18n
