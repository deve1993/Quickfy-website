"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChatbotStore } from "@/store/useChatbotStore";

/**
 * Extract page context from pathname
 */
function getPageContext(pathname: string): string {
  // Remove leading/trailing slashes
  const path = pathname.replace(/^\/|\/$/g, "");

  // Handle dashboard routes
  if (path.startsWith("dashboard")) {
    const parts = path.split("/");
    if (parts.length > 1) {
      return parts[1]; // e.g., "tickets", "goals", "campaigns"
    }
    return "dashboard";
  }

  // Handle root routes
  if (path === "" || path === "dashboard") {
    return "dashboard";
  }

  return "default";
}

/**
 * Provider that updates chatbot context based on current route
 * Must be inside layout to access usePathname
 *
 * @example
 * // Add to dashboard layout
 * <ChatbotProvider>
 *   {children}
 * </ChatbotProvider>
 */
export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const setContext = useChatbotStore((state) => state.setContext);

  useEffect(() => {
    const context = getPageContext(pathname);
    setContext(context);
  }, [pathname, setContext]);

  return <>{children}</>;
}
