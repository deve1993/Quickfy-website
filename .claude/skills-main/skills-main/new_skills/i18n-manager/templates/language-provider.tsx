// Language Provider with RTL support
import { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n, { isRTL, getDirection } from './i18n-config'

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Update document direction when language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      // Set HTML dir attribute
      document.documentElement.dir = getDirection(lng)

      // Set HTML lang attribute
      document.documentElement.lang = lng

      // Update meta tags for SEO
      let metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('lang', lng)
      }
    }

    // Initial setup
    handleLanguageChange(i18n.language)

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

// Language Switcher Component
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from './i18n-config'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng)

    // Optional: Update URL
    const url = new URL(window.location.href)
    url.searchParams.set('lng', lng)
    window.history.pushState({}, '', url)

    // Optional: Reload to apply RTL styles properly
    // window.location.reload()
  }

  return (
    <div className="language-switcher">
      <label htmlFor="language-select" className="sr-only">
        Select Language
      </label>

      <select
        id="language-select"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.nativeName}
          </option>
        ))}
      </select>

      <span className="current-language">
        {SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language)?.flag}
      </span>
    </div>
  )
}

// Language Switcher Dropdown
export function LanguageDropdown() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language)

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng)
    setIsOpen(false)
  }

  return (
    <div className="language-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="language-dropdown__trigger"
      >
        <span className="language-dropdown__flag">{currentLanguage?.flag}</span>
        <span className="language-dropdown__name">{currentLanguage?.nativeName}</span>
        <span className="language-dropdown__icon" aria-hidden="true">
          ▼
        </span>
      </button>

      {isOpen && (
        <ul role="listbox" className="language-dropdown__menu">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={i18n.language === lang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                className={`language-dropdown__item ${
                  i18n.language === lang.code ? 'active' : ''
                }`}
              >
                <span className="language-dropdown__item-flag">{lang.flag}</span>
                <div className="language-dropdown__item-text">
                  <div className="language-dropdown__item-native">{lang.nativeName}</div>
                  <div className="language-dropdown__item-name">{lang.name}</div>
                </div>
                {i18n.language === lang.code && (
                  <span className="language-dropdown__check" aria-label="selected">
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Usage Example
/*
// index.tsx or App.tsx
import { LanguageProvider } from './i18n/LanguageProvider'
import './i18n/i18n-config' // Initialize i18n

function App() {
  return (
    <LanguageProvider>
      <YourApp />
      <LanguageSwitcher />
    </LanguageProvider>
  )
}
*/
