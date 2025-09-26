# External Script Loading Optimization

## Overview

This document outlines the comprehensive optimization implemented for external script loading in the QuickFy website to prevent "process is not defined" errors and improve overall script management.

## Problem Addressed

The main issue was that external JavaScript files (`performance-monitor.js`) were trying to access Node.js globals like `process.env.NODE_ENV` directly in the browser environment, causing runtime errors.

## Solution Architecture

### 1. Environment Injection System

**File: `src/lib/env-injection.ts`**

- Safely exposes environment variables to client-side scripts
- Creates a global `window.__QUICKFY_ENV__` object with safe environment variables
- Provides utilities for environment detection in external scripts

**Safe Environment Variables:**
- `NODE_ENV`: Application environment (development/production)
- `APP_ENV`: Custom application environment
- `ANALYTICS_ENABLED`: Google Analytics toggle
- `PERFORMANCE_MONITORING`: Performance monitoring toggle
- `SERVICE_WORKER_ENABLED`: Service worker toggle
- `DEBUG_SCRIPTS`: Debug mode for scripts

### 2. Script Loading Strategy

**Layout Implementation (`src/app/[locale]/layout.tsx`):**

1. **Environment Injection First**: Loads environment variables before any external scripts
2. **Error Handling**: All external scripts include `onLoad` and `onError` handlers
3. **Strategy Optimization**: Uses appropriate loading strategies for each script type

```tsx
{/* Environment injection - Must be first */}
<Script
  id="env-injection"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: getEnvInjectionScriptContent()
  }}
/>

{/* External scripts with error handling */}
<Script
  src="/js/performance-monitor.js"
  strategy="lazyOnload"
  defer
  onLoad={() => console.log('Performance monitor loaded')}
  onError={(error) => console.warn('Performance monitor failed:', error)}
/>
```

### 3. Enhanced External Scripts

**Performance Monitor (`public/js/performance-monitor.js`):**

- Removed direct `process.env` access
- Added browser-safe environment detection
- Fallback to URL-based environment detection
- Configurable through environment variables

**Service Worker Initialization (`public/js/service-worker-init.js`):**

- Enhanced error handling and logging
- Environment-aware service worker registration
- Automatic update detection and handling
- BFCache optimization support

### 4. Script Loader Utility

**File: `src/lib/script-loader.ts`**

Advanced script loading utility with:

- Environment requirement checks
- Error handling and retry logic
- Sequential and parallel loading options
- Predefined configurations for common scripts

```typescript
// Example usage
const performanceScript = {
  src: '/js/performance-monitor.js',
  requiresEnvironment: true,
  environmentCheck: () => window.__QUICKFY_ENV__?.PERFORMANCE_MONITORING === 'true'
};

await loadScript(performanceScript);
```

### 5. Build-Time Environment Injection

**File: `scripts/env-injection-plugin.js`**

Webpack plugin for build-time environment variable injection:

- Replaces placeholder tokens in external scripts
- Supports multiple environment configurations
- Verbose logging for debugging

## Environment Configuration

### Development (.env.local)
```bash
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_PERFORMANCE_MONITORING=true
NEXT_PUBLIC_SERVICE_WORKER_ENABLED=false
NEXT_PUBLIC_DEBUG_SCRIPTS=true
```

### Production
```bash
NEXT_PUBLIC_NODE_ENV=production
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_PERFORMANCE_MONITORING=true
NEXT_PUBLIC_SERVICE_WORKER_ENABLED=true
NEXT_PUBLIC_DEBUG_SCRIPTS=false
```

## Benefits

1. **No More "process is not defined" Errors**: Safe environment access in browser
2. **Better Error Handling**: Comprehensive error handling for all external scripts
3. **Environment Awareness**: Scripts adapt based on environment configuration
4. **Performance Optimization**: Lazy loading and strategic script placement
5. **Maintainability**: Centralized script management and configuration
6. **Debugging**: Enhanced logging and error reporting

## Usage Guidelines

### Adding New External Scripts

1. **Create the script in `public/js/`**
2. **Use environment detection pattern:**
   ```javascript
   function isEnabled() {
     return window.__QUICKFY_ENV__?.FEATURE_ENABLED === 'true';
   }

   if (!isEnabled()) return;
   ```

3. **Add script configuration to layout:**
   ```tsx
   <Script
     src="/js/your-script.js"
     strategy="lazyOnload"
     onLoad={() => console.log('Script loaded')}
     onError={(error) => console.warn('Script failed:', error)}
   />
   ```

4. **Add environment variable to `src/lib/env-injection.ts`**

### Testing Scripts

1. **Development Testing**:
   ```bash
   npm run dev
   # Check browser console for environment injection and script loading
   ```

2. **Production Testing**:
   ```bash
   npm run build
   npm start
   # Verify all optimizations work in production mode
   ```

## Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful degradation with fallbacks
- **Service Workers**: Only enabled in supported browsers

## Performance Impact

- **Environment Injection**: ~0.1KB overhead
- **Script Loading**: Lazy loading reduces initial bundle size
- **Error Handling**: Minimal overhead with comprehensive coverage

## Future Enhancements

1. **Script Versioning**: Add version-based cache busting
2. **Dynamic Loading**: Runtime script loading based on user interactions
3. **A/B Testing**: Environment-based script variations
4. **Monitoring Integration**: Enhanced analytics for script performance

## Troubleshooting

### Common Issues

1. **Environment Variables Not Available**:
   - Ensure variables are prefixed with `NEXT_PUBLIC_`
   - Check `.env.local` file exists and is properly formatted

2. **Scripts Not Loading**:
   - Check browser console for error messages
   - Verify script paths are correct
   - Ensure environment checks are properly configured

3. **Service Worker Issues**:
   - Check if service workers are supported
   - Verify HTTPS in production (required for service workers)
   - Check browser DevTools > Application > Service Workers

### Debug Mode

Enable debug mode by setting:
```bash
NEXT_PUBLIC_DEBUG_SCRIPTS=true
```

This will provide verbose logging for all script operations.