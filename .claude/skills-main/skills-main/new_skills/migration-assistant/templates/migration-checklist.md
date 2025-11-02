# React 18 Migration Checklist

## Pre-Migration

### 1. Audit Current Setup
- [ ] Check current React version
- [ ] Review all dependencies for React 18 compatibility
- [ ] Identify deprecated APIs in use
- [ ] Document all third-party libraries
- [ ] Run existing test suite and document results

### 2. Prepare Environment
- [ ] Create new branch for migration
- [ ] Back up current codebase
- [ ] Set up parallel testing environment
- [ ] Update TypeScript to 4.5+ (if using TypeScript)
- [ ] Review React 18 migration guide

### 3. Team Preparation
- [ ] Share migration plan with team
- [ ] Schedule migration work
- [ ] Assign responsibilities
- [ ] Plan rollback strategy

## Phase 1: Update Dependencies

### Core Dependencies
- [ ] Update `react` to 18.x
  ```bash
  npm install react@18
  ```
- [ ] Update `react-dom` to 18.x
  ```bash
  npm install react-dom@18
  ```
- [ ] Update `@types/react` to 18.x (TypeScript)
  ```bash
  npm install -D @types/react@18
  ```
- [ ] Update `@types/react-dom` to 18.x (TypeScript)
  ```bash
  npm install -D @types/react-dom@18
  ```

### Testing Libraries
- [ ] Update `@testing-library/react` to 13.x+
  ```bash
  npm install -D @testing-library/react@13
  ```
- [ ] Update `@testing-library/react-hooks` (if used)
- [ ] Update Jest and related dependencies
- [ ] Update Enzyme (or migrate to Testing Library)

### Related Libraries
- [ ] Update React Router (if used)
- [ ] Update Redux (if used)
- [ ] Update styled-components / emotion (if used)
- [ ] Update form libraries (React Hook Form, Formik)
- [ ] Update UI libraries (Material-UI, Ant Design, etc.)

### Verify Compatibility
- [ ] Check for peer dependency warnings
- [ ] Run `npm ls` to check dependency tree
- [ ] Review and resolve any conflicts

## Phase 2: Code Updates

### Root Rendering API
- [ ] Update `ReactDOM.render` to `createRoot`
  ```tsx
  // Before
  ReactDOM.render(<App />, document.getElementById('root'))

  // After
  import { createRoot } from 'react-dom/client'
  const root = createRoot(document.getElementById('root')!)
  root.render(<App />)
  ```
- [ ] Update `ReactDOM.hydrate` to `hydrateRoot` (SSR)
- [ ] Update `ReactDOM.unmountComponentAtNode` to `root.unmount()`

### Type Updates (TypeScript)
- [ ] Update function component types
  ```tsx
  // Before
  const Component: React.FC<Props> = (props) => { }

  // After (React 18 removed implicit children)
  const Component = (props: Props) => { }
  ```
- [ ] Add explicit `children` prop when needed
  ```tsx
  interface Props {
    children?: React.ReactNode
  }
  ```
- [ ] Fix `ReactElement` type errors
- [ ] Update event handler types if needed

### Remove Deprecated APIs
- [ ] Replace `ReactDOM.render` callback with `useEffect`
- [ ] Remove `ReactDOM.findDOMNode` usage
- [ ] Update string refs to callback refs or useRef
- [ ] Remove `UNSAFE_` lifecycle methods

### Concurrent Features (Optional)
- [ ] Wrap state updates in `startTransition` for non-urgent updates
- [ ] Use `useDeferredValue` for expensive computations
- [ ] Add `useId` for SSR-safe IDs
- [ ] Implement `useSyncExternalStore` for external stores

## Phase 3: Testing

### Unit Tests
- [ ] Run all unit tests
- [ ] Fix broken tests
- [ ] Update test snapshots
- [ ] Add tests for new concurrent features

### Integration Tests
- [ ] Run integration tests
- [ ] Test critical user flows
- [ ] Test form submissions
- [ ] Test data fetching

### Manual Testing
- [ ] Test app in Chrome
- [ ] Test app in Firefox
- [ ] Test app in Safari
- [ ] Test app in Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test with React DevTools

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Compare bundle sizes (before/after)
- [ ] Profile with React Profiler
- [ ] Check for memory leaks

## Phase 4: Backwards Compatibility

### Gradual Migration (If Needed)
- [ ] Identify components that can stay on old behavior
- [ ] Use legacy root API if needed temporarily
  ```tsx
  import { render } from 'react-dom'
  render(<App />, container)
  ```
- [ ] Plan phased rollout

## Phase 5: Documentation

### Update Documentation
- [ ] Update README with new React version
- [ ] Document breaking changes
- [ ] Update component documentation
- [ ] Update setup instructions
- [ ] Document new patterns used

### Training
- [ ] Create migration guide for team
- [ ] Present new React 18 features
- [ ] Share best practices
- [ ] Document lessons learned

## Phase 6: Deployment

### Pre-Deployment
- [ ] Create release notes
- [ ] Review all changes
- [ ] Final test in staging
- [ ] Prepare rollback plan
- [ ] Alert team of deployment

### Deployment
- [ ] Deploy to staging
- [ ] Smoke test staging
- [ ] Deploy to production (during low-traffic period)
- [ ] Monitor error tracking (Sentry, etc.)
- [ ] Monitor performance metrics
- [ ] Monitor user reports

### Post-Deployment
- [ ] Check error rates
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Fix any issues quickly
- [ ] Document any problems

## Phase 7: Optimization (Post-Migration)

### Leverage New Features
- [ ] Identify opportunities for `startTransition`
- [ ] Use `useDeferredValue` for search/filters
- [ ] Implement automatic batching benefits
- [ ] Use `useId` for accessibility IDs
- [ ] Enable Suspense where applicable

### Performance Improvements
- [ ] Optimize re-renders with new batching
- [ ] Profile with React 18 Profiler
- [ ] Reduce unnecessary state updates
- [ ] Optimize Suspense boundaries

### Code Quality
- [ ] Remove workarounds for old React limitations
- [ ] Refactor to use new patterns
- [ ] Update ESLint rules
- [ ] Run code quality checks

## Common Issues & Solutions

### Issue: TypeScript errors with children prop
**Solution**: Add explicit `children` prop to component interfaces
```tsx
interface Props {
  children?: React.ReactNode
}
```

### Issue: Tests failing with "act" warnings
**Solution**: Update test utilities and wrap state updates
```tsx
import { act } from '@testing-library/react'
```

### Issue: Hydration mismatches (SSR)
**Solution**: Use `useId()` for stable IDs across server/client
```tsx
const id = useId()
```

### Issue: Third-party library not compatible
**Solution**:
1. Check for updates
2. Find alternative library
3. Use legacy root API temporarily

### Issue: Performance regression
**Solution**: Use React Profiler to identify bottlenecks
```tsx
<Profiler id="Component" onRender={callback}>
  <Component />
</Profiler>
```

## React 18 New Features Summary

### Automatic Batching
Multiple state updates are automatically batched for better performance
```tsx
// React 18 batches these automatically
setCount(c => c + 1)
setFlag(f => !f)
// Only 1 re-render instead of 2
```

### Transitions
Mark non-urgent updates to keep UI responsive
```tsx
startTransition(() => {
  setSearchQuery(input)
})
```

### Suspense Improvements
Better support for data fetching
```tsx
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

### New Hooks
- `useId()`: Generate unique IDs for accessibility
- `useTransition()`: Manage transition state
- `useDeferredValue()`: Defer expensive updates
- `useSyncExternalStore()`: Subscribe to external stores

## Resources

- [React 18 Announcement](https://react.dev/blog/2022/03/29/react-v18)
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [New React 18 Hooks](https://react.dev/reference/react)
- [Concurrent Features](https://react.dev/learn/concurrent-features)
- [TypeScript Changes](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210)

## Rollback Plan

If critical issues occur:

1. **Immediate Actions**
   - [ ] Revert to previous version in production
   - [ ] Notify team of rollback
   - [ ] Document the issue

2. **Investigation**
   - [ ] Reproduce issue in staging
   - [ ] Identify root cause
   - [ ] Create fix

3. **Re-Deployment**
   - [ ] Test fix thoroughly
   - [ ] Deploy fix to staging
   - [ ] Deploy to production with monitoring

## Sign-Off

- [ ] Technical lead approval
- [ ] QA sign-off
- [ ] Product owner approval
- [ ] Migration complete ✅
