import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { BackgroundBeams } from './BackgroundBeams'
import type { BackgroundBeamsProps } from './BackgroundBeams.types'

expect.extend(toHaveNoViolations)

describe('BackgroundBeams', () => {
  const defaultProps: BackgroundBeamsProps = {

  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<BackgroundBeams {...defaultProps} />)
      expect(screen.getByTestId('backgroundbeams')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<BackgroundBeams {...defaultProps}>{testContent}</BackgroundBeams>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<BackgroundBeams {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('backgroundbeams')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies beamCount prop correctly', () => {
      const testValue = 42
      render(<BackgroundBeams {...defaultProps} beamCount={testValue} />)
      const element = screen.getByTestId('backgroundbeams')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onDelay correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<BackgroundBeams {...defaultProps} onDelay={handler} />)

      const element = screen.getByTestId('backgroundbeams')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onDuration correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<BackgroundBeams {...defaultProps} onDuration={handler} />)

      const element = screen.getByTestId('backgroundbeams')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<BackgroundBeams {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<BackgroundBeams {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('backgroundbeams')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<BackgroundBeams {...defaultProps} />)
      const element = screen.getByTestId('backgroundbeams')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<BackgroundBeams {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
