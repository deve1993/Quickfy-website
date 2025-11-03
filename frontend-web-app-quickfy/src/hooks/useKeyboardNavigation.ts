import { useEffect, useRef, useCallback } from "react";

/**
 * Keyboard Navigation Hooks
 *
 * Utilities for implementing keyboard accessibility patterns
 */

export interface KeyboardNavigationOptions {
  /**
   * Callback when Escape key is pressed
   */
  onEscape?: () => void;
  /**
   * Callback when Enter key is pressed
   */
  onEnter?: () => void;
  /**
   * Whether the component is currently active/open
   */
  isActive?: boolean;
}

/**
 * Hook for handling common keyboard interactions
 *
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose }) {
 *   useKeyboardNavigation({
 *     onEscape: onClose,
 *     isActive: isOpen
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useKeyboardNavigation({
  onEscape,
  onEnter,
  isActive = true,
}: KeyboardNavigationOptions) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onEscape) {
        event.preventDefault();
        onEscape();
      }
      if (event.key === "Enter" && onEnter) {
        event.preventDefault();
        onEnter();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, onEnter, isActive]);
}

/**
 * Hook for trapping focus within a component (for modals, dialogs)
 *
 * @example
 * ```tsx
 * function Modal({ children }) {
 *   const modalRef = useFocusTrap(true);
 *
 *   return (
 *     <div ref={modalRef}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusTrap(isActive: boolean = true) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !elementRef.current) return;

    const element = elementRef.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus first element
    firstElement?.focus();

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);

    return () => {
      element.removeEventListener("keydown", handleTabKey);
      // Restore focus to previously focused element
      previouslyFocused?.focus();
    };
  }, [isActive]);

  return elementRef;
}

/**
 * Hook for arrow key navigation in lists
 *
 * @example
 * ```tsx
 * function Menu({ items }) {
 *   const { activeIndex, setActiveIndex } = useArrowNavigation(items.length);
 *
 *   return (
 *     <ul>
 *       {items.map((item, index) => (
 *         <li
 *           key={item.id}
 *           className={index === activeIndex ? 'active' : ''}
 *           onClick={() => setActiveIndex(index)}
 *         >
 *           {item.label}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useArrowNavigation(
  itemCount: number,
  options: {
    initialIndex?: number;
    orientation?: "vertical" | "horizontal";
    loop?: boolean;
    onSelect?: (index: number) => void;
  } = {}
) {
  const {
    initialIndex = 0,
    orientation = "vertical",
    loop = true,
    onSelect,
  } = options;

  const [activeIndex, setActiveIndexState] =
    React.useState<number>(initialIndex);

  const setActiveIndex = useCallback(
    (index: number) => {
      if (index < 0) {
        setActiveIndexState(loop ? itemCount - 1 : 0);
      } else if (index >= itemCount) {
        setActiveIndexState(loop ? 0 : itemCount - 1);
      } else {
        setActiveIndexState(index);
      }
    },
    [itemCount, loop]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const isVertical = orientation === "vertical";
      const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
      const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

      if (event.key === nextKey) {
        event.preventDefault();
        setActiveIndex(activeIndex + 1);
      } else if (event.key === prevKey) {
        event.preventDefault();
        setActiveIndex(activeIndex - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(itemCount - 1);
      } else if (event.key === "Enter" && onSelect) {
        event.preventDefault();
        onSelect(activeIndex);
      }
    },
    [activeIndex, itemCount, orientation, onSelect, setActiveIndex]
  );

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
  };
}

// Add React import for useState
import React from "react";

/**
 * Hook for managing keyboard shortcuts
 *
 * @example
 * ```tsx
 * function App() {
 *   useKeyboardShortcuts({
 *     'ctrl+k': () => console.log('Search'),
 *     'ctrl+/': () => console.log('Toggle sidebar'),
 *     '?': () => console.log('Show help'),
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: Record<string, () => void>,
  isActive: boolean = true
) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Build shortcut string
      let shortcut = "";
      if (ctrl) shortcut += "ctrl+";
      if (shift) shortcut += "shift+";
      if (alt) shortcut += "alt+";
      shortcut += key;

      // Check if shortcut exists and execute
      if (shortcuts[shortcut]) {
        event.preventDefault();
        shortcuts[shortcut]();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts, isActive]);
}

/**
 * Hook for skip links navigation
 *
 * @example
 * ```tsx
 * function Layout() {
 *   const mainRef = useSkipLink("main-content");
 *
 *   return (
 *     <>
 *       <a href="#main-content" className="skip-link">
 *         Skip to main content
 *       </a>
 *       <main ref={mainRef} id="main-content">
 *         {children}
 *       </main>
 *     </>
 *   );
 * }
 * ```
 */
export function useSkipLink(targetId: string) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${targetId}` && ref.current) {
        ref.current.focus();
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [targetId]);

  return ref;
}
