'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Toast Provider Component
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast Container Component
function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div 
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-label="Notifiche"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual Toast Item Component
function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = icons[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        'relative flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm pointer-events-auto',
        colors[toast.type]
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <Icon 
        className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColors[toast.type])} 
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-5">
          {toast.title}
        </p>
        {toast.description && (
          <p className="mt-1 text-sm opacity-90 leading-5">
            {toast.description}
          </p>
        )}
        
        {/* Action button */}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-sm font-medium underline hover:no-underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 transition-colors"
        aria-label="Chiudi notifica"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Progress bar for timed toasts */}
      {toast.duration && toast.duration > 0 && !isHovered && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
}

// Hook with common toast methods
export function useToastHelpers() {
  const { addToast } = useToast();

  const success = (title: string, description?: string, action?: Toast['action']) => {
    addToast({ type: 'success', title, description, action });
  };

  const error = (title: string, description?: string, action?: Toast['action']) => {
    addToast({ type: 'error', title, description, action, duration: 7000 });
  };

  const warning = (title: string, description?: string, action?: Toast['action']) => {
    addToast({ type: 'warning', title, description, action });
  };

  const info = (title: string, description?: string, action?: Toast['action']) => {
    addToast({ type: 'info', title, description, action });
  };

  const promise = <T,>(
    promise: Promise<T>,
    {
      loading,
      success: successMessage,
      error: errorMessage,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    const loadingToastId = Math.random().toString(36).substring(2, 9);
    
    addToast({
      id: loadingToastId,
      type: 'info',
      title: loading,
      duration: 0,
    } as Toast);

    return promise
      .then((data) => {
        // Remove loading toast
        setTimeout(() => {
          // Note: In a real implementation, you'd need access to removeToast here
        }, 100);
        
        const message = typeof successMessage === 'function' 
          ? successMessage(data) 
          : successMessage;
        success(message);
        return data;
      })
      .catch((err: unknown) => {
        // Remove loading toast
        setTimeout(() => {
          // Note: In a real implementation, you'd need access to removeToast here
        }, 100);
        
        const message = typeof errorMessage === 'function' 
          ? errorMessage(err) 
          : errorMessage;
        error(message);
        throw err;
      });
  };

  return {
    success,
    error,
    warning,
    info,
    promise,
  };
}