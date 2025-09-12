import { BreadcrumbDemo } from '@/components/demo/BreadcrumbDemo';

export default async function BreadcrumbDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
      <BreadcrumbDemo />
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return {
    title: 'QuickFy - Breadcrumb System Demo',
    description: 'Comprehensive breadcrumb navigation system with SEO optimization and multilingual support',
    openGraph: {
      title: 'QuickFy - Breadcrumb System Demo',
      description: 'Comprehensive breadcrumb navigation system with SEO optimization and multilingual support',
      type: 'website',
      locale,
    },
  };
}