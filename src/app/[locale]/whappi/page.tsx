import { redirect } from 'next/navigation';

// Whappi page is temporarily disabled - redirect to home
export default async function WhappiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}`);
}