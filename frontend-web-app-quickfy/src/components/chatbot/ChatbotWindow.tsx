"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, Sparkles } from "lucide-react";
import { useChatbotStore } from "@/store/useChatbotStore";
import { generateResponse, getTypingDelay, getWelcomeMessage, getContextualSuggestions } from "@/lib/chatbot/responses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Chat message bubble component
 */
function MessageBubble({ message }: { message: any }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex gap-2 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
      role="article"
      aria-label={isUser ? "Il tuo messaggio" : "Messaggio dell'assistente AI"}
    >
      {!isUser && (
        <div
          className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center"
          aria-hidden="true"
        >
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs opacity-70 mt-1" aria-label={`Inviato alle ${new Date(message.timestamp).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}`}>
          {new Date(message.timestamp).toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {isUser && (
        <div
          className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-xs font-semibold">Tu</span>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Typing indicator
 */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-2 mb-4"
    >
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="bg-muted rounded-lg px-4 py-3 flex gap-1">
        <motion.div
          className="h-2 w-2 rounded-full bg-foreground/40"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="h-2 w-2 rounded-full bg-foreground/40"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="h-2 w-2 rounded-full bg-foreground/40"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Main chatbot window
 */
export function ChatbotWindow() {
  const {
    isOpen,
    messages,
    isGenerating,
    currentContext,
    hasSeenWelcome,
    addMessage,
    setGenerating,
    clearHistory,
    markWelcomeSeen,
  } = useChatbotStore();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Send welcome message on first open
  useEffect(() => {
    if (isOpen && !hasSeenWelcome && messages.length === 0) {
      const welcomeMsg = getWelcomeMessage(currentContext);
      addMessage({
        role: "assistant",
        content: welcomeMsg,
      });
      markWelcomeSeen();

      // Add contextual suggestions
      const contextSuggestions = getContextualSuggestions(currentContext);
      setSuggestions(contextSuggestions);
    }
  }, [isOpen, hasSeenWelcome, messages.length, currentContext]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    addMessage({
      role: "user",
      content: userMessage,
    });

    // Clear suggestions after first user message
    setSuggestions([]);

    // Simulate AI thinking
    setGenerating(true);

    // Generate response
    const response = generateResponse(userMessage, {
      page: currentContext,
      messages,
    });

    // Simulate typing delay
    const delay = getTypingDelay(response.length);
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Add AI response
    addMessage({
      role: "assistant",
      content: response,
    });

    setGenerating(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSend();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
      role="dialog"
      aria-label="Chatbot AI Marketing Assistant"
      aria-modal="false"
    >
      <Card className="flex flex-col h-[600px] max-h-[calc(100vh-10rem)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center" aria-hidden="true">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-sm" id="chatbot-title">AI Marketing Assistant</h3>
              <p className="text-xs text-muted-foreground" aria-live="polite">Sempre online</p>
            </div>
          </div>

          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearHistory}
              className="h-8 w-8"
              aria-label="Cancella cronologia chat"
              title="Cancella cronologia"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>

        {/* Messages */}
        <ScrollArea
          className="flex-1 p-4"
          ref={scrollRef}
          role="log"
          aria-label="Cronologia messaggi chat"
          aria-live="polite"
          aria-atomic="false"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isGenerating && <TypingIndicator />}
          </AnimatePresence>

          {/* Contextual suggestions */}
          {suggestions.length > 0 && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-2"
              role="region"
              aria-label="Suggerimenti rapidi"
            >
              <p className="text-xs text-muted-foreground font-medium mb-2">
                💡 Suggerimenti:
              </p>
              {suggestions.slice(0, 3).map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs"
                  onClick={() => handleSuggestionClick(suggestion)}
                  aria-label={`Usa suggerimento: ${suggestion}`}
                >
                  {suggestion}
                </Button>
              ))}
            </motion.div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            role="form"
            aria-label="Modulo invio messaggio"
          >
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Scrivi un messaggio..."
                disabled={isGenerating}
                className="flex-1"
                aria-label="Messaggio da inviare all'assistente AI"
                aria-describedby="chat-hint"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                size="icon"
                type="submit"
                aria-label="Invia messaggio"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <p id="chat-hint" className="text-xs text-muted-foreground mt-2">
              💡 Suggerimento: chiedi consigli specifici per questa pagina
            </p>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}
