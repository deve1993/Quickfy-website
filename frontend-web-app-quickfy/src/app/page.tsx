import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center space-y-4 md:space-y-6 p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100">
          Quickfy
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl px-4">
          La piattaforma all-in-one per gestire analytics, recensioni, social media e campagne marketing
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 px-4">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full">
              Accedi
            </Button>
          </Link>
          <Link href="/onboarding" className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              Inizia Gratis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
