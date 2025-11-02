// Common ARIA Patterns and Utilities
// Based on WAI-ARIA Authoring Practices Guide (APG)

/**
 * ARIA roles for common UI patterns
 */
export const ARIA_ROLES = {
  // Widget roles
  BUTTON: 'button',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SLIDER: 'slider',
  SWITCH: 'switch',
  TAB: 'tab',
  TABLIST: 'tablist',
  TABPANEL: 'tabpanel',

  // Composite roles
  COMBOBOX: 'combobox',
  LISTBOX: 'listbox',
  MENU: 'menu',
  MENUBAR: 'menubar',
  MENUITEM: 'menuitem',
  TREE: 'tree',
  TREEGRID: 'treegrid',

  // Document structure roles
  ARTICLE: 'article',
  DIALOG: 'dialog',
  ALERT: 'alert',
  ALERTDIALOG: 'alertdialog',
  NAVIGATION: 'navigation',
  SEARCH: 'search',
  REGION: 'region',

  // Landmark roles
  BANNER: 'banner',
  COMPLEMENTARY: 'complementary',
  CONTENTINFO: 'contentinfo',
  MAIN: 'main',

  // Live region roles
  LOG: 'log',
  STATUS: 'status',
  TIMER: 'timer',
} as const

/**
 * ARIA states and properties
 */
export const ARIA_ATTRIBUTES = {
  // Widget attributes
  CHECKED: 'aria-checked',
  DISABLED: 'aria-disabled',
  EXPANDED: 'aria-expanded',
  PRESSED: 'aria-pressed',
  SELECTED: 'aria-selected',

  // Live region attributes
  LIVE: 'aria-live',
  ATOMIC: 'aria-atomic',
  RELEVANT: 'aria-relevant',
  BUSY: 'aria-busy',

  // Relationship attributes
  CONTROLS: 'aria-controls',
  DESCRIBEDBY: 'aria-describedby',
  LABELLEDBY: 'aria-labelledby',
  OWNS: 'aria-owns',

  // Other attributes
  LABEL: 'aria-label',
  HASPOPUP: 'aria-haspopup',
  INVALID: 'aria-invalid',
  REQUIRED: 'aria-required',
  HIDDEN: 'aria-hidden',
  CURRENT: 'aria-current',
} as const

/**
 * Keyboard keys for accessible interactions
 */
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  return Array.from(container.querySelectorAll<HTMLElement>(selector))
}

/**
 * Create a unique ID for ARIA relationships
 */
export function createAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Announce message to screen readers using live region
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute('disabled')) return false
  if (element.getAttribute('tabindex') === '-1') return false

  const focusableSelectors = [
    'a[href]',
    'button',
    'textarea',
    'input',
    'select',
    '[tabindex]',
  ]

  return focusableSelectors.some((selector) => element.matches(selector))
}

/**
 * Get next/previous focusable element (for roving tabindex)
 */
export function getNextFocusable(
  current: HTMLElement,
  container: HTMLElement,
  direction: 'next' | 'prev'
): HTMLElement | null {
  const focusable = getFocusableElements(container)
  const currentIndex = focusable.indexOf(current)

  if (currentIndex === -1) return null

  const nextIndex = direction === 'next'
    ? (currentIndex + 1) % focusable.length
    : (currentIndex - 1 + focusable.length) % focusable.length

  return focusable[nextIndex] || null
}

/**
 * Implement roving tabindex pattern
 * Only one element in group is in tab order (tabindex="0")
 * Others have tabindex="-1"
 */
