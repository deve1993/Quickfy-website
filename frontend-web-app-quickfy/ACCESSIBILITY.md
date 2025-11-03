# Accessibility Guide (A11y)

**Comprehensive accessibility implementation for Quickfy**

---

## Table of Contents

- [Overview](#overview)
- [Current Accessibility Features](#current-accessibility-features)
- [ARIA Labels Reference](#aria-labels-reference)
- [Keyboard Navigation](#keyboard-navigation)
- [Color Contrast](#color-contrast)
- [Screen Reader Support](#screen-reader-support)
- [Testing Accessibility](#testing-accessibility)
- [Best Practices](#best-practices)
- [Roadmap](#roadmap)

---

## Overview

Quickfy is committed to providing an accessible experience for all users. This document outlines our accessibility implementation following WCAG 2.1 Level AA guidelines.

### Accessibility Standards

We follow:
- **WCAG 2.1 Level AA** (Target compliance)
- **WAI-ARIA 1.2** for semantic markup
- **Section 508** compliance (US federal standards)
- **EN 301 549** (European accessibility requirements)

---

## Current Accessibility Features

### ✅ Implemented

1. **Semantic HTML**
   - Proper heading hierarchy (h1, h2, h3)
   - Semantic landmarks (nav, main, article, etc.)
   - Form labels and fieldsets

2. **ARIA Labels**
   - Navigation elements with aria-label
   - Interactive buttons with descriptive labels
   - Form inputs with aria-describedby
   - Live regions for dynamic content (chatbot)
   - aria-current for active navigation items

3. **Keyboard Navigation**
   - Tab navigation support
   - Focus visible indicators
   - Skip links (pending implementation)
   - Escape key for modals/dialogs

4. **Visual Indicators**
   - Focus rings on interactive elements
   - High contrast mode support
   - Responsive text sizing

### ⏳ In Progress

1. **Full Keyboard Navigation**
   - Arrow key navigation for menus
   - Keyboard shortcuts documentation
   - Focus trap for modals

2. **Color Contrast**
   - Comprehensive contrast audit
   - Dark mode accessibility improvements

3. **Screen Reader Testing**
   - NVDA testing
   - JAWS compatibility
   - VoiceOver optimization

---

## ARIA Labels Reference

### Navigation Components

#### Sidebar ([Sidebar.tsx](src/components/layout/Sidebar.tsx:42-139))

```tsx
// Main sidebar container
<div
  role="complementary"
  aria-label="Navigazione principale"
>
  {/* Logo link */}
  <Link
    href="/dashboard"
    aria-label="Vai alla dashboard - Home Quickfy"
  >
    {/* Content */}
  </Link>

  {/* Navigation */}
  <nav aria-label="Menu di navigazione">
    {navigation.map((item) => (
      <Link
        href={item.href}
        aria-label={item.name}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon aria-hidden="true" />
        {!collapsed && <span>{item.name}</span>}
      </Link>
    ))}
  </nav>

  {/* Collapse toggle */}
  <Button
    aria-label={collapsed ? "Espandi menu laterale" : "Comprimi menu laterale"}
    aria-expanded={!collapsed}
  >
    {/* Icon */}
  </Button>
</div>
```

#### Mobile Sidebar ([MobileSidebar.tsx](src/components/layout/MobileSidebar.tsx:53-114))

```tsx
<SheetContent
  side="left"
  aria-label="Menu di navigazione mobile"
>
  <nav aria-label="Menu di navigazione principale">
    {navigation.map((item) => (
      <button
        aria-label={`Vai a ${item.name}`}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon aria-hidden="true" />
        <span>{item.name}</span>
      </button>
    ))}
  </nav>
</SheetContent>
```

### Chatbot Components

#### Chatbot Button ([ChatbotButton.tsx](src/components/chatbot/ChatbotButton.tsx:23-98))

```tsx
<motion.button
  onClick={toggleOpen}
  aria-label={isOpen ? "Chiudi chatbot" : "Apri chatbot"}
  className="focus:outline-none focus:ring-2 focus:ring-primary"
>
  {/* Icon */}
</motion.button>
```

#### Chatbot Window ([ChatbotWindow.tsx](src/components/chatbot/ChatbotWindow.tsx:199-321))

```tsx
<motion.div
  role="dialog"
  aria-label="Chatbot AI Marketing Assistant"
  aria-modal="false"
>
  <Card>
    {/* Header with clear button */}
    <Button
      onClick={clearHistory}
      aria-label="Cancella cronologia chat"
    >
      <Trash2 aria-hidden="true" />
    </Button>

    {/* Messages log */}
    <ScrollArea
      role="log"
      aria-label="Cronologia messaggi chat"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Messages with article roles */}
      <div
        role="article"
        aria-label={isUser ? "Il tuo messaggio" : "Messaggio dell'assistente AI"}
      >
        {/* Message content */}
      </div>
    </ScrollArea>

    {/* Input form */}
    <form
      role="form"
      aria-label="Modulo invio messaggio"
    >
      <Input
        aria-label="Messaggio da inviare all'assistente AI"
        aria-describedby="chat-hint"
      />
      <Button
        type="submit"
        aria-label="Invia messaggio"
      >
        <Send aria-hidden="true" />
      </Button>
      <p id="chat-hint">Suggerimento...</p>
    </form>
  </Card>
</motion.div>
```

### Form Components

#### General Form Pattern

```tsx
<form>
  <div>
    <label htmlFor="field-id">Field Label</label>
    <input
      id="field-id"
      type="text"
      aria-describedby="field-hint field-error"
      aria-invalid={hasError}
      aria-required="true"
    />
    <p id="field-hint">Help text</p>
    {hasError && <p id="field-error" role="alert">Error message</p>}
  </div>
</form>
```

---

## Keyboard Navigation

### Current Support

| Component | Keys | Action |
|-----------|------|--------|
| Navigation links | Tab, Shift+Tab | Navigate between links |
| Buttons | Enter, Space | Activate button |
| Inputs | Tab | Focus input |
| Chat input | Enter | Send message |
| Modal dialogs | Escape | Close modal |
| Sidebar collapse | Enter, Space | Toggle collapse |

### Planned Enhancements

1. **Arrow Key Navigation**
   - Up/Down arrows in navigation menus
   - Left/Right arrows for tabs

2. **Keyboard Shortcuts**
   - `?` - Show keyboard shortcuts help
   - `/` - Focus search (if applicable)
   - `Esc` - Close panels/modals
   - `Ctrl+/` - Toggle sidebar

3. **Skip Links**
   - "Skip to main content"
   - "Skip to navigation"

---

## Color Contrast

### Current Theme

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|------------|-------|--------|
| Primary text | `hsl(var(--foreground))` | `hsl(var(--background))` | TBD | ⏳ Needs audit |
| Secondary text | `hsl(var(--muted-foreground))` | `hsl(var(--muted))` | TBD | ⏳ Needs audit |
| Primary button | `hsl(var(--primary-foreground))` | `hsl(var(--primary))` | TBD | ⏳ Needs audit |

### Minimum Requirements (WCAG AA)

- **Normal text (< 18pt)**: 4.5:1
- **Large text (≥ 18pt or 14pt bold)**: 3:1
- **UI components & graphics**: 3:1

### Tools for Testing

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse
- [Colorblindly](https://github.com/oftheheadland/Colorblindly) (browser extension)

---

## Screen Reader Support

### Tested With

- ⏳ **NVDA** (Windows) - Testing in progress
- ⏳ **JAWS** (Windows) - Testing in progress
- ⏳ **VoiceOver** (macOS/iOS) - Testing in progress
- ⏳ **TalkBack** (Android) - Testing planned

### Best Practices Implemented

1. **Descriptive Labels**
   - All buttons have clear aria-labels
   - Icons marked with aria-hidden="true"
   - Decorative images excluded from screen reader

2. **Semantic Structure**
   - Proper heading hierarchy
   - Landmark regions (nav, main, complementary)
   - Lists use ul/ol elements

3. **Live Regions**
   - Chat messages use aria-live="polite"
   - Status updates announced automatically
   - Errors use role="alert" for immediate announcement

4. **Form Accessibility**
   - All inputs have associated labels
   - Error messages linked with aria-describedby
   - Required fields marked with aria-required

---

## Testing Accessibility

### Automated Testing

#### Using Lighthouse

```bash
# Run Lighthouse in Chrome DevTools
# Or use CLI:
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

#### Using axe DevTools

1. Install [axe DevTools](https://www.deque.com/axe/devtools/) browser extension
2. Open DevTools → axe tab
3. Click "Scan ALL of my page"
4. Review and fix violations

#### Using WAVE

Visit [WAVE](https://wave.webaim.org/) and enter your URL for automated accessibility evaluation.

### Manual Testing

#### Keyboard-Only Navigation

```
1. Disconnect mouse/trackpad
2. Use Tab key to navigate through all interactive elements
3. Verify all functionality is accessible
4. Check focus indicators are visible
5. Test Escape key closes dialogs/modals
```

#### Screen Reader Testing

**NVDA (Windows - Free)**

```
1. Download NVDA from https://www.nvaccess.org/
2. Start NVDA
3. Navigate site using:
   - H: Next heading
   - L: Next list
   - K: Next link
   - B: Next button
   - F: Next form field
```

**VoiceOver (macOS)**

```
1. Enable: System Preferences → Accessibility → VoiceOver
2. Keyboard shortcut: Cmd + F5
3. Navigate with:
   - VO + Right Arrow: Next element
   - VO + Space: Activate element
   - VO + A: Start reading
```

### Testing Checklist

- [ ] All images have alt text (or aria-hidden for decorative)
- [ ] All form inputs have labels
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Color is not the only visual means of conveying information
- [ ] Text can be resized to 200% without loss of content
- [ ] All functionality available via keyboard
- [ ] Page structure uses proper headings
- [ ] Links and buttons have descriptive text
- [ ] ARIA labels are meaningful

---

## Best Practices

### 1. Writing Meaningful Alt Text

```tsx
// ✅ Good - Descriptive
<img src="/chart.png" alt="Grafico a linee che mostra l'aumento delle sessioni del 15% nell'ultimo mese" />

// ❌ Bad - Too vague
<img src="/chart.png" alt="Grafico" />

// ✅ Good - Decorative image
<img src="/decorative-line.svg" alt="" aria-hidden="true" />
```

### 2. Proper Button Labels

```tsx
// ✅ Good - Clear purpose
<button aria-label="Elimina ticket #1234">
  <TrashIcon aria-hidden="true" />
</button>

// ❌ Bad - Not descriptive
<button>
  <TrashIcon />
</button>
```

### 3. Form Accessibility

```tsx
// ✅ Good - Proper associations
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-hint"
    aria-invalid={hasError}
    aria-required="true"
  />
  <p id="email-hint">Inserisci il tuo indirizzo email</p>
  {hasError && <p id="email-error" role="alert">Formato email non valido</p>}
</div>
```

### 4. Focus Management

```tsx
// ✅ Good - Visible focus indicator
.button:focus {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

// ❌ Bad - Removing focus outline
.button:focus {
  outline: none; /* Never do this! */
}
```

### 5. Live Regions

```tsx
// ✅ Good - Announces updates
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// For urgent updates (errors)
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

---

## Roadmap

### Short Term (Next Sprint)

- [ ] Complete keyboard navigation implementation
- [ ] Add skip links ("Skip to content", "Skip to navigation")
- [ ] Conduct color contrast audit
- [ ] Fix any contrast failures
- [ ] Screen reader testing with NVDA

### Medium Term (Next Month)

- [ ] Implement keyboard shortcuts
- [ ] Add comprehensive focus trap for modals
- [ ] Accessibility documentation for developers
- [ ] Automated accessibility tests in CI/CD
- [ ] User testing with assistive technology users

### Long Term (3 Months)

- [ ] WCAG 2.1 Level AAA compliance (where feasible)
- [ ] Accessibility statement page
- [ ] Regular accessibility audits
- [ ] Accessibility training for team

---

## Resources

### Official Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Pa11y](https://pa11y.org/) - Automated testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Testing

- [NVDA Screen Reader](https://www.nvaccess.org/) (Windows, Free)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Oracle](https://colororacle.org/) - Colorblindness simulator

---

## Contributing

When adding new features or components:

1. **Always include ARIA labels** for interactive elements
2. **Test keyboard navigation** before submitting PR
3. **Run axe DevTools** to catch obvious issues
4. **Write semantic HTML** (use appropriate elements)
5. **Document accessibility features** in component comments

---

**Questions or concerns?** Contact the accessibility team or refer to the [README](./README.md).
