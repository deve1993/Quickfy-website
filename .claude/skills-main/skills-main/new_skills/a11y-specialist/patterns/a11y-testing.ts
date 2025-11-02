// Accessibility Testing Utilities
import { render, RenderResult } from '@testing-library/react'
import { axe, toHaveNoViolations, AxeResults } from 'jest-axe'
import { ReactElement } from 'react'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

/**
 * Test component for accessibility violations
 */
export async function testA11y(
  component: ReactElement,
  options?: {
    rules?: Record<string, { enabled: boolean }>
  }
): Promise<AxeResults> {
  const { container } = render(component)
  const results = await axe(container, options)

  expect(results).toHaveNoViolations()

  return results
}

/**
 * Test keyboard navigation
 */
export async function testKeyboardNavigation(
  component: ReactElement,
  interactions: {
    keys: string[]
    expectedFocus: (result: RenderResult) => HTMLElement
  }[]
): Promise<void> {
  const result = render(component)
  const user = userEvent.setup()

  for (const { keys, expectedFocus } of interactions) {
    for (const key of keys) {
      await user.keyboard(key)
    }

    const expected = expectedFocus(result)
    expect(document.activeElement).toBe(expected)
  }
}

/**
 * Test screen reader announcements
 */
export function testScreenReaderAnnouncement(
  container: HTMLElement,
  expectedText: string | RegExp
): void {
  const liveRegion = container.querySelector('[aria-live]')
  expect(liveRegion).toBeInTheDocument()

  if (typeof expectedText === 'string') {
    expect(liveRegion).toHaveTextContent(expectedText)
  } else {
    expect(liveRegion?.textContent).toMatch(expectedText)
  }
}

/**
 * Test focus trap
 */
export async function testFocusTrap(
  container: HTMLElement,
  firstFocusable: HTMLElement,
  lastFocusable: HTMLElement
): Promise<void> {
  const user = userEvent.setup()

  // Focus should trap at the end
  lastFocusable.focus()
  await user.tab()
  expect(document.activeElement).toBe(firstFocusable)

  // Focus should trap at the beginning
  firstFocusable.focus()
  await user.tab({ shift: true })
  expect(document.activeElement).toBe(lastFocusable)
}

/**
 * Common accessibility test suite
 */
export function createA11yTestSuite(
  Component: ReactElement,
  options?: {
    skipAxe?: boolean
    skipKeyboard?: boolean
    customTests?: () => void
  }
) {
  const { skipAxe = false, skipKeyboard = false, customTests } = options || {}

  describe('Accessibility', () => {
    if (!skipAxe) {
      it('should not have accessibility violations', async () => {
        await testA11y(Component)
      })
    }

    if (!skipKeyboard) {
      it('should be keyboard accessible', () => {
        const { getByRole } = render(Component)
        const button = getByRole('button')

        button.focus()
        expect(document.activeElement).toBe(button)
      })
    }

    it('should have proper ARIA attributes', () => {
      const { container } = render(Component)
      const interactiveElements = container.querySelectorAll(
        'button, a, input, select, textarea'
      )

      interactiveElements.forEach((element) => {
        // Should have accessible name
        const hasAccessibleName =
          element.hasAttribute('aria-label') ||
          element.hasAttribute('aria-labelledby') ||
          element.textContent?.trim()

        expect(hasAccessibleName).toBeTruthy()
      })
    })

    it('should have visible focus indicators', () => {
      const { container } = render(Component)
      const style = window.getComputedStyle(container.querySelector(':focus') || document.body)

      // Should have some kind of focus styling
      const hasOutline = style.outline !== 'none'
      const hasBoxShadow = style.boxShadow !== 'none'

      expect(hasOutline || hasBoxShadow).toBeTruthy()
    })

    if (customTests) {
      customTests()
    }
  })
}

/**
 * Test color contrast (requires specific testing library)
 */
export async function testColorContrast(element: HTMLElement): Promise<void> {
  const results = await axe(element, {
    rules: {
      'color-contrast': { enabled: true },
    },
  })

  expect(results).toHaveNoViolations()
}

/**
 * Test ARIA label presence
 */
export function testAriaLabel(
  element: HTMLElement,
  expectedLabel: string | RegExp
): void {
  const label =
    element.getAttribute('aria-label') ||
    element.getAttribute('aria-labelledby')

  expect(label).toBeTruthy()

  if (typeof expectedLabel === 'string') {
    expect(label).toBe(expectedLabel)
  } else {
    expect(label).toMatch(expectedLabel)
  }
}

/**
 * Test heading hierarchy
 */
