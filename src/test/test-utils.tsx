import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';

// Mock messages for testing
const mockMessages = {
  meta: {
    title: 'QuickFy - Test',
    description: 'Test description',
    locale: 'en'
  },
  navigation: {
    features: 'Features',
    benefits: 'Benefits',
    pricing: 'Pricing',
    contact: 'Contact'
  },
  hero: {
    headline: 'Test Headline',
    subheadline: 'Test Subheadline',
    cta: {
      primary: 'Get Started',
      secondary: 'Learn More'
    }
  },
  contact: {
    title: 'Contact Us',
    form: {
      fields: {
        name: {
          label: 'Name',
          placeholder: 'Enter your name'
        },
        email: {
          label: 'Email',
          placeholder: 'your@email.com'
        },
        message: {
          label: 'Message',
          placeholder: 'Your message'
        }
      },
      submit: 'Send Message',
      submitting: 'Sending...',
      validation: {
        name: 'Name is required',
        email: 'Valid email is required',
        message: 'Message is required'
      },
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.'
    }
  }
};

interface AllTheProvidersProps {
  children: ReactNode;
  locale?: string;
  messages?: AbstractIntlMessages;
}

function AllTheProviders({
  children,
  locale = 'en',
  messages = mockMessages
}: AllTheProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  messages?: AbstractIntlMessages;
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { locale, messages, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders locale={locale} messages={messages}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions
  });
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, mockMessages };
