import { getTranslations } from 'next-intl/server';
import { WhappiLandingPage } from '@/components/sections/WhappiLandingPage';

export default async function WhappiDemoPage() {
  return <WhappiLandingPage />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'whappi' });

  return {
    title: `${t('hero.title')} ${t('hero.titleHighlight')} - Whappi Demo`,
    description: t('hero.subtitle'),
    openGraph: {
      title: `${t('hero.title')} ${t('hero.titleHighlight')} - Whappi Demo`,
      description: t('hero.subtitle'),
      type: 'website',
      locale,
    },
  };
}