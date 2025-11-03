"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense, lazy } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { ChatbotProvider } from "@/components/chatbot";
import { SkipLink } from "@/components/accessibility";

// Lazy load chatbot for better initial performance
const Chatbot = lazy(() =>
  import("@/components/chatbot").then(mod => ({ default: mod.Chatbot }))
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ChatbotProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Skip link for keyboard navigation */}
        <SkipLink href="#main-content">Salta al contenuto principale</SkipLink>

        {/* Mobile Sidebar */}
        <MobileSidebar
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        />

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onMenuClick={() => setMobileMenuOpen(true)} />
          <main
            id="main-content"
            className="flex-1 overflow-y-auto p-4 md:p-6"
            tabIndex={-1}
            aria-label="Contenuto principale"
          >
            {children}
          </main>
        </div>

        {/* AI Chatbot - Lazy loaded */}
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>
    </ChatbotProvider>
  );
}
