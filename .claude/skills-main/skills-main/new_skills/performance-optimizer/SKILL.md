---
name: performance-optimizer
description: Expert in React performance optimization, code splitting, lazy loading, memoization, bundle analysis, Core Web Vitals, Lighthouse audits, and runtime performance profiling
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# Performance Optimizer

Expert skill for optimizing React application performance. Specializes in code splitting, bundle optimization, memoization, Core Web Vitals, and runtime profiling.

## Core Capabilities

### 1. Code Splitting
- **React.lazy()**: Component-level splitting
- **Dynamic import()**: Route-based splitting
- **Loadable Components**: Advanced code splitting
- **Bundle Analysis**: webpack-bundle-analyzer
- **Tree Shaking**: Remove unused code

### 2. React Performance
- **React.memo()**: Prevent unnecessary renders
- **useMemo()**: Memoize expensive computations
- **useCallback()**: Memoize functions
- **useTransition()**: Non-blocking updates
- **useDeferredValue()**: Defer non-urgent updates
- **React Profiler**: Measure render performance

### 3. Bundle Optimization
- **Minification**: Terser, SWC
- **Compression**: Gzip, Brotli
- **Source Maps**: Optimize for production
- **Dead Code Elimination**: Remove unused exports
- **Module Concatenation**: Scope hoisting
- **Long-term Caching**: Content hashing

### 4. Image Optimization
- **WebP/AVIF**: Modern formats
- **Responsive Images**: srcset, sizes
- **Lazy Loading**: loading="lazy"
- **Image CDN**: Cloudinary, Imgix
- **Placeholder**: BlurHash, LQIP
- **Compression**: Quality optimization

### 5. Core Web Vitals
- **LCP**: Largest Contentful Paint < 2.5s
- **FID**: First Input Delay < 100ms
- **CLS**: Cumulative Layout Shift < 0.1
- **TTFB**: Time to First Byte < 800ms
- **FCP**: First Contentful Paint < 1.8s

### 6. Runtime Performance
- **Virtual Lists**: react-window, react-virtualized
- **Debouncing**: Limit function calls
- **Throttling**: Rate limiting
- **Web Workers**: Background processing
- **Intersection Observer**: Lazy load visibility
- **RAF**: requestAnimationFrame

## Code Splitting

```typescript
// Route-based splitting
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

// Component-level splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'))

function Analytics() {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  )
}
```

## Memoization

```typescript
// React.memo for components
const ExpensiveComponent = React.memo(({ data }: { data: Data }) => {
  return <div>{/* Expensive rendering */}</div>
})

// useMemo for values
function SearchResults({ query }: { query: string }) {
  const filteredResults = useMemo(() => {
    return expensiveFilter(items, query)
  }, [items, query])

  return <div>{/* Render results */}</div>
}

// useCallback for functions
function Parent() {
  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, [])

  return <Child onClick={handleClick} />
}
```

## Virtual Lists

```typescript
import { FixedSizeList } from 'react-window'

function VirtualList({ items }: { items: Item[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>{items[index].name}</div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

## Bundle Analysis

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
}

// package.json
{
  "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
}
```

## Image Optimization

```tsx
// Responsive + Lazy Loading
function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      srcSet={`
        ${src}?w=400 400w,
        ${src}?w=800 800w,
        ${src}?w=1200 1200w
      `}
      sizes="(max-width: 768px) 100vw, 50vw"
      loading="lazy"
      decoding="async"
      style={{ width: '100%', height: 'auto' }}
    />
  )
}
```

## Core Web Vitals

```typescript
// Measure Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  console.log(metric)
  // Send to analytics
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

## Best Practices

- Lazy load below-the-fold content
- Use production builds
- Enable compression (Gzip/Brotli)
- Optimize images (WebP, lazy loading)
- Code split by route
- Memoize expensive components
- Use virtual lists for large datasets
- Prefetch critical resources
- Monitor Core Web Vitals
- Regular bundle audits

## When to Use This Skill

Use when you need to:
- Improve app load time
- Reduce bundle size
- Optimize runtime performance
- Fix Core Web Vitals issues
- Implement code splitting
- Add lazy loading
- Optimize images
- Profile React performance

## Output Format

Provide:
1. **Performance Audit**: Current metrics
2. **Optimization Plan**: What to optimize
3. **Implementation**: Code changes
4. **Bundle Analysis**: Size improvements
5. **Metrics**: Before/after comparison
6. **Monitoring**: Track performance over time
