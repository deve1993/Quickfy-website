import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroVideo } from './HeroVideo'
import type { HeroVideoProps } from './HeroVideo.types'

expect.extend(toHaveNoViolations)

describe('HeroVideo', () => {
  const defaultProps: HeroVideoProps = {
    title: 'Test',
    videoSrc: 'Test',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<HeroVideo {...defaultProps} />)
      expect(screen.getByTestId('herovideo')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<HeroVideo {...defaultProps}>{testContent}</HeroVideo>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies title prop correctly', () => {
      const testValue = 'Test'
      render(<HeroVideo {...defaultProps} title={testValue} />)
      const element = screen.getByTestId('herovideo')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies subtitle prop correctly', () => {
      const testValue = 'Test'
      render(<HeroVideo {...defaultProps} subtitle={testValue} />)
      const element = screen.getByTestId('herovideo')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies videoSrc prop correctly', () => {
      const testValue = 'Test'
      render(<HeroVideo {...defaultProps} videoSrc={testValue} />)
      const element = screen.getByTestId('herovideo')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies posterSrc prop correctly', () => {
      const testValue = 'Test'
      render(<HeroVideo {...defaultProps} posterSrc={testValue} />)
      const element = screen.getByTestId('herovideo')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies ctaText prop correctly', () => {
      const testValue = 'Test'
      render(<HeroVideo {...defaultProps} ctaText={testValue} />)
      const element = screen.getByTestId('herovideo')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroVideo {...defaultProps} onCtaClick={handler} />)

      const element = screen.getByTestId('herovideo')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onSecondaryCtaClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroVideo {...defaultProps} onSecondaryCtaClick={handler} />)

      const element = screen.getByTestId('herovideo')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onClick correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<HeroVideo {...defaultProps} onClick={handler} />)

      const element = screen.getByTestId('herovideo')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroVideo {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<HeroVideo {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('herovideo')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<HeroVideo {...defaultProps} />)
      const element = screen.getByTestId('herovideo')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<HeroVideo {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
