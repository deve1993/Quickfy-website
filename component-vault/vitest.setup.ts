import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { toHaveNoViolations } from 'jest-axe';
import React from 'react';

// Extend Vitest's expect with jest-dom matchers
expect.extend(jestDomMatchers);

// Extend Vitest's expect with jest-axe matchers
expect.extend({ toHaveNoViolations });

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, prop) => {
        const Component = React.forwardRef((props: any, ref: any) => {
          const { children, ...rest } = props;
          return React.createElement(prop as string, { ...rest, ref }, children);
        });
        Component.displayName = `motion.${String(prop)}`;
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useMotionValue: (initial: any) => ({
    get: () => initial,
    set: vi.fn(),
    onChange: vi.fn(),
  }),
  useTransform: (value: any) => value,
  useSpring: (value: any) => value,
  useScroll: () => ({
    scrollY: { get: () => 0, onChange: vi.fn() },
    scrollYProgress: { get: () => 0, onChange: vi.fn() },
  }),
  useInView: () => true,
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: React.forwardRef(({ to, children, ...props }: any, ref: any) =>
    React.createElement('a', { href: to, ...props, ref }, children)
  ),
  NavLink: React.forwardRef(({ to, children, ...props }: any, ref: any) =>
    React.createElement('a', { href: to, ...props, ref }, children)
  ),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
  BrowserRouter: ({ children }: any) => children,
  Routes: ({ children }: any) => children,
  Route: ({ children }: any) => children,
}));
