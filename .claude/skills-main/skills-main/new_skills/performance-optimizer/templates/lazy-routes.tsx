import { lazy, Suspense, ComponentType } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Loading fallback component
function RouteLoadingFallback() {
  return (
    <div className="route-loading">
      <div className="spinner" />
      <p>Loading page...</p>
    </div>
  )
}

// Lazy load route component with error boundary
export function lazyLoadRoute<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: JSX.Element
) {
  const LazyComponent = lazy(importFunc)

  return (props: any) => (
    <Suspense fallback={fallback || <RouteLoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

// Preload route for faster navigation
export function preloadRoute(importFunc: () => Promise<any>) {
  return importFunc()
}

// Lazy loaded pages
const HomePage = lazyLoadRoute(() => import('../pages/Home'))
const DashboardPage = lazyLoadRoute(() => import('../pages/Dashboard'))
const ProfilePage = lazyLoadRoute(() => import('../pages/Profile'))
const SettingsPage = lazyLoadRoute(() => import('../pages/Settings'))
const AnalyticsPage = lazyLoadRoute(() => import('../pages/Analytics'))

// Admin routes (separate chunk)
const AdminDashboard = lazyLoadRoute(() => import('../pages/admin/Dashboard'))
const AdminUsers = lazyLoadRoute(() => import('../pages/admin/Users'))
const AdminSettings = lazyLoadRoute(() => import('../pages/admin/Settings'))

// Route configuration with preloading
export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />

      {/* Authenticated routes */}
      <Route
        path="/dashboard"
        element={<DashboardPage />}
        // Preload on hover
        onMouseEnter={() => preloadRoute(() => import('../pages/Dashboard'))}
      />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />

      {/* Admin routes (separate bundle) */}
      <Route path="/admin">
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 - Lazy load */}
      <Route
        path="*"
        element={lazyLoadRoute(() => import('../pages/NotFound'))()}
      />
    </Routes>
  )
}

// Advanced: Route-based code splitting with data preloading
interface RouteConfig {
  path: string
  component: () => Promise<{ default: ComponentType<any> }>
  preload?: () => Promise<any> // Preload data
}

const routeConfigs: RouteConfig[] = [
  {
    path: '/',
    component: () => import('../pages/Home'),
  },
  {
    path: '/dashboard',
    component: () => import('../pages/Dashboard'),
    preload: () => import('../api/dashboard').then((m) => m.preloadDashboard()),
  },
  {
    path: '/profile',
    component: () => import('../pages/Profile'),
    preload: () => import('../api/profile').then((m) => m.preloadProfile()),
  },
]

// Preload both component and data
export function preloadRouteWithData(path: string) {
  const config = routeConfigs.find((r) => r.path === path)
  if (!config) return

  // Preload component
  const componentPromise = config.component()

  // Preload data if available
  const dataPromise = config.preload?.()

  return Promise.all([componentPromise, dataPromise])
}

// Advanced Routes with intelligent preloading
export function AdvancedRoutes() {
  return (
    <Routes>
      {routeConfigs.map((config) => {
        const Component = lazyLoadRoute(config.component)
        return (
          <Route
            key={config.path}
            path={config.path}
            element={<Component />}
            // Preload on link hover
            onMouseEnter={() => preloadRouteWithData(config.path)}
          />
        )
      })}
    </Routes>
  )
}

// Export styles for loading fallback
export const loadingStyles = `
.route-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`
