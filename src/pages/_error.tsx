import { NextPage } from 'next';
import Link from 'next/link';

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)'
    }}>
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <h1 style={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#0f172a',
          marginBottom: '1rem'
        }}>
          {statusCode || '500'}
        </h1>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#334155',
          marginBottom: '1rem'
        }}>
          {statusCode === 404 ? 'Pagina non trovata' : 'Errore del server'}
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#64748b',
          marginBottom: '2rem'
        }}>
          {statusCode === 404
            ? 'La pagina che stai cercando non esiste.'
            : 'Si è verificato un errore. Riprova più tardi.'}
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            color: 'white',
            fontWeight: '600',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          Torna alla Home
        </Link>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
