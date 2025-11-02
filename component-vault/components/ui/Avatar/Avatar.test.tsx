import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Avatar } from './Avatar'
import type { AvatarProps } from './Avatar.types'

expect.extend(toHaveNoViolations)

describe('Avatar', () => {
  const defaultProps: AvatarProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Avatar {...defaultProps} />)
      expect(screen.getByTestId('avatar')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Avatar {...defaultProps}>{testContent}</Avatar>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies src prop correctly', () => {
      const testValue = 'Test'
      render(<Avatar {...defaultProps} src={testValue} />)
      const element = screen.getByTestId('avatar')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies alt prop correctly', () => {
      const testValue = 'Test'
      render(<Avatar {...defaultProps} alt={testValue} />)
      const element = screen.getByTestId('avatar')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies name prop correctly', () => {
      const testValue = 'Test'
      render(<Avatar {...defaultProps} name={testValue} />)
      const element = screen.getByTestId('avatar')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies size prop correctly', () => {
      const testValue = undefined
      render(<Avatar {...defaultProps} size={testValue} />)
      const element = screen.getByTestId('avatar')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies status prop correctly', () => {
      const testValue = undefined
      render(<Avatar {...defaultProps} status={testValue} />)
      const element = screen.getByTestId('avatar')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Avatar {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Avatar {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('avatar')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Avatar {...defaultProps} />)
      const element = screen.getByTestId('avatar')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Avatar {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
