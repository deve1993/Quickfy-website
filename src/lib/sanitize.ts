import DOMPurify from 'dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 * Removes all HTML tags and potentially dangerous content
 *
 * @param input - The string to sanitize
 * @returns Sanitized string safe for storage/display
 *
 * @example
 * ```typescript
 * const userInput = '<script>alert("xss")</script>Hello';
 * const safe = sanitizeInput(userInput);
 * // Returns: "Hello"
 * ```
 */
export function sanitizeInput(input: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization (remove HTML tags)
    return input.replace(/<[^>]*>/g, '').trim();
  }

  // Client-side: use DOMPurify for comprehensive sanitization
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true // Keep text content
  });
}

/**
 * Sanitize HTML content while preserving specific safe tags
 * Use this when you need to allow some HTML formatting
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML with only safe tags
 *
 * @example
 * ```typescript
 * const userHtml = '<p>Hello</p><script>alert("xss")</script>';
 * const safe = sanitizeHtml(userHtml);
 * // Returns: "<p>Hello</p>"
 * ```
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: strip all tags as a safety measure
    return html.replace(/<[^>]*>/g, '').trim();
  }

  // Client-side: allow specific safe HTML tags
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?):)|^\/\//i // Only allow http(s) links
  });
}

/**
 * Sanitize URL to prevent javascript: protocol and XSS
 *
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if unsafe
 *
 * @example
 * ```typescript
 * const userUrl = 'javascript:alert("xss")';
 * const safe = sanitizeUrl(userUrl);
 * // Returns: ""
 *
 * const validUrl = 'https://example.com';
 * const safe2 = sanitizeUrl(validUrl);
 * // Returns: "https://example.com"
 * ```
 */
export function sanitizeUrl(url: string): string {
  if (!url || url.trim() === '') {
    return '';
  }

  const trimmed = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
    'about:'
  ];

  const lowerUrl = trimmed.toLowerCase();
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }

  // Allow only http, https, mailto, and relative URLs
  if (
    lowerUrl.startsWith('http://') ||
    lowerUrl.startsWith('https://') ||
    lowerUrl.startsWith('mailto:') ||
    lowerUrl.startsWith('/') ||
    lowerUrl.startsWith('./') ||
    lowerUrl.startsWith('../')
  ) {
    return trimmed;
  }

  // If no protocol, assume relative URL
  if (!lowerUrl.includes(':')) {
    return trimmed;
  }

  // Default: reject unknown protocols
  return '';
}

/**
 * Sanitize object with multiple string fields
 * Useful for sanitizing form data objects
 *
 * @param obj - Object with string values
 * @returns New object with all string values sanitized
 *
 * @example
 * ```typescript
 * const formData = {
 *   name: '<script>alert()</script>John',
 *   email: 'test@example.com'
 * };
 * const safe = sanitizeObject(formData);
 * // Returns: { name: 'John', email: 'test@example.com' }
 * ```
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key] as string) as T[Extract<keyof T, string>];
    }
  }

  return sanitized;
}