export function testHeadingHierarchy(container: HTMLElement): void {
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))

  const levels = headings.map((h) => parseInt(h.tagName.substring(1)))

  // Check that headings don't skip levels
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1]
    expect(diff).toBeLessThanOrEqual(1)
  }

  // Should have only one h1
  const h1Count = levels.filter((l) => l === 1).length
  expect(h1Count).toBeLessThanOrEqual(1)
}

/**
 * Test landmark regions
 */
export function testLandmarks(container: HTMLElement): void {
  const landmarks = [
    { selector: 'header, [role="banner"]', name: 'banner' },
    { selector: 'nav, [role="navigation"]', name: 'navigation' },
    { selector: 'main, [role="main"]', name: 'main' },
    { selector: 'footer, [role="contentinfo"]', name: 'contentinfo' },
  ]

  landmarks.forEach(({ selector, name }) => {
    const elements = container.querySelectorAll(selector)

    if (elements.length > 0) {
      // Landmark exists, ensure it has proper labeling if multiple
      if (elements.length > 1) {
        elements.forEach((el) => {
          const hasLabel =
            el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby')
          expect(hasLabel).toBeTruthy()
        })
      }
    }
  })
}

/**
 * Test button accessible name
 */
export function testButtonName(button: HTMLElement, expectedName?: string): void {
  const accessibleName =
    button.getAttribute('aria-label') ||
    button.textContent?.trim() ||
    button.getAttribute('title')

  expect(accessibleName).toBeTruthy()

  if (expectedName) {
    expect(accessibleName).toBe(expectedName)
  }
}

/**
 * Test image alt text
 */
export function testImageAlt(img: HTMLImageElement, expectedAlt?: string): void {
  const alt = img.getAttribute('alt')

  // Decorative images should have empty alt
  if (img.hasAttribute('role') && img.getAttribute('role') === 'presentation') {
    expect(alt).toBe('')
    return
  }

  // Content images should have descriptive alt
  expect(alt).toBeTruthy()

  if (expectedAlt) {
    expect(alt).toBe(expectedAlt)
  }
}

/**
 * Test form field labels
 */
export function testFormFieldLabel(
  input: HTMLInputElement,
  expectedLabel?: string
): void {
  const id = input.getAttribute('id')
  expect(id).toBeTruthy()

  const label =
    document.querySelector(`label[for="${id}"]`) ||
    input.closest('label')

  expect(label).toBeInTheDocument()

  if (expectedLabel) {
    expect(label).toHaveTextContent(expectedLabel)
  }
}

/**
 * Test required field indication
 */
export function testRequiredField(input: HTMLInputElement): void {
  const isRequired =
    input.hasAttribute('required') ||
    input.getAttribute('aria-required') === 'true'

  expect(isRequired).toBeTruthy()

  // Should have visual indicator (usually *)
  const label = document.querySelector(`label[for="${input.id}"]`)
  expect(label?.textContent).toMatch(/\*/)
}

/**
 * Test error message association
 */
export function testErrorMessage(
  input: HTMLInputElement,
  errorMessage: HTMLElement
): void {
  const errorId = errorMessage.getAttribute('id')
  expect(errorId).toBeTruthy()

  const describedBy = input.getAttribute('aria-describedby')
  expect(describedBy).toContain(errorId!)

  expect(input.getAttribute('aria-invalid')).toBe('true')
}

/**
 * Example test suite usage
 */

/*
// Button.test.tsx
import { render } from '@testing-library/react'
import { Button } from './Button'
import { createA11yTestSuite, testA11y } from '@/test-utils/a11y-testing'

describe('Button', () => {
  createA11yTestSuite(<Button>Click me</Button>, {
    customTests: () => {
      it('should announce loading state', () => {
        const { container, rerender } = render(<Button loading>Save</Button>)

        const status = container.querySelector('[role="status"]')
        expect(status).toHaveTextContent(/loading/i)
      })
    },
  })

  it('icon-only button should have aria-label', async () => {
    await testA11y(
      <Button aria-label="Close">
        <XIcon />
      </Button>
    )
  })
})

// Form.test.tsx
import { testFormFieldLabel, testRequiredField, testErrorMessage } from '@/test-utils/a11y-testing'

describe('Form', () => {
  it('should have proper field labels', () => {
    const { getByLabelText } = render(<LoginForm />)
    const emailInput = getByLabelText(/email/i) as HTMLInputElement

    testFormFieldLabel(emailInput, 'Email Address')
    testRequiredField(emailInput)
  })

  it('should associate error messages', () => {
    const { getByLabelText, getByRole } = render(<LoginForm />)
    const emailInput = getByLabelText(/email/i) as HTMLInputElement
    const errorMessage = getByRole('alert')

    testErrorMessage(emailInput, errorMessage)
  })
})
*/
