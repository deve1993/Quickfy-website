'use client';

import dynamic from 'next/dynamic';

const ExitIntentModal = dynamic(
  () => import('@/components/modals/ExitIntentModal').then(mod => ({ default: mod.ExitIntentModal })),
  {
    ssr: false
  }
);

export function ExitIntentProvider() {
  return <ExitIntentModal />;
}
