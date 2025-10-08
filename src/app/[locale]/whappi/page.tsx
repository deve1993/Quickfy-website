import { getTranslations } from 'next-intl/server';
import { WhappiSection } from '@/components/sections/WhappiSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default async function WhappiPage() {
  return (
    <main id="main-content" className="min-h-screen" role="main">
      {/* Whappi Hero and Features Section */}
      <WhappiSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t('whappi.hero.title')} ${t('whappi.hero.titleHighlight')} - QuickFy`,
    description: t('whappi.hero.subtitle'),
    openGraph: {
      title: `${t('whappi.hero.title')} ${t('whappi.hero.titleHighlight')} - QuickFy`,
      description: t('whappi.hero.subtitle'),
      type: 'website',
      locale,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}