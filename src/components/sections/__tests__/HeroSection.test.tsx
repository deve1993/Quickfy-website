import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { HeroSection } from '../HeroSection';
import userEvent from '@testing-library/user-event';

describe('HeroSection', () => {
  it('should render the hero section', () => {
    render(<HeroSection />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render the main headline', () => {
    render(<HeroSection />);

    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent('Test Headline');
  });

  it('should render the subheadline', () => {
    render(<HeroSection />);

    expect(screen.getByText('Test Subheadline')).toBeInTheDocument();
  });

  it('should have a skip link for accessibility', () => {
    render(<HeroSection />);

    const skipLink = screen.getByText(/salta al contenuto principale/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should render the primary CTA button', () => {
    render(<HeroSection />);

    const ctaButton = screen.getByRole('button', { name: /get started/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('should scroll to contact section when CTA is clicked', async () => {
    const user = userEvent.setup();

    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    const mockGetElementById = vi.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView
    });

    vi.stubGlobal('document', {
      ...document,
      getElementById: mockGetElementById
    });

    render(<HeroSection />);

    const ctaButton = screen.getByRole('button', { name: /get started/i });
    await user.click(ctaButton);

    expect(mockGetElementById).toHaveBeenCalledWith('contact');
  });

  it('should render stats metrics', () => {
    render(<HeroSection />);

    // Should have 3 stat cards
    const statCards = screen.getAllByRole('img');
    expect(statCards.length).toBeGreaterThanOrEqual(3);
  });

  it('should have accessible aria labels on stats', () => {
    render(<HeroSection />);

    const statCards = screen.getAllByRole('img');
    statCards.forEach(card => {
      expect(card).toHaveAttribute('aria-label');
    });
  });

  it('should render value proposition indicators', () => {
    render(<HeroSection />);

    expect(screen.getByText(/installazione gratuita/i)).toBeInTheDocument();
    expect(screen.getByText(/supporto 24\/7/i)).toBeInTheDocument();
    expect(screen.getByText(/roi garantito/i)).toBeInTheDocument();
  });

  it('should have proper semantic HTML structure', () => {
    render(<HeroSection />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render with gradient styling classes', () => {
    const { container } = render(<HeroSection />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('hero-section');
    expect(section).toHaveClass('bg-gradient-to-br');
  });

  it('should have aria-label on main section', () => {
    render(<HeroSection />);

    const banner = screen.getByRole('banner');
    expect(banner).toHaveAttribute('aria-label');
  });
});