export function createRovingTabindex(
  container: HTMLElement,
  options: {
    selector: string
    orientation?: 'horizontal' | 'vertical'
    loop?: boolean
  }
): () => void {
  const { selector, orientation = 'horizontal', loop = true } = options
  const items = Array.from(container.querySelectorAll<HTMLElement>(selector))

  if (items.length === 0) return () => {}

  // Set initial tabindexes
  items.forEach((item, index) => {
    item.setAttribute('tabindex', index === 0 ? '0' : '-1')
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    const currentItem = e.target as HTMLElement
    const currentIndex = items.indexOf(currentItem)

    if (currentIndex === -1) return

    let nextIndex = currentIndex

    const isHorizontal = orientation === 'horizontal'
    const nextKey = isHorizontal ? KEYS.ARROW_RIGHT : KEYS.ARROW_DOWN
    const prevKey = isHorizontal ? KEYS.ARROW_LEFT : KEYS.ARROW_UP

    if (e.key === nextKey) {
      nextIndex = currentIndex + 1
      if (nextIndex >= items.length) {
        nextIndex = loop ? 0 : currentIndex
      }
      e.preventDefault()
    } else if (e.key === prevKey) {
      nextIndex = currentIndex - 1
      if (nextIndex < 0) {
        nextIndex = loop ? items.length - 1 : currentIndex
      }
      e.preventDefault()
    } else if (e.key === KEYS.HOME) {
      nextIndex = 0
      e.preventDefault()
    } else if (e.key === KEYS.END) {
      nextIndex = items.length - 1
      e.preventDefault()
    }

    if (nextIndex !== currentIndex) {
      // Update tabindexes
      items[currentIndex].setAttribute('tabindex', '-1')
      items[nextIndex].setAttribute('tabindex', '0')

      // Move focus
      items[nextIndex].focus()
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  // Cleanup
  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Manage focus for menu/listbox pattern
 */
export function createMenuNavigation(
  menu: HTMLElement,
  options: {
    itemSelector: string
    onSelect?: (item: HTMLElement) => void
  }
): () => void {
  const { itemSelector, onSelect } = options
  const items = Array.from(menu.querySelectorAll<HTMLElement>(itemSelector))

  let currentIndex = 0

  const focusItem = (index: number) => {
    items[currentIndex]?.setAttribute('tabindex', '-1')
    currentIndex = index
    items[currentIndex]?.setAttribute('tabindex', '0')
    items[currentIndex]?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KEYS.ARROW_DOWN:
        e.preventDefault()
        focusItem((currentIndex + 1) % items.length)
        break

      case KEYS.ARROW_UP:
        e.preventDefault()
        focusItem((currentIndex - 1 + items.length) % items.length)
        break

      case KEYS.HOME:
        e.preventDefault()
        focusItem(0)
        break

      case KEYS.END:
        e.preventDefault()
        focusItem(items.length - 1)
        break

      case KEYS.ENTER:
      case KEYS.SPACE:
        e.preventDefault()
        if (onSelect) {
          onSelect(items[currentIndex])
        }
        break

      case KEYS.ESCAPE:
        e.preventDefault()
        // Let parent handle close
        break
    }
  }

  menu.addEventListener('keydown', handleKeyDown)

  // Initial setup
  items.forEach((item, index) => {
    item.setAttribute('tabindex', index === 0 ? '0' : '-1')
  })

  // Cleanup
  return () => {
    menu.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Common ARIA patterns as utilities
 */
export const ariaPatterns = {
  /**
   * Disclosure pattern (show/hide content)
   */
  disclosure: {
    buttonProps: (expanded: boolean, controlsId: string) => ({
      'aria-expanded': expanded,
      'aria-controls': controlsId,
    }),
    panelProps: (id: string, labelledBy: string) => ({
      id,
      'aria-labelledby': labelledBy,
      role: 'region',
    }),
  },

  /**
   * Dialog pattern
   */
  dialog: {
    props: (titleId: string, descriptionId?: string) => ({
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': titleId,
      'aria-describedby': descriptionId,
    }),
  },

  /**
   * Alert pattern
   */
  alert: {
    props: (live: 'polite' | 'assertive' = 'polite') => ({
      role: 'alert',
      'aria-live': live,
      'aria-atomic': true,
    }),
  },

  /**
   * Status pattern (for non-critical announcements)
   */
  status: {
    props: () => ({
      role: 'status',
      'aria-live': 'polite' as const,
      'aria-atomic': true,
    }),
  },

  /**
   * Progress bar pattern
   */
  progressBar: {
    props: (value: number, max: number = 100, label?: string) => ({
      role: 'progressbar',
      'aria-valuenow': value,
      'aria-valuemin': 0,
      'aria-valuemax': max,
      'aria-label': label,
    }),
  },

  /**
   * Toggle button pattern
   */
  toggleButton: {
    props: (pressed: boolean, label: string) => ({
      'aria-pressed': pressed,
      'aria-label': label,
    }),
  },
}

/**
 * Validate ARIA usage (development only)
 */
export function validateAria(element: HTMLElement): string[] {
  const warnings: string[] = []

  // Check for redundant roles
  const role = element.getAttribute('role')
  const tagName = element.tagName.toLowerCase()

  if (role === 'button' && tagName === 'button') {
    warnings.push('Redundant role="button" on <button> element')
  }

  if (role === 'navigation' && tagName === 'nav') {
    warnings.push('Redundant role="navigation" on <nav> element')
  }

  // Check for missing accessible name
  const hasAccessibleName =
    element.hasAttribute('aria-label') ||
    element.hasAttribute('aria-labelledby') ||
    element.textContent?.trim()

  if (!hasAccessibleName && (role === 'button' || tagName === 'button')) {
    warnings.push('Button missing accessible name')
  }

  return warnings
}
