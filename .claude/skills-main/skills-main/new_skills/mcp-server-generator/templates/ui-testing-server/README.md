# UI Testing MCP Server

Complete Model Context Protocol (MCP) server for comprehensive UI component testing. Provides visual regression testing, E2E automation, live preview, performance monitoring, and accessibility auditing.

## 🚀 Features

### 📸 Visual Regression Testing
- Component screenshot capture
- Visual diff comparison
- Baseline management
- Storybook integration
- Multi-viewport support

### 🎭 E2E Testing
- Browser automation (Playwright)
- User interaction simulation
- Form filling and validation
- Navigation and routing
- Async operation handling

### 👁️ Component Preview
- Live development server
- Hot module reload
- Theme switching (light/dark)
- DevTools integration
- Real-time feedback

### ⚡ Performance Monitoring
- Render time measurement
- Component profiling
- Core Web Vitals (LCP, FID, CLS)
- Bundle size analysis
- Memory leak detection

### ♿ Accessibility Testing
- WCAG 2.1 Level AA/AAA compliance
- Keyboard navigation validation
- Screen reader compatibility
- Color contrast checking
- ARIA attribute validation

### 🔧 Utility Tools
- Browser management
- Screenshot/PDF/video capture
- Console error tracking
- Cache management
- Cookie handling

## 📦 Installation

### Automatic Setup (Recommended)
```bash
# Run automated setup script
npm run setup
```

This will:
1. Install dependencies
2. Build TypeScript
3. Configure Claude Code
4. Test server connection
5. Start server

### Manual Setup
```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Configure Claude Code
bash scripts/configure-claude.sh ui-testing-server

# Start server
npm start
```

## ⚙️ Configuration

### Zero Config (Default)
The server works out of the box with sensible defaults. No configuration needed!

### Optional Configuration

Create `.claude/mcp-config.json` to override defaults:

```json
{
  "ui-testing-server": {
    "port": 3000,
    "autoStart": true,
    "browser": {
      "type": "chromium",
      "headless": true,
      "viewport": {
        "width": 1920,
        "height": 1080
      }
    },
    "visual": {
      "enabled": true,
      "threshold": 0.1,
      "baselineDir": "./__visual-baselines__"
    },
    "performance": {
      "enabled": true,
      "budget": {
        "renderTime": 100,
        "bundleSize": "500kb"
      }
    },
    "accessibility": {
      "enabled": true,
      "wcagLevel": "AA",
      "rules": ["color-contrast", "keyboard-nav", "aria"]
    },
    "autoTest": {
      "enabled": false,
      "onSave": ["unit"],
      "threshold": "fast"
    }
  }
}
```

### Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
PORT=3000
NODE_ENV=development
BROWSER_TYPE=chromium
HEADLESS=true
VISUAL_THRESHOLD=0.1
```

## 🛠️ Available Tools

### Visual Regression Tools

#### `visual_screenshot`
Capture screenshot of a component.

```typescript
{
  "componentName": "Button",
  "variant": "primary",
  "viewport": { "width": 1920, "height": 1080 },
  "theme": "light"
}
```

#### `visual_compare`
Compare current screenshot with baseline.

```typescript
{
  "componentName": "Button",
  "current": "./screenshots/Button-current.png",
  "baseline": "./baselines/Button.png",
  "threshold": 0.1
}
```

#### `visual_capture_storybook`
Capture all Storybook stories.

```typescript
{
  "storyId": "button--primary",
  "viewport": { "width": 1920, "height": 1080 }
}
```

#### `visual_update_baseline`
Update baseline image.

```typescript
{
  "componentName": "Button",
  "source": "./screenshots/Button-current.png"
}
```

---

### E2E Testing Tools

#### `e2e_navigate`
Navigate to URL.

```typescript
{
  "url": "http://localhost:3000",
  "waitUntil": "networkidle"
}
```

#### `e2e_click`
Click element.

```typescript
{
  "selector": "button[data-testid='submit']",
  "waitFor": true
}
```

#### `e2e_type`
Type text into input.

```typescript
{
  "selector": "input[name='username']",
  "text": "john_doe",
  "delay": 50
}
```

#### `e2e_select`
Select option from dropdown.

```typescript
{
  "selector": "select[name='role']",
  "value": "admin"
}
```

#### `e2e_wait_for`
Wait for element to appear.

```typescript
{
  "selector": ".loading-spinner",
  "state": "hidden",
  "timeout": 5000
}
```

#### `e2e_evaluate`
Execute JavaScript in page context.

```typescript
{
  "script": "document.querySelector('button').textContent",
  "args": []
}
```

#### `e2e_fill_form`
Fill entire form.

```typescript
{
  "formData": {
    "username": "john_doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

---

### Component Preview Tools

#### `preview_start_server`
Start development preview server.

```typescript
{
  "port": 3001,
  "hotReload": true
}
```

#### `preview_open_component`
Open component in browser.

```typescript
{
  "componentPath": "src/components/Button/Button.tsx",
  "props": { "variant": "primary" }
}
```

#### `preview_hot_reload`
Enable/disable hot reload.

```typescript
{
  "enabled": true
}
```

#### `preview_inject_styles`
Inject custom CSS.

```typescript
{
  "css": ".button { padding: 20px; }"
}
```

#### `preview_toggle_theme`
Switch between themes.

```typescript
{
  "theme": "dark"
}
```

#### `preview_inspect_element`
Open DevTools on element.

```typescript
{
  "selector": "button.primary"
}
```

---

### Performance Tools

#### `perf_measure_render`
Measure component render time.

```typescript
{
  "componentName": "Button",
  "iterations": 10
}
```

#### `perf_profile_component`
Complete performance profile.

```typescript
{
  "componentName": "Button",
  "interactions": ["click", "hover"]
}
```

#### `perf_capture_trace`
Capture performance trace.

```typescript
{
  "duration": 5000,
  "categories": ["devtools.timeline", "v8"]
}
```

#### `perf_analyze_bundle`
Analyze bundle size.

```typescript
{
  "componentPath": "src/components/Button",
  "includeDeeps": true
}
```

#### `perf_check_memory_leaks`
Detect memory leaks.

```typescript
{
  "componentName": "Button",
  "iterations": 100
}
```

#### `perf_get_core_web_vitals`
Get Core Web Vitals metrics.

```typescript
{
  "url": "http://localhost:3000"
}
```

---

### Accessibility Tools

#### `a11y_audit`
Full accessibility audit.

```typescript
{
  "selector": ".button-component",
  "rules": ["color-contrast", "button-name"]
}
```

#### `a11y_check_wcag`
Check WCAG compliance.

```typescript
{
  "level": "AA",
  "selector": "main"
}
```

#### `a11y_check_keyboard_nav`
Test keyboard navigation.

```typescript
{
  "componentName": "Button",
  "keys": ["Tab", "Enter", "Space"]
}
```

#### `a11y_check_screen_reader`
Simulate screen reader.

```typescript
{
  "componentName": "Button",
  "announcements": true
}
```

#### `a11y_check_color_contrast`
Check color contrast ratios.

```typescript
{
  "selector": ".text-element",
  "wcagLevel": "AA"
}
```

#### `a11y_check_aria`
Validate ARIA attributes.

```typescript
{
  "selector": "[role='button']"
}
```

#### `a11y_generate_report`
Generate accessibility report.

```typescript
{
  "format": "html",
  "outputPath": "./a11y-report.html"
}
```

---

### Utility Tools

#### `util_get_browser_info`
Get browser information.

```typescript
{}
```

#### `util_clear_cache`
Clear browser cache.

```typescript
{
  "cacheTypes": ["cookies", "localStorage"]
}
```

#### `util_set_cookies`
Set browser cookies.

```typescript
{
  "cookies": [
    { "name": "auth", "value": "token123", "domain": "localhost" }
  ]
}
```

#### `util_get_console_errors`
Get console errors.

```typescript
{
  "filterLevel": "error"
}
```

#### `util_take_full_screenshot`
Full page screenshot.

```typescript
{
  "url": "http://localhost:3000",
  "outputPath": "./full-page.png"
}
```

#### `util_generate_pdf`
Export page to PDF.

```typescript
{
  "url": "http://localhost:3000",
  "outputPath": "./page.pdf",
  "format": "A4"
}
```

#### `util_record_video`
Record video of interactions.

```typescript
{
  "duration": 10000,
  "outputPath": "./interaction.webm"
}
```

---

## 🎯 Usage Examples

### Visual Regression Testing

```bash
# In Claude Code:
"Screenshot Button component in all variants"

# System automatically:
# 1. Captures screenshots (primary, secondary, outline, ghost)
# 2. Compares with baselines
# 3. Reports differences
```

### E2E Testing

```bash
# In Claude Code:
"Test Button click functionality"

# System automatically:
# 1. Opens browser
# 2. Navigates to component
# 3. Clicks button
# 4. Verifies behavior
# 5. Reports results
```

### Live Preview

```bash
# In Claude Code:
"Preview Button component"

# System automatically:
# 1. Starts preview server
# 2. Opens browser with Button
# 3. Enables hot reload
# 4. Shows real-time changes
```

### Performance Profiling

```bash
# In Claude Code:
"Profile Button component performance"

# System automatically:
# 1. Measures render time
# 2. Captures trace
# 3. Analyzes bundle size
# 4. Reports metrics
```

### Accessibility Audit

```bash
# In Claude Code:
"Audit Button accessibility"

# System automatically:
# 1. Runs WCAG checks
# 2. Tests keyboard navigation
# 3. Validates ARIA
# 4. Checks contrast
# 5. Generates report
```

## 🔄 Workflows

### Development Workflow

```bash
# Start development with live preview
"dev Button"
→ Opens live preview with hot reload
→ Real-time accessibility feedback
→ Performance metrics shown

# Make changes to Button.tsx
→ Hot reload updates preview
→ A11y checks run automatically
→ Performance tracked in real-time
```

### Testing Workflow

```bash
# Quick test
"test Button"
→ Unit tests (Vitest)
→ Visual regression
→ Accessibility audit
→ Quick performance check
→ Report: "✅ All passed"

# Full test suite
"full test Button"
→ Complete CI-style pipeline
→ All test categories
→ Detailed HTML report
```

### Pre-Release Workflow

```bash
# Complete validation before release
"full test Button all variants"
→ All variants tested
→ All themes (light/dark)
→ All sizes (sm/md/lg)
→ All states (default/hover/disabled)
→ Comprehensive report
```

## 🏗️ Server Architecture

```
Server Entry Point (index.ts)
├── Configuration Loader (auto-detect.ts)
│   ├── Detect project type
│   ├── Detect framework (React/Vue/Svelte)
│   ├── Find available ports
│   └── Load user config
├── Tool Registry
│   ├── Visual Tools (6 tools)
│   ├── E2E Tools (7 tools)
│   ├── Preview Tools (6 tools)
│   ├── Performance Tools (6 tools)
│   ├── Accessibility Tools (7 tools)
│   └── Utility Tools (7 tools)
├── Browser Manager
│   ├── Playwright instance
│   ├── Page pool
│   └── Context management
└── Request Handlers
    ├── List tools
    ├── Execute tool
    └── Error handling
```

## 🐛 Troubleshooting

### Server won't start

```bash
# Check Node version (requires 18+)
node --version

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run clean && npm run build

# Check logs
tail -f ~/.claude/logs/ui-testing-server.log
```

### Browser issues

```bash
# Install Playwright browsers
npx playwright install

# Install system dependencies
npx playwright install-deps
```

### Visual regression failures

```bash
# Update baselines
"update visual baseline for Button"

# Adjust threshold in config
{
  "visual": {
    "threshold": 0.2  // More tolerant
  }
}
```

### Performance issues

```bash
# Reduce viewport size
{
  "browser": {
    "viewport": { "width": 1280, "height": 720 }
  }
}

# Enable headless mode
{
  "browser": {
    "headless": true
  }
}
```

## 📚 Documentation

- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [Playwright Documentation](https://playwright.dev)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

Built with:
- [Model Context Protocol SDK](https://github.com/anthropics/mcp)
- [Playwright](https://playwright.dev)
- [Axe-core](https://github.com/dequelabs/axe-core)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [Pixelmatch](https://github.com/mapbox/pixelmatch)

---

**Ready to use!** Run `npm run setup` to get started. 🚀
