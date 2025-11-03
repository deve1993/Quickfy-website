"use client";

import { AnimatePresence } from "framer-motion";
import { ChatbotButton } from "./ChatbotButton";
import { ChatbotWindow } from "./ChatbotWindow";
import { useChatbotStore } from "@/store/useChatbotStore";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

/**
 * Main Chatbot component
 * Combines floating button and chat window
 * Supports Escape key to close
 *
 * @example
 * // Add to root layout
 * <Chatbot />
 */
export function Chatbot() {
  const isOpen = useChatbotStore((state) => state.isOpen);
  const toggleOpen = useChatbotStore((state) => state.toggleOpen);

  // Close chatbot with Escape key when open
  useKeyboardNavigation({
    onEscape: () => {
      if (isOpen) {
        toggleOpen();
      }
    },
    isActive: isOpen,
  });

  return (
    <>
      <ChatbotButton />
      <AnimatePresence>
        <ChatbotWindow />
      </AnimatePresence>
    </>
  );
}
