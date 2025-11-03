/**
 * Runtime CSS Injection Utilities
 *
 * Advanced utilities for dynamically injecting and managing CSS at runtime.
 * Provides more granular control over style manipulation beyond basic CSS variables.
 */

/**
 * CSS Injection Manager
 *
 * Manages dynamic style elements in the DOM with proper cleanup and updates
 */
export class CSSInjector {
  private styleElements: Map<string, HTMLStyleElement> = new Map();

  /**
   * Inject CSS into the document
   *
   * @param id - Unique identifier for this style block
   * @param css - CSS string to inject
   * @param position - Where to inject (head or before a specific element)
   */
  inject(
    id: string,
    css: string,
    position: "head" | "body" | HTMLElement = "head"
  ): void {
    // Remove existing style element with this ID
    this.remove(id);

    // Create new style element
    const styleElement = document.createElement("style");
    styleElement.id = `brand-css-${id}`;
    styleElement.setAttribute("data-brand-injected", "true");
    styleElement.textContent = css;

    // Store reference
    this.styleElements.set(id, styleElement);

    // Insert into DOM
    if (position === "head") {
      document.head.appendChild(styleElement);
    } else if (position === "body") {
      document.body.appendChild(styleElement);
    } else {
      position.parentNode?.insertBefore(styleElement, position);
    }
  }

  /**
   * Update existing CSS or inject if not exists
   *
   * @param id - Unique identifier
   * @param css - New CSS content
   */
  update(id: string, css: string): void {
    const existing = this.styleElements.get(id);
    if (existing) {
      existing.textContent = css;
    } else {
      this.inject(id, css);
    }
  }

  /**
   * Remove injected CSS
   *
   * @param id - Unique identifier to remove
   */
  remove(id: string): void {
    const styleElement = this.styleElements.get(id);
    if (styleElement) {
      styleElement.remove();
      this.styleElements.delete(id);
    }
  }

  /**
   * Remove all injected brand CSS
   */
  removeAll(): void {
    this.styleElements.forEach((element) => element.remove());
    this.styleElements.clear();
  }

  /**
   * Check if CSS with ID exists
   *
   * @param id - Unique identifier to check
   * @returns True if exists
   */
  has(id: string): boolean {
    return this.styleElements.has(id);
  }

  /**
   * Get all injected style element IDs
   *
   * @returns Array of IDs
   */
  getIds(): string[] {
    return Array.from(this.styleElements.keys());
  }

  /**
   * Get CSS content by ID
   *
   * @param id - Unique identifier
   * @returns CSS content or undefined
   */
  getCSS(id: string): string | undefined {
    return this.styleElements.get(id)?.textContent || undefined;
  }
}

/**
 * Global CSS injector instance
 */
export const cssInjector = new CSSInjector();

/**
 * Inject CSS rule for a specific selector
 *
 * @param selector - CSS selector
 * @param rules - CSS rules object
 * @returns CSS rule string
 *
 * @example
 * injectRule(".my-class", {
 *   color: "red",
 *   fontSize: "16px"
 * });
 */
