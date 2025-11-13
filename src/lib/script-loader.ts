/**
 * Centralized script loader utility
 * Provides safe, error-handled script loading with environment awareness
 */

// Removed unused import to fix ESLint warning

export interface ScriptLoadOptions {
  src: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  onError?: (error: Event) => void;
  requiresEnvironment?: boolean;
  environmentCheck?: () => boolean;
}

/**
 * Load a script with error handling and environment checks
 */
export function loadScript(options: ScriptLoadOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check environment requirements
    if (options.requiresEnvironment && typeof window !== 'undefined') {
      if (!window.__QUICKFY_ENV__) {
        console.warn(`Script ${options.src} requires environment injection but __QUICKFY_ENV__ is not available`);
        reject(new Error('Environment not available'));
        return;
      }
    }

    // Check custom environment condition
    if (options.environmentCheck && !options.environmentCheck()) {
      console.log(`Script ${options.src} skipped due to environment check`);
      resolve();
      return;
    }

    // Check if script is already loaded
    if (options.id && document.getElementById(options.id)) {
      console.log(`Script ${options.id} already loaded`);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = options.src;

    if (options.id) {
      script.id = options.id;
    }

    if (options.async) {
      script.async = true;
    }

    if (options.defer) {
      script.defer = true;
    }

    script.onload = () => {
      console.log(`Script loaded successfully: ${options.src}`);
      if (options.onLoad) {
        options.onLoad();
      }
      resolve();
    };

    script.onerror = (error) => {
      console.error(`Failed to load script: ${options.src}`, error);
      if (options.onError) {
        options.onError(error as Event);
      }
      reject(error);
    };

    // Determine where to append the script
    const target = options.strategy === 'beforeInteractive' ?
      document.head :
      (document.body || document.head);

    target.appendChild(script);
  });
}

/**
 * Load multiple scripts in sequence
 */
export async function loadScriptsSequentially(scripts: ScriptLoadOptions[]): Promise<void> {
  for (const script of scripts) {
    try {
      await loadScript(script);
    } catch (error) {
      console.error(`Failed to load script in sequence: ${script.src}`, error);
      // Continue with next script unless it's critical
      if (script.id?.includes('critical')) {
        throw error;
      }
    }
  }
}

/**
 * Load multiple scripts in parallel
 */
export async function loadScriptsParallel(scripts: ScriptLoadOptions[]): Promise<void> {
  const promises = scripts.map(script =>
    loadScript(script).catch(error => {
      console.error(`Failed to load script in parallel: ${script.src}`, error);
      return null; // Don't fail the entire batch
    })
  );

  await Promise.all(promises);
}

/**
 * Predefined script configurations for common use cases
 */
export const SCRIPT_CONFIGS = {
  performanceMonitor: {
    src: '/js/performance-monitor.js',
    id: 'performance-monitor',
    defer: true,
    requiresEnvironment: true,
    environmentCheck: () => {
      const env = window.__QUICKFY_ENV__;
      return env?.PERFORMANCE_MONITORING === 'true' || env?.NODE_ENV === 'production';
    },
    onLoad: () => console.log('Performance monitoring initialized'),
    onError: () => console.warn('Performance monitoring failed to initialize')
  } as ScriptLoadOptions,

  serviceWorkerInit: {
    src: '/js/service-worker-init.js',
    id: 'service-worker-init',
    defer: true,
    requiresEnvironment: true,
    environmentCheck: () => {
      const env = window.__QUICKFY_ENV__;
      return 'serviceWorker' in navigator &&
             (env?.SERVICE_WORKER_ENABLED === 'true' || env?.NODE_ENV === 'production');
    },
    onLoad: () => console.log('Service worker initialization script loaded'),
    onError: () => console.warn('Service worker initialization failed')
  } as ScriptLoadOptions,

  analytics: {
    src: 'https://www.googletagmanager.com/gtag/js',
    id: 'gtag-script',
    async: true,
    requiresEnvironment: true,
    environmentCheck: () => {
      const env = window.__QUICKFY_ENV__;
      return env?.ANALYTICS_ENABLED === 'true';
    },
    onLoad: () => console.log('Google Analytics script loaded'),
    onError: () => console.warn('Google Analytics script failed to load')
  } as ScriptLoadOptions
};

/**
 * Initialize all external scripts with proper environment checks
 */
export function initializeExternalScripts(): void {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExternalScripts);
    return;
  }

  // Load scripts based on environment
  const scriptsToLoad = [
    SCRIPT_CONFIGS.performanceMonitor,
    SCRIPT_CONFIGS.serviceWorkerInit
  ];

  // Load analytics only if enabled
  if (window.__QUICKFY_ENV__?.ANALYTICS_ENABLED === 'true') {
    scriptsToLoad.push(SCRIPT_CONFIGS.analytics);
  }

  // Load scripts in parallel for better performance
  loadScriptsParallel(scriptsToLoad).catch(error => {
    console.error('Failed to initialize some external scripts:', error);
  });
}

// Auto-initialize when this module is loaded on the client side
if (typeof window !== 'undefined' && window.__QUICKFY_ENV__) {
  initializeExternalScripts();
}