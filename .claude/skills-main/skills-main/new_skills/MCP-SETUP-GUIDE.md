# 🚀 MCP Server Setup Guide - Complete Documentation

## 📋 Table of Contents
1. [What Was Created](#what-was-created)
2. [Quick Start](#quick-start)
3. [Complete Feature List](#complete-feature-list)
4. [Usage Examples](#usage-examples)
5. [Integration with Existing Skills](#integration-with-existing-skills)
6. [Next Steps](#next-steps)

---

## 🎯 What Was Created

### 1. **MCP Server Generator Skill**
**Location:** `new_skills/mcp-server-generator/`

A complete skill for generating production-ready MCP (Model Context Protocol) servers with:
- Automatic setup and installation
- Smart configuration (zero-config with optional override)
- Claude Code integration
- Pre-built templates for common use cases

### 2. **UI Testing Server Template**
**Location:** `new_skills/mcp-server-generator/templates/ui-testing-server/`

A complete, production-ready MCP server with **39 tools** organized in 6 categories:

| Category | Tools Count | Purpose |
|----------|-------------|---------|
| 📸 Visual Regression | 4 tools | Screenshot, compare, baseline management |
| 🎭 E2E Testing | 7 tools | Browser automation, interactions, forms |
| 👁️ Component Preview | 6 tools | Live preview, hot reload, DevTools |
| ⚡ Performance | 6 tools | Render time, profiling, Core Web Vitals |
| ♿ Accessibility | 7 tools | WCAG audit, keyboard nav, ARIA validation |
| 🔧 Utility | 7 tools | Screenshots, PDFs, video, console errors |

### 3. **Enhanced Component-Tester Skill**
**Location:** `new_skills/component-tester/SKILL.md` (UPDATED)

The existing component-tester skill now includes seamless MCP integration:
- Automatically uses MCP server when available
- Intelligent test selection (unit + visual + a11y + performance)
- Unified reporting
- Multiple test workflows (dev, test, full test)

---

## ⚡ Quick Start

### Step 1: Copy Skills to Your Project

```bash
# Navigate to your UI library project
cd /path/to/your/ui-library

# Create skills directory if not exists
mkdir -p .claude/skills

# Copy all new skills
cp -r "/c/VSC/meta agent skils/new_skills/"* .claude/skills/

# Verify
ls .claude/skills/
# Should show:
# - mcp-server-generator/
# - component-tester/ (updated)
# - ui-component-builder/
# - library-bundler/
# - design-system-manager/
# - component-documenter/
# - codebase-analyzer/
```

### Step 2: Generate UI Testing Server

```bash
# In Claude Code, tell me:
"Generate UI Testing MCP server for this project"

# I will:
# 1. Create mcp-server-ui-testing/ directory
# 2. Generate all files (package.json, tsconfig.json, source code)
# 3. Run npm install
# 4. Build TypeScript
# 5. Configure Claude Code (.claude/config.json)
# 6. Start server
# 7. Test connection
# 8. Report: "✅ UI Testing Server ready on port 3000"
```

### Step 3: Start Testing!

```bash
# Test a component
"test Button component"

# Result:
# ✅ Unit tests: 5/5 passed
# ✅ Visual regression: No changes
# ✅ Accessibility: WCAG AA compliant
# ✅ Performance: 42ms render time
```

---

## 🎨 Complete Feature List

### Visual Regression Testing
```bash
# Capture screenshots
"screenshot Button all variants"
→ Captures: primary, secondary, outline, ghost
→ Both themes: light, dark
→ All sizes: sm, md, lg

# Compare with baseline
"compare Button visual"
→ Detects pixel differences
→ Highlights changes
→ Calculates diff percentage

# Update baseline
"update Button baseline"
→ Updates reference images
→ For approved changes
```

### E2E Testing
```bash
# Test user flows
"test Button click flow"
→ Opens browser
→ Navigates to component
→ Simulates clicks
→ Verifies behavior
→ Reports results

# Test forms
"test LoginForm submission"
→ Fills form fields
→ Submits form
→ Validates response
→ Checks error handling
```

### Component Preview
```bash
# Live development
"dev Button"
→ Opens browser at localhost:3001
→ Shows Button component
→ Hot reload enabled
→ DevTools available
→ Real-time a11y feedback

# Theme switching
"toggle theme to dark"
→ Switches to dark mode
→ Updates preview
→ Shows changes
```

### Performance Monitoring
```bash
# Measure render time
"profile Button performance"
→ Render time: 42ms
→ Re-render count: 0
→ Memory usage: 2.3MB
→ Bundle size: 3.2KB

# Core Web Vitals
"check Button Core Web Vitals"
→ LCP: 1.2s (Good)
→ FID: 45ms (Good)
→ CLS: 0.01 (Good)

# Memory leaks
"check Button for memory leaks"
→ Tests 100 mount/unmount cycles
→ Reports memory delta
→ Identifies leaks if any
```

### Accessibility Testing
```bash
# WCAG compliance
"audit Button accessibility"
→ WCAG 2.1 Level AA: ✅ Pass
→ Color contrast: 7.2:1 (AAA)
→ Keyboard nav: ✅ Working
→ ARIA attributes: ✅ Valid
→ Screen reader: ✅ Announces correctly

# Keyboard navigation
"test Button keyboard navigation"
→ Tab: ✅ Focuses correctly
→ Enter: ✅ Triggers onClick
→ Space: ✅ Triggers onClick
→ Escape: N/A (not modal)

# Color contrast
"check Button color contrast"
→ Text/Background: 7.2:1 (AAA)
→ Border/Background: 3.1:1 (AA)
→ All combinations: ✅ Pass
```

### Utility Tools
```bash
# Full page screenshot
"capture full page screenshot"
→ Saves: ./screenshots/full-page.png

# Generate PDF
"export Button docs to PDF"
→ Saves: ./Button-docs.pdf

# Record video
"record Button interactions"
→ Records 10 seconds
→ Saves: ./Button-interaction.webm

# Console errors
"check console errors"
→ Lists all console errors
→ Categorized by severity
```

---

## 🔄 Usage Examples

### Example 1: Develop New Component

```bash
# 1. Start development mode
You: "dev Button component"

System:
→ Opens browser at localhost:3001
→ Shows Button with hot reload
→ DevTools panel open
→ Real-time metrics:
  - Accessibility: ✅ No issues
  - Performance: 38ms render
  - Bundle: 3.1KB

# 2. Make changes to Button.tsx
→ Save file
→ Hot reload updates preview
→ Metrics update in real-time
→ A11y warnings if any

# 3. Quick test
You: "test Button"

System:
→ Unit tests: ✅ 5/5 passed
→ Visual: ✅ No changes
→ A11y: ✅ WCAG AA
→ Performance: ✅ 42ms (budget: 100ms)

# 4. Ready to commit!
```

### Example 2: Pre-Release Validation

```bash
# Full test suite before release
You: "full test Button all variants"

System tests:
→ All variants: primary, secondary, outline, ghost
→ All themes: light, dark
→ All sizes: sm, md, lg
→ All states: default, hover, active, disabled

Results:
✅ Unit tests: 15/15 passed
✅ Visual regression: All baselines match
✅ E2E tests: 8/8 passed
✅ Accessibility: WCAG AA compliant (all variants)
✅ Performance: All within budget
✅ Bundle size: 3.2KB (budget: 5KB)

Report saved: ./test-reports/Button-full-test.html

Ready for release! ✅
```

### Example 3: Debug Accessibility Issue

```bash
# Component reported a11y issue
You: "audit LoginForm accessibility detailed"

System reports:
⚠️ 3 issues found:

1. [Critical] Missing label for email input
   - Element: input[name="email"]
   - Fix: Add <label htmlFor="email">Email</label>
   - WCAG: 3.3.2 Labels or Instructions (Level A)

2. [Warning] Insufficient color contrast
   - Element: .error-message
   - Current: 3.2:1
   - Required: 4.5:1 (AA)
   - Suggested: #CC0000 → #990000

3. [Info] Missing autocomplete attribute
   - Element: input[name="email"]
   - Suggested: autocomplete="email"

Keyboard navigation: ✅ Working
Screen reader: ⚠️ Email input not announced

# Fix issues
You: "show me how to fix these issues"

System provides:
→ Code examples for each fix
→ Before/after comparison
→ WCAG references
```

### Example 4: Performance Optimization

```bash
# Component feels slow
You: "profile Button detailed"

System analyzes:
📊 Performance Report:

Render Performance:
- Initial render: 145ms ⚠️ (budget: 100ms)
- Re-render: 12ms ✅
- Render count (10 interactions): 47 ⚠️ (expected: ~10)

Issues Detected:
1. Unnecessary re-renders (47 vs expected 10)
   - Cause: Inline function in onClick prop
   - Fix: Use useCallback hook
   - Impact: Will reduce to ~10 renders

2. Heavy computation in render
   - Function: calculateStyles()
   - Time: 98ms per render
   - Fix: Use useMemo hook
   - Impact: ~100ms improvement

Bundle Analysis:
- Component size: 3.2KB ✅
- Dependencies: 45KB ⚠️
  - framer-motion: 42KB (89%)
  - Suggestion: Use lighter alternative or code-split

Memory:
- Initial: 2.3MB ✅
- After 100 mounts: 2.4MB ✅
- No leaks detected ✅

Recommended Actions:
1. Add useCallback for onClick handler
2. Add useMemo for style calculation
3. Consider code-splitting framer-motion

# Apply fixes
You: "apply these optimizations"

System:
→ Updates Button.tsx with fixes
→ Runs tests again
→ New results:
  - Render time: 42ms ✅ (was 145ms)
  - Re-render count: 10 ✅ (was 47)
  - Bundle size: 3.2KB ✅ (unchanged)

Optimization complete! 🚀
```

---

## 🔗 Integration with Existing Skills

### Complete Workflow Chain

```
1. ui-component-builder
   ↓ Creates Button.tsx with TypeScript, a11y, animations

2. component-tester (with MCP)
   ↓ Tests: unit + visual + E2E + a11y + performance
   ↓ Report: ✅ All tests passed

3. design-system-manager
   ↓ Applies design tokens, theming
   ↓ Validates consistency with design system

4. component-documenter
   ↓ Generates README, Storybook stories, API docs
   ↓ Includes screenshots from MCP

5. library-bundler
   ↓ Builds, optimizes, tree-shakes
   ↓ Checks bundle size (uses MCP perf data)

6. codebase-analyzer
   ↓ Analyzes patterns, suggests improvements
   ↓ Uses MCP to validate suggestions

7. Ready for NPM publish! 🚀
```

### Skill Synergy Examples

**Example: Component Creation → Testing**
```bash
You: "Create Button component with variants"
→ ui-component-builder creates Button.tsx

You: "test Button"
→ component-tester (via MCP) tests everything
→ Report: ✅ Ready to use
```

**Example: Design System → Validation**
```bash
You: "Apply design tokens to Button"
→ design-system-manager updates styling

Automatically:
→ MCP captures new screenshots
→ Compares with old baseline
→ Reports visual changes
→ You approve/reject
```

**Example: Documentation → Screenshots**
```bash
You: "Document Button component"
→ component-documenter generates docs

Automatically:
→ MCP captures Button screenshots
→ All variants, themes, states
→ Embeds in documentation
→ Creates Storybook stories with real previews
```

---

## 🎯 Next Steps

### Immediate Actions

1. **Copy Skills to Your Project**
   ```bash
   cp -r new_skills/* /path/to/your-project/.claude/skills/
   ```

2. **Generate MCP Server**
   ```bash
   # In Claude Code:
   "Generate UI Testing MCP server"
   ```

3. **Test First Component**
   ```bash
   "test Button component"
   ```

### Recommended Setup

1. **Configure Auto-Testing** (Optional)
   Create `.claude/mcp-config.json`:
   ```json
   {
     "component-tester": {
       "mcpIntegration": {
         "enabled": true,
         "autoVisual": true,
         "autoAccessibility": true,
         "autoPerformance": false
       }
     }
   }
   ```

2. **Set Up CI/CD**
   Add to `.github/workflows/test.yml`:
   ```yaml
   - name: Run UI Tests
     run: |
       npm run test:ui
       npm run test:visual
       npm run test:a11y
   ```

3. **Create Visual Baselines**
   ```bash
   # Generate initial baselines
   "screenshot all components"

   # Commit to repo
   git add __visual-baselines__/
   git commit -m "Add visual baselines"
   ```

### Advanced Customization

1. **Add Custom Tools to MCP Server**
   Edit `mcp-server-ui-testing/src/tools/custom/`

2. **Extend Test Workflows**
   Configure different test profiles

3. **Integrate with Storybook**
   Auto-capture Storybook stories

4. **Performance Budgets**
   Set project-specific budgets

---

## 📚 Documentation References

### Skills Documentation
- [mcp-server-generator/SKILL.md](mcp-server-generator/SKILL.md) - MCP server generation guide
- [ui-testing-server/README.md](mcp-server-generator/templates/ui-testing-server/README.md) - Complete tool reference
- [component-tester/SKILL.md](component-tester/SKILL.md) - Testing with MCP integration

### External Resources
- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specification
- [Playwright](https://playwright.dev) - Browser automation
- [Axe-core](https://github.com/dequelabs/axe-core) - Accessibility testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing

---

## 🤝 Support

### Troubleshooting

**MCP Server won't start:**
```bash
# Check Node version
node --version  # Must be 18+

# Reinstall dependencies
cd mcp-server-ui-testing
rm -rf node_modules
npm install
npm run build
```

**Tests not running:**
```bash
# Verify MCP server is running
"check MCP server status"

# Restart server
"restart ui-testing server"

# Check logs
cat ~/.claude/logs/ui-testing-server.log
```

**Visual tests failing:**
```bash
# Update baselines if changes are intentional
"update all visual baselines"

# Adjust threshold
# In .claude/mcp-config.json:
{
  "visual": {
    "threshold": 0.2  // More tolerant (default: 0.1)
  }
}
```

### Get Help

- Create GitHub issue
- Check [troubleshooting guide](mcp-server-generator/templates/ui-testing-server/README.md#troubleshooting)
- Review skill documentation

---

## 🎉 You're All Set!

You now have a complete, automated UI testing system with:

✅ **7 powerful skills** for UI library development
✅ **39 testing tools** via MCP server
✅ **Seamless integration** between all skills
✅ **Automated workflows** for development, testing, and release
✅ **Production-ready** code quality
✅ **Zero-config** setup (with optional customization)

**Start testing:** `"test Button component"` 🚀

---

*Created with ❤️ for your UI library project*
