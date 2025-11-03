import { create } from 'zustand';
import type { Toast, NotificationType } from '@/types';

interface ToastState {
  toasts: Toast[];
  addToast: (
    type: NotificationType,
    title: string,
    description?: string,
    duration?: number
  ) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (type, title, description, duration = 5000) => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = {
      id,
      type,
      title,
      description,
      duration,
    };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearAll: () => set({ toasts: [] }),
}));

// Helper hooks for common toast types
export const useToast = () => {
  const { addToast } = useToastStore();

  return {
    success: (title: string, description?: string) =>
      addToast('success', title, description),
    error: (title: string, description?: string) =>
      addToast('error', title, description),
    warning: (title: string, description?: string) =>
      addToast('warning', title, description),
    info: (title: string, description?: string) =>
      addToast('info', title, description),
  };
};
