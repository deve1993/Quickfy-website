// Form testing utilities and patterns
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'

// ============================================
// Test Utilities
// ============================================

/**
 * Fill out a form field by label text
 */
export async function fillField(labelText: string | RegExp, value: string) {
  const user = userEvent.setup()
  const field = screen.getByLabelText(labelText)
  await user.clear(field)
  await user.type(field, value)
  return field
}

/**
 * Select an option from a dropdown
 */
export async function selectOption(labelText: string | RegExp, optionText: string) {
  const user = userEvent.setup()
  const select = screen.getByLabelText(labelText)
  await user.selectOptions(select, optionText)
  return select
}

/**
 * Check/uncheck a checkbox
 */
export async function toggleCheckbox(labelText: string | RegExp) {
  const user = userEvent.setup()
  const checkbox = screen.getByLabelText(labelText)
  await user.click(checkbox)
  return checkbox
}

/**
 * Submit a form
 */
export async function submitForm(buttonText: string | RegExp = /submit/i) {
  const user = userEvent.setup()
  const submitButton = screen.getByRole('button', { name: buttonText })
  await user.click(submitButton)
  return submitButton
}

/**
 * Wait for validation error to appear
 */
export async function waitForError(errorText: string | RegExp) {
  return await screen.findByText(errorText)
}

// ============================================
// Common Test Patterns
// ============================================

/**
 * Test: Form submission with valid data
 */
export function testFormSubmission(
  FormComponent: React.ComponentType<any>,
  validData: Record<string, any>,
  onSubmit = vi.fn()
) {
  return async () => {
    const user = userEvent.setup()
    render(<FormComponent onSubmit={onSubmit} />)

    // Fill all fields
    for (const [field, value] of Object.entries(validData)) {
      if (typeof value === 'boolean') {
        const checkbox = screen.getByRole('checkbox', { name: new RegExp(field, 'i') })
        if (value) await user.click(checkbox)
      } else {
        await fillField(new RegExp(field, 'i'), String(value))
      }
    }

    // Submit
    await submitForm()

    // Assert submission was called with correct data
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(validData)
    })
  }
}

/**
 * Test: Validation errors for invalid data
 */
export function testValidationErrors(
  FormComponent: React.ComponentType<any>,
  invalidData: Record<string, any>,
  expectedErrors: Record<string, string | RegExp>
) {
  return async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    // Fill with invalid data
    for (const [field, value] of Object.entries(invalidData)) {
      await fillField(new RegExp(field, 'i'), String(value))
    }

    // Submit to trigger validation
    await submitForm()

    // Assert all expected errors are displayed
    for (const errorMessage of Object.values(expectedErrors)) {
      expect(await waitForError(errorMessage)).toBeInTheDocument()
    }
  }
}

/**
 * Test: Required field validation
 */
export function testRequiredFields(
  FormComponent: React.ComponentType<any>,
  requiredFields: string[]
) {
  return async () => {
    render(<FormComponent />)

    // Submit empty form
    await submitForm()

    // Assert error for each required field
    for (const field of requiredFields) {
      const errorRegex = new RegExp(`${field}.*required`, 'i')
      expect(await screen.findByText(errorRegex)).toBeInTheDocument()
    }
  }
}

/**
 * Test: Field-level validation on blur
 */
export function testBlurValidation(
  FormComponent: React.ComponentType<any>,
  fieldLabel: string | RegExp,
  invalidValue: string,
  expectedError: string | RegExp
) {
  return async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const field = screen.getByLabelText(fieldLabel)
    await user.type(field, invalidValue)
    await user.tab() // Trigger blur

    expect(await waitForError(expectedError)).toBeInTheDocument()
  }
}

/**
 * Test: Async validation (e.g., username availability)
 */
export function testAsyncValidation(
  FormComponent: React.ComponentType<any>,
  fieldLabel: string | RegExp,
  value: string,
  mockApiResponse: { available: boolean }
) {
  return async () => {
    const user = userEvent.setup()

    // Mock API call
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiResponse),
      } as Response)
    )

    render(<FormComponent />)

    await fillField(fieldLabel, value)
    await submitForm()

    if (!mockApiResponse.available) {
      expect(await screen.findByText(/already taken/i)).toBeInTheDocument()
    }
  }
}

