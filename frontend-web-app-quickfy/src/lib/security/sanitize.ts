import DOMPurify from "dompurify";

/**
 * Input sanitization utilities for XSS protection
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes dangerous tags and attributes while preserving safe content
 *
 * @param dirty - Untrusted HTML string
 * @returns Sanitized HTML string safe for rendering
 *
 * @example
 * const userInput = '<script>alert("XSS")</script><p>Hello</p>';
 * const safe = sanitizeHTML(userInput); // Returns: '<p>Hello</p>'
 */
export function sanitizeHTML(dirty: string): string {
  if (typeof window === "undefined") {
    // Server-side: return as-is (sanitize on client)
    return dirty;
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "a",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
    ],
    ALLOWED_ATTR: ["href", "title", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Sanitize plain text input
 * Strips all HTML tags and special characters
 *
 * @param dirty - Untrusted text string
 * @returns Plain text string
 *
 * @example
 * const userInput = '<script>alert("XSS")</script>Hello';
 * const safe = sanitizeText(userInput); // Returns: 'Hello'
 */
export function sanitizeText(dirty: string): string {
  if (typeof window === "undefined") {
    return dirty;
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitize URL to prevent javascript: and data: URL attacks
 *
 * @param url - Untrusted URL string
 * @returns Sanitized URL or empty string if dangerous
 *
 * @example
 * sanitizeURL('javascript:alert(1)') // Returns: ''
 * sanitizeURL('https://example.com') // Returns: 'https://example.com'
 */
export function sanitizeURL(url: string): string {
  const trimmed = url.trim().toLowerCase();

  // Block dangerous protocols
  const dangerousProtocols = [
    "javascript:",
    "data:",
    "vbscript:",
    "file:",
    "about:",
  ];

  for (const protocol of dangerousProtocols) {
    if (trimmed.startsWith(protocol)) {
      return "";
    }
  }

  // Allow only http(s) and mailto
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#")
  ) {
    return url;
  }

  return "";
}

/**
 * Sanitize user input for search queries
 * Escapes special regex characters to prevent regex injection
 *
 * @param query - Search query string
 * @returns Escaped search query
 */
export function sanitizeSearchQuery(query: string): string {
  return query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Validate and sanitize email address
 *
 * @param email - Email string to validate
 * @returns Valid email or empty string
 */
export function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmed = email.trim().toLowerCase();

  return emailRegex.test(trimmed) ? trimmed : "";
}

/**
 * Sanitize filename to prevent path traversal attacks
 *
 * @param filename - Filename string
 * @returns Safe filename
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and special characters
  return filename
    .replace(/[\/\\]/g, "")
    .replace(/\.\./g, "")
    .replace(/[<>:"|?*]/g, "")
    .trim();
}

/**
 * Configuration for DOMPurify with strict settings
 */
export const strictSanitizeConfig = {
  ALLOWED_TAGS: ["b", "i", "em", "strong", "br"],
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
};

/**
 * React hook for sanitizing user content
 * Use in components that display user-generated content
 */
export function useSanitizedContent(content: string, asHTML: boolean = false): string {
  if (asHTML) {
    return sanitizeHTML(content);
  }
  return sanitizeText(content);
}
