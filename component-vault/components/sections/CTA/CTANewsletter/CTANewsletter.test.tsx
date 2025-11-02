import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CTANewsletter } from './CTANewsletter'
import type { CTANewsletterProps } from './CTANewsletter.types'

expect.extend(toHaveNoViolations)

describe('CTANewsletter', () => {
  const defaultProps: CTANewsletterProps = {
    title: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<CTANewsletter {...defaultProps} />)
      expect(screen.getByTestId('ctanewsletter')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<CTANewsletter {...defaultProps}>{testContent}</CTANewsletter>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<CTANewsletter {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('ctanewsletter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<CTANewsletter {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('ctanewsletter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies placeholder prop correctly', () => {
      const testValue = 'Test'
      render(<CTANewsletter {...defaultProps} placeholder={testValue} />)
      const element = screen.getByTestId('ctanewsletter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies buttonText prop correctly', () => {
      const testValue = 'Test'
      render(<CTANewsletter {...defaultProps} buttonText={testValue} />)
      const element = screen.getByTestId('ctanewsletter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<CTANewsletter {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('ctanewsletter')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onText correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CTANewsletter {...defaultProps} onText={handler} />)

      const element = screen.getByTestId('ctanewsletter')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onSubmit correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CTANewsletter {...defaultProps} onSubmit={handler} />)

      const element = screen.getByTestId('ctanewsletter')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onChange correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<CTANewsletter {...defaultProps} onChange={handler} />)

      const element = screen.getByTestId('ctanewsletter')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<CTANewsletter {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<CTANewsletter {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('ctanewsletter')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<CTANewsletter {...defaultProps} />)
      const element = screen.getByTestId('ctanewsletter')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<CTANewsletter {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
