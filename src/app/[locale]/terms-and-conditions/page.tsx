import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { ChevronDown, FileText, Calendar, Mail, Phone, MapPin } from 'lucide-react';

// Force dynamic rendering to avoid prerendering issues
export const dynamic = 'force-dynamic';

interface TermsAndConditionsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: TermsAndConditionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  return {
    title: t('termsAndConditions.meta.title'),
    description: t('termsAndConditions.meta.description'),
    robots: 'index, follow',
    alternates: {
      canonical: `/${locale}/terms-and-conditions`,
      languages: {
        'cs': '/cs/terms-and-conditions',
        'en': '/en/terms-and-conditions', 
        'it': '/it/terms-and-conditions',
      },
    },
    openGraph: {
      title: t('termsAndConditions.meta.title'),
      description: t('termsAndConditions.meta.description'),
      url: `/${locale}/terms-and-conditions`,
      siteName: 'QuickFy',
      locale: locale,
      type: 'website',
    },
  };
}

function TableOfContents({ sections, t }: { sections: Record<string, { title: string }>; t: (key: string) => string }) {
  const sectionKeys = Object.keys(sections);
  
  return (
    <nav className="bg-gray-50 rounded-xl p-6 mb-12" aria-label="Table of contents">
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-semibold text-gray-900 mb-4 group-open:mb-6">
          <span>{t('termsAndConditions.tableOfContents.title')}</span>
          <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
        </summary>
        <ol className="space-y-3">
          {sectionKeys.map((key) => (
            <li key={key}>
              <a 
                href={`#${key}`}
                className="text-gray-600 hover:text-primary transition-colors text-sm leading-relaxed block py-1 hover:pl-2 transition-all duration-200"
              >
                {sections[key].title}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

function Section({ 
  id, 
  title, 
  content 
}: { 
  id: string; 
  title: string; 
  content: string | string[]; 
}) {
  const renderContent = () => {
    if (Array.isArray(content)) {
      return content.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
          {paragraph}
        </p>
      ));
    }
    return (
      <p className="text-gray-700 leading-relaxed">
        {content}
      </p>
    );
  };

  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
        {title}
      </h2>
      <div className="prose prose-lg max-w-none">
        {renderContent()}
      </div>
    </section>
  );
}

export default async function TermsAndConditionsPage({ params }: TermsAndConditionsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const currentDate = new Date().toLocaleDateString(locale === 'cs' ? 'cs-CZ' : locale === 'it' ? 'it-IT' : 'en-GB');

  // Get all sections dynamically
  const sectionKeys = [
    'basicProvisions',
    'userAccount', 
    'contractConclusion',
    'priceAndPayment',
    'cancellationWithdrawal',
    'transportDelivery',
    'rightsDefects',
    'additionalRights',
    'dataProtection',
    'deliveryElectronic',
    'finalProvisions',
    'withdrawalForm'
  ];

  const sections = sectionKeys.reduce((acc, key) => {
    const sectionData = t.raw(`termsAndConditions.sections.${key}`);
    acc[key] = {
      title: sectionData.title,
      content: sectionData.content
    };
    return acc;
  }, {} as Record<string, { title: string; content: string | string[] }>);

  return (
    <main id="main-content" className="min-h-screen py-16 px-4" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('termsAndConditions.title')}
            </h1>
            <div className="flex items-center justify-center text-gray-600 mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{t('termsAndConditions.lastUpdated', { date: currentDate })}</span>
            </div>
          </div>

          {/* Table of Contents */}
          <TableOfContents sections={sections} t={t} />
        
          {/* Document Sections */}
          <article className="space-y-12">
            {sectionKeys.map((key) => (
              <Section
                key={key}
                id={key}
                title={sections[key].title}
                content={sections[key].content}
              />
            ))}
          </article>
        
          {/* Contact Information Footer */}
          <div className="mt-16 p-8 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Kontaktní údaje
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Společnost
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                    <div className="text-gray-700">
                      <p className="font-medium">FL1 s.r.o.</p>
                      <p>Moskevská 1464/61, Vršovice</p>
                      <p>101 00 Praha 10</p>
                      <p>IČO: 19990146</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Kontakt
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <a 
                      href="mailto:info@quickfy.eu"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      info@quickfy.eu
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <a 
                      href="tel:+420775113732"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      +420 775 113 732
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-primary/5 rounded-2xl text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {locale === 'cs' && 'Máte otázky k obchodním podmínkám?'}
              {locale === 'en' && 'Have questions about our terms and conditions?'}
              {locale === 'it' && 'Hai domande sui nostri termini e condizioni?'}
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              {locale === 'cs' && 'Pokud máte jakékoli dotazy nebo pochybnosti ohledně našich obchodních podmínek, neváhejte nás kontaktovat. Rádi vám pomůžeme.'}
              {locale === 'en' && 'If you have any questions or concerns about our terms and conditions, please don\'t hesitate to contact us. We\'re here to help.'}
              {locale === 'it' && 'Se hai domande o dubbi sui nostri termini e condizioni, non esitare a contattarci. Siamo qui per aiutarti.'}
            </p>
            <a
              href="mailto:info@quickfy.eu"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Mail className="w-5 h-5 mr-2" />
              {locale === 'cs' && 'Kontaktovat nás'}
              {locale === 'en' && 'Contact us'}
              {locale === 'it' && 'Contattaci'}
            </a>
          </div>
        </div>
      </main>
  );
}