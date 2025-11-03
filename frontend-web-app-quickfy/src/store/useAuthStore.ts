import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Workspace } from '@/types';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspace: Workspace) => void;
  login: (user: User, token: string, workspaces: Workspace[]) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      workspaces: [],
      activeWorkspace: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user) => set({ user }),

      setToken: (token) => set({ token }),

      setWorkspaces: (workspaces) => set({ workspaces }),

      setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),

      login: (user, token, workspaces) =>
        set({
          user,
          token,
          workspaces,
          activeWorkspace: workspaces[0] || null,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          workspaces: [],
          activeWorkspace: null,
          isAuthenticated: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'quickfy-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        workspaces: state.workspaces,
        activeWorkspace: state.activeWorkspace,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
