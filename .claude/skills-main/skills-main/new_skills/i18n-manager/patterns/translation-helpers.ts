// Translation helper utilities
import { TFunction } from 'i18next'

/**
 * Type-safe translation keys
 * Generate this from your JSON translation files
 */
export type TranslationKeys =
  | 'common.app.title'
  | 'common.app.description'
  | 'common.navigation.home'
  | 'common.navigation.about'
  | 'auth.login.title'
  | 'auth.login.submit'
  // ... add all your keys here

/**
 * Typed translation function
 */
export function typedT<T extends TranslationKeys>(t: TFunction, key: T, options?: any): string {
  return t(key, options)
}

/**
 * Format date based on current locale
 */
export function formatDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Format number based on current locale
 */
export function formatNumber(
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(number)
}

/**
 * Format currency based on current locale
 */
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date,
  locale: string
): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const now = new Date()
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)

  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ]

  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diffInSeconds) >= secondsInUnit) {
      const value = Math.floor(diffInSeconds / secondsInUnit)
      return rtf.format(value, unit)
    }
  }

  return rtf.format(0, 'second')
}

/**
 * Format list (e.g., "apples, oranges, and bananas")
 */
export function formatList(
  items: string[],
  locale: string,
  type: 'conjunction' | 'disjunction' = 'conjunction'
): string {
  return new Intl.ListFormat(locale, { type }).format(items)
}

/**
 * Pluralization helper
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string,
  locale: string = 'en'
): string {
  const rules = new Intl.PluralRules(locale)
  const rule = rules.select(count)

  return rule === 'one' ? singular : plural
}

/**
 * Get language name in its native script
 */
export function getLanguageNativeName(code: string): string {
  try {
    const displayNames = new Intl.DisplayNames([code], { type: 'language' })
    return displayNames.of(code) || code
  } catch {
    return code
  }
}

/**
 * Detect user's preferred language from browser
 */
export function detectBrowserLanguage(supportedLanguages: string[]): string {
  const browserLanguages = navigator.languages || [navigator.language]

  for (const browserLang of browserLanguages) {
    // Exact match
    if (supportedLanguages.includes(browserLang)) {
      return browserLang
    }

    // Language code match (e.g., "en-US" -> "en")
    const langCode = browserLang.split('-')[0]
    if (supportedLanguages.includes(langCode)) {
      return langCode
    }
  }

  return supportedLanguages[0] // Fallback to first supported language
}

/**
 * Store user language preference
 */
export function storeLanguagePreference(language: string): void {
  localStorage.setItem('preferredLanguage', language)
  document.cookie = `language=${language}; path=/; max-age=31536000` // 1 year
}

/**
 * Load user language preference
 */
export function loadLanguagePreference(): string | null {
  // Try localStorage first
  const stored = localStorage.getItem('preferredLanguage')
  if (stored) return stored

  // Try cookie
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('language='))

  if (cookie) {
    return cookie.split('=')[1]
  }

  return null
}

/**
 * Generate translation key from text (for extraction scripts)
 */
export function generateTranslationKey(text: string, namespace: string = 'common'): string {
  const key = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 50)

  return `${namespace}.${key}`
}

/**
 * Check if translation key exists
 */
export function translationExists(t: TFunction, key: string): boolean {
  const translation = t(key)
  return translation !== key
}

/**
 * Get all missing translation keys for a language
 */
export async function getMissingTranslations(
  baseLanguage: string,
  targetLanguage: string,
  namespaces: string[]
): Promise<string[]> {
  const missing: string[] = []

  for (const ns of namespaces) {
    const baseUrl = `/locales/${baseLanguage}/${ns}.json`
    const targetUrl = `/locales/${targetLanguage}/${ns}.json`

    try {
      const [baseRes, targetRes] = await Promise.all([
        fetch(baseUrl),
        fetch(targetUrl),
      ])

      const baseTranslations = await baseRes.json()
      const targetTranslations = await targetRes.json()

      const baseKeys = getAllKeys(baseTranslations, ns)
      const targetKeys = new Set(getAllKeys(targetTranslations, ns))

      for (const key of baseKeys) {
        if (!targetKeys.has(key)) {
          missing.push(key)
        }
      }
    } catch (error) {
      console.error(`Error checking translations for ${ns}:`, error)
    }
  }

  return missing
}

/**
 * Get all keys from nested translation object
 */
function getAllKeys(obj: Record<string, any>, prefix: string = ''): string[] {
  let keys: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey))
    } else {
      keys.push(fullKey)
    }
  }

  return keys
}

/**
 * Translation coverage report
 */
export interface TranslationCoverage {
  language: string
  totalKeys: number
  translatedKeys: number
  missingKeys: string[]
  coverage: number // percentage
}

export async function getTranslationCoverage(
  baseLanguage: string,
  languages: string[],
  namespaces: string[]
): Promise<TranslationCoverage[]> {
  const results: TranslationCoverage[] = []

  // Get base language keys
  let totalKeys = 0
  for (const ns of namespaces) {
    const url = `/locales/${baseLanguage}/${ns}.json`
    const res = await fetch(url)
    const translations = await res.json()
    totalKeys += getAllKeys(translations).length
  }

  // Check each language
  for (const lang of languages) {
    const missing = await getMissingTranslations(baseLanguage, lang, namespaces)
    const translatedKeys = totalKeys - missing.length
    const coverage = totalKeys > 0 ? (translatedKeys / totalKeys) * 100 : 0

    results.push({
      language: lang,
      totalKeys,
      translatedKeys,
      missingKeys: missing,
      coverage,
    })
  }

  return results
}
