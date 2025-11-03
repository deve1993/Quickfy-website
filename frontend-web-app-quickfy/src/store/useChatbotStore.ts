import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  /** Page context when message was sent */
  pageContext?: string;
}

export interface ChatbotState {
  /** Is chatbot window open */
  isOpen: boolean;
  /** Is chatbot enabled */
  isEnabled: boolean;
  /** Chat history */
  messages: ChatMessage[];
  /** Is currently generating response */
  isGenerating: boolean;
  /** Current page context */
  currentContext: string;
  /** Has user seen welcome message */
  hasSeenWelcome: boolean;
}

export interface ChatbotActions {
  /** Toggle chatbot window open/close */
  toggleOpen: () => void;
  /** Open chatbot window */
  open: () => void;
  /** Close chatbot window */
  close: () => void;
  /** Enable/disable chatbot */
  setEnabled: (enabled: boolean) => void;
  /** Add a message to chat history */
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  /** Set generating state */
  setGenerating: (isGenerating: boolean) => void;
  /** Update current page context */
  setContext: (context: string) => void;
  /** Clear chat history */
  clearHistory: () => void;
  /** Mark welcome as seen */
  markWelcomeSeen: () => void;
}

/**
 * Zustand store for AI Chatbot state management
 * Persists to localStorage for chat history
 */
export const useChatbotStore = create<ChatbotState & ChatbotActions>()(
  persist(
    (set, get) => ({
      // Initial state
      isOpen: false,
      isEnabled: true,
      messages: [],
      isGenerating: false,
      currentContext: "dashboard",
      hasSeenWelcome: false,

      // Actions
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

      open: () => set({ isOpen: true }),

      close: () => set({ isOpen: false }),

      setEnabled: (enabled) => set({ isEnabled: enabled }),

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          pageContext: get().currentContext,
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      setGenerating: (isGenerating) => set({ isGenerating }),

      setContext: (context) => set({ currentContext: context }),

      clearHistory: () => set({ messages: [] }),

      markWelcomeSeen: () => set({ hasSeenWelcome: true }),
    }),
    {
      name: "quickfy-chatbot-storage",
      // Only persist certain fields
      partialize: (state) => ({
        messages: state.messages,
        isEnabled: state.isEnabled,
        hasSeenWelcome: state.hasSeenWelcome,
      }),
    }
  )
);
