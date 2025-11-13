'use client';

import { useEffect } from 'react';

// Force dynamic rendering - don't prerender this page
export const dynamic = 'force-dynamic';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-slate-900 mb-4">500</h1>
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">
          Qualcosa è andato storto
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          Si è verificato un errore imprevisto. Riprova più tardi.
        </p>
        <button
          onClick={reset}
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Riprova
        </button>
      </div>
    </div>
  );
}
