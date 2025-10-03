import { BreadcrumbLayout } from '@/components/layout/BreadcrumbLayout';
import { AppMockup } from '@/components/ui/app-mockup';

export default function ComponentShowcasePage() {
  return (
    <BreadcrumbLayout showBreadcrumb={true}>
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-20">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Whappi Component Showcase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visual design components and placeholder elements for the comprehensive Whappi landing page
            </p>
          </div>

          {/* App Mockup Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">1. Hero App Interface Mockup</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Default Variant</h3>
                <AppMockup className="max-w-sm mx-auto" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Features Highlighted:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>WhatsApp-style chat interface</li>
                  <li>Team collaboration features (assignments, internal notes)</li>
                  <li>Multi-platform messaging badges (WhatsApp, Telegram, Meta)</li>
                  <li>Professional team communication workflow</li>
                  <li>Responsive design with hover effects</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>
    </BreadcrumbLayout>
  );
}