import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Label } from './Label'
import type { LabelProps } from './Label.types'

expect.extend(toHaveNoViolations)

describe('Label', () => {
  const defaultProps: LabelProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Label {...defaultProps} />)
      expect(screen.getByTestId('label')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Label {...defaultProps}>{testContent}</Label>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies required prop correctly', () => {
      const testValue = true
      render(<Label {...defaultProps} required={testValue} />)
      const element = screen.getByTestId('label')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies tooltip prop correctly', () => {
      const testValue = 'Test'
      render(<Label {...defaultProps} tooltip={testValue} />)
      const element = screen.getByTestId('label')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<Label {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('label')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Label {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Label {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('label')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Label {...defaultProps} />)
      const element = screen.getByTestId('label')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Label {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