export function injectRule(
  selector: string,
  rules: Record<string, string | number>
): string {
  const ruleString = Object.entries(rules)
    .map(([property, value]) => {
      // Convert camelCase to kebab-case
      const kebabProperty = property.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`
      );
      return `  ${kebabProperty}: ${value};`;
    })
    .join("\n");

  return `${selector} {\n${ruleString}\n}`;
}

/**
 * Inject multiple CSS rules
 *
 * @param rules - Map of selector to rules object
 * @returns Complete CSS string
 *
 * @example
 * injectRules({
 *   ".class1": { color: "red" },
 *   ".class2": { fontSize: "16px" }
 * });
 */
export function injectRules(
  rules: Record<string, Record<string, string | number>>
): string {
  return Object.entries(rules)
    .map(([selector, ruleSet]) => injectRule(selector, ruleSet))
    .join("\n\n");
}

/**
 * Inject media query with rules
 *
 * @param query - Media query (e.g., "(min-width: 768px)")
 * @param rules - CSS rules for this media query
 * @returns CSS string
 *
 * @example
 * injectMediaQuery("(min-width: 768px)", {
 *   ".container": { maxWidth: "1200px" }
 * });
 */
export function injectMediaQuery(
  query: string,
  rules: Record<string, Record<string, string | number>>
): string {
  const innerRules = injectRules(rules);
  return `@media ${query} {\n${innerRules}\n}`;
}

/**
 * Inject keyframe animation
 *
 * @param name - Animation name
 * @param frames - Keyframes object
 * @returns CSS keyframe string
 *
 * @example
 * injectKeyframes("fadeIn", {
 *   "0%": { opacity: "0" },
 *   "100%": { opacity: "1" }
 * });
 */
export function injectKeyframes(
  name: string,
  frames: Record<string, Record<string, string | number>>
): string {
  const frameStrings = Object.entries(frames)
    .map(([percentage, rules]) => {
      const ruleStrings = Object.entries(rules)
        .map(([property, value]) => {
          const kebabProperty = property.replace(
            /[A-Z]/g,
            (match) => `-${match.toLowerCase()}`
          );
          return `    ${kebabProperty}: ${value};`;
        })
        .join("\n");
      return `  ${percentage} {\n${ruleStrings}\n  }`;
    })
    .join("\n");

  return `@keyframes ${name} {\n${frameStrings}\n}`;
}

/**
 * Create scoped CSS (only applies to elements within a container)
 *
 * @param scope - Scope selector (e.g., ".brand-preview")
 * @param rules - CSS rules
 * @returns Scoped CSS string
 *
 * @example
 * createScopedCSS(".preview", {
 *   ".button": { background: "blue" }
 * });
 * // Output: .preview .button { background: blue; }
 */
export function createScopedCSS(
  scope: string,
  rules: Record<string, Record<string, string | number>>
): string {
  const scopedRules: Record<string, Record<string, string | number>> = {};

  Object.entries(rules).forEach(([selector, ruleSet]) => {
    const scopedSelector = `${scope} ${selector}`;
    scopedRules[scopedSelector] = ruleSet;
  });

  return injectRules(scopedRules);
}

/**
 * Batch CSS operations to minimize reflows
 *
 * @param operations - Array of CSS injection operations
 */
export function batchInject(
  operations: Array<{
    id: string;
    css: string;
    position?: "head" | "body" | HTMLElement;
  }>
): void {
  // Use requestAnimationFrame to batch DOM operations
  requestAnimationFrame(() => {
    operations.forEach(({ id, css, position }) => {
      cssInjector.inject(id, css, position);
    });
  });
}

/**
 * Inject CSS with automatic cleanup after duration
 *
 * @param id - Unique identifier
 * @param css - CSS content
 * @param duration - Duration in milliseconds
 * @returns Cleanup function
 */
export function injectTemporary(
  id: string,
  css: string,
  duration: number
): () => void {
  cssInjector.inject(id, css);

  const timeout = setTimeout(() => {
    cssInjector.remove(id);
  }, duration);

  // Return cleanup function
  return () => {
    clearTimeout(timeout);
    cssInjector.remove(id);
  };
}

/**
 * Gradually transition between two CSS states
 *
 * @param id - Unique identifier
 * @param fromCSS - Starting CSS
 * @param toCSS - Ending CSS
 * @param duration - Transition duration in milliseconds
 */
export function transitionCSS(
  id: string,
  fromCSS: string,
  toCSS: string,
  duration: number = 300
): Promise<void> {
  return new Promise((resolve) => {
    // Inject initial state
    cssInjector.inject(id, fromCSS);

    // Force reflow
    void document.body.offsetHeight;

    // Inject transition
    requestAnimationFrame(() => {
      cssInjector.update(id, toCSS);

      // Resolve after duration
      setTimeout(() => resolve(), duration);
    });
  });
}

/**
 * Clean up all brand-related injected styles
 */
export function cleanupBrandStyles(): void {
  // Remove all styles injected by cssInjector
  cssInjector.removeAll();

  // Remove all style elements with data-brand-* attributes
  document
    .querySelectorAll('style[data-brand-injected="true"]')
    .forEach((el) => el.remove());

  document
    .querySelectorAll('style[data-brand-font="true"]')
    .forEach((el) => el.remove());

  document
    .querySelectorAll('style[id^="brand-"]')
    .forEach((el) => el.remove());
}

/**
 * Check if running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Safe CSS injection that only runs in browser
 *
 * @param id - Unique identifier
 * @param css - CSS content
 */
export function safeInject(id: string, css: string): void {
  if (isBrowser()) {
    cssInjector.inject(id, css);
  }
}
