import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Workspace, CreateWorkspaceData, UpdateWorkspaceData, InviteMemberData, UpdateMemberRoleData, WorkspaceMember } from '@/types';
import { mockApi } from '@/lib/odoo/mock-data';
import { toast } from 'sonner';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspace: Workspace) => void;
  login: (user: User, token: string, workspaces: Workspace[]) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;

  // Workspace Actions
  createWorkspace: (data: CreateWorkspaceData) => Promise<Workspace>;
  updateWorkspace: (id: string, data: UpdateWorkspaceData) => Promise<Workspace>;
  deleteWorkspace: (id: string) => Promise<void>;
  switchWorkspace: (workspace: Workspace) => void;

  // Members Actions
  inviteMember: (workspaceId: string, data: InviteMemberData) => Promise<WorkspaceMember>;
  updateMemberRole: (workspaceId: string, memberId: string, data: UpdateMemberRoleData) => Promise<void>;
  removeMember: (workspaceId: string, memberId: string) => Promise<void>;
  resendInvite: (workspaceId: string, memberId: string) => Promise<void>;
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

      // ============================================
      // WORKSPACE ACTIONS
      // ============================================

      createWorkspace: async (data) => {
        try {
          const newWorkspace = await mockApi.createWorkspace(data);
          set((state) => ({
            workspaces: [...state.workspaces, newWorkspace],
            activeWorkspace: newWorkspace,
          }));
          return newWorkspace;
        } catch (error) {
          toast.error('Errore nella creazione del workspace');
          throw error;
        }
      },

      updateWorkspace: async (id, data) => {
        try {
          const updatedWorkspace = await mockApi.updateWorkspace(id, data);
          set((state) => ({
            workspaces: state.workspaces.map((w) =>
              w.id === id ? updatedWorkspace : w
            ),
            activeWorkspace:
              state.activeWorkspace?.id === id
                ? updatedWorkspace
                : state.activeWorkspace,
          }));
          return updatedWorkspace;
        } catch (error) {
          toast.error('Errore nell\'aggiornamento del workspace');
          throw error;
        }
      },

      deleteWorkspace: async (id) => {
        try {
          await mockApi.deleteWorkspace(id);
          set((state) => {
            const newWorkspaces = state.workspaces.filter((w) => w.id !== id);
            return {
              workspaces: newWorkspaces,
              activeWorkspace:
                state.activeWorkspace?.id === id
                  ? newWorkspaces[0] || null
                  : state.activeWorkspace,
            };
          });
        } catch (error) {
          toast.error('Errore nell\'eliminazione del workspace');
          throw error;
        }
      },

      switchWorkspace: (workspace) => {
        set({ activeWorkspace: workspace });
      },

      // ============================================
      // MEMBERS ACTIONS
      // ============================================

      inviteMember: async (workspaceId, data) => {
        try {
          const newMember = await mockApi.inviteMember(workspaceId, data);
          set((state) => ({
            workspaces: state.workspaces.map((w) =>
              w.id === workspaceId
                ? { ...w, members: [...w.members, newMember] }
                : w
            ),
            activeWorkspace:
              state.activeWorkspace?.id === workspaceId
                ? {
                    ...state.activeWorkspace,
                    members: [...state.activeWorkspace.members, newMember],
                  }
                : state.activeWorkspace,
          }));
          return newMember;
        } catch (error) {
          toast.error('Errore nell\'invio dell\'invito');
          throw error;
        }
      },

      updateMemberRole: async (workspaceId, memberId, data) => {
        try {
          await mockApi.updateMemberRole(workspaceId, memberId, data);
          set((state) => ({
            workspaces: state.workspaces.map((w) =>
              w.id === workspaceId
                ? {
                    ...w,
                    members: w.members.map((m) =>
                      m.id === memberId
                        ? { ...m, role: data.role, user: { ...m.user, role: data.role } }
                        : m
                    ),
                  }
                : w
            ),
            activeWorkspace:
              state.activeWorkspace?.id === workspaceId
                ? {
                    ...state.activeWorkspace,
                    members: state.activeWorkspace.members.map((m) =>
                      m.id === memberId
                        ? { ...m, role: data.role, user: { ...m.user, role: data.role } }
                        : m
                    ),
                  }
                : state.activeWorkspace,
          }));
        } catch (error) {
          toast.error('Errore nell\'aggiornamento del ruolo');
          throw error;
        }
      },

      removeMember: async (workspaceId, memberId) => {
        try {
          await mockApi.removeMember(workspaceId, memberId);
          set((state) => ({
            workspaces: state.workspaces.map((w) =>
              w.id === workspaceId
                ? { ...w, members: w.members.filter((m) => m.id !== memberId) }
                : w
            ),
            activeWorkspace:
              state.activeWorkspace?.id === workspaceId
                ? {
                    ...state.activeWorkspace,
                    members: state.activeWorkspace.members.filter(
                      (m) => m.id !== memberId
                    ),
                  }
                : state.activeWorkspace,
          }));
        } catch (error) {
          toast.error('Errore nella rimozione del membro');
          throw error;
        }
      },

      resendInvite: async (workspaceId, memberId) => {
        try {
          await mockApi.resendInvite(workspaceId, memberId);
        } catch (error) {
          toast.error('Errore nell\'invio dell\'invito');
          throw error;
        }
      },
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