/**
 * Test: Submit button disabled while submitting
 */
export function testSubmitButtonState(FormComponent: React.ComponentType<any>) {
  return async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<FormComponent onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: /submit/i })

    // Submit form
    await user.click(submitButton)

    // Button should be disabled and show loading text
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/submitting|loading/i)

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  }
}

/**
 * Test: Multi-step form navigation
 */
export function testMultiStepNavigation(
  FormComponent: React.ComponentType<any>,
  steps: Array<{ fields: Record<string, any>; validation?: boolean }>
) {
  return async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      // Fill current step fields
      for (const [field, value] of Object.entries(step.fields)) {
        await fillField(new RegExp(field, 'i'), String(value))
      }

      // Go to next step or submit
      const isLastStep = i === steps.length - 1
      const button = screen.getByRole('button', {
        name: isLastStep ? /complete|submit/i : /next/i,
      })
      await user.click(button)

      // If not last step and validation enabled, check we moved forward
      if (!isLastStep && step.validation !== false) {
        expect(screen.getByText(new RegExp(`step ${i + 2}`, 'i'))).toBeInTheDocument()
      }
    }
  }
}

/**
 * Test: Dynamic field array (add/remove)
 */
export function testDynamicFieldArray(
  FormComponent: React.ComponentType<any>,
  addButtonText: string | RegExp,
  removeButtonText: string | RegExp
) {
  return async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    // Initially should have 1 item
    expect(screen.getAllByText(/member 1/i)).toHaveLength(1)

    // Add a new item
    const addButton = screen.getByRole('button', { name: addButtonText })
    await user.click(addButton)

    // Should now have 2 items
    await waitFor(() => {
      expect(screen.getByText(/member 2/i)).toBeInTheDocument()
    })

    // Remove an item
    const removeButtons = screen.getAllByRole('button', { name: removeButtonText })
    await user.click(removeButtons[0])

    // Should be back to 1 item
    await waitFor(() => {
      expect(screen.queryByText(/member 2/i)).not.toBeInTheDocument()
    })
  }
}

// ============================================
// Accessibility Testing
// ============================================

/**
 * Test: Form has proper labels
 */
export function testFormLabels(
  FormComponent: React.ComponentType<any>,
  expectedLabels: string[]
) {
  return () => {
    render(<FormComponent />)

    for (const label of expectedLabels) {
      expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument()
    }
  }
}

/**
 * Test: Error messages have proper ARIA attributes
 */
export function testErrorAria(
  FormComponent: React.ComponentType<any>,
  fieldLabel: string | RegExp,
  invalidValue: string
) {
  return async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    const field = screen.getByLabelText(fieldLabel)
    await user.type(field, invalidValue)
    await submitForm()

    // Wait for error to appear
    await waitFor(() => {
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(field).toHaveAttribute('aria-describedby')
    })
  }
}

/**
 * Test: Keyboard navigation works
 */
export function testKeyboardNavigation(FormComponent: React.ComponentType<any>) {
  return async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<FormComponent onSubmit={onSubmit} />)

    // Tab through fields
    await user.tab()
    expect(screen.getAllByRole('textbox')[0]).toHaveFocus()

    await user.tab()
    expect(screen.getAllByRole('textbox')[1]).toHaveFocus()

    // Submit with Enter key
    await user.keyboard('{Enter}')

    // Form should attempt to submit
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
    })
  }
}

// ============================================
// Example Test Suite
// ============================================

/*
import { describe, it, expect } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it(
    'submits form with valid data',
    testFormSubmission(
      LoginForm,
      {
        email: 'user@example.com',
        password: 'password123',
        rememberMe: false,
      }
    )
  )

  it(
    'shows validation errors',
    testValidationErrors(
      LoginForm,
      {
        email: 'invalid-email',
        password: '123',
      },
      {
        email: /invalid email/i,
        password: /at least 8 characters/i,
      }
    )
  )

  it('validates required fields', testRequiredFields(LoginForm, ['email', 'password']))

  it('disables submit button while submitting', testSubmitButtonState(LoginForm))

  it('has proper labels', testFormLabels(LoginForm, ['Email', 'Password', 'Remember me']))

  it('supports keyboard navigation', testKeyboardNavigation(LoginForm))
})
*/
