import { getTranslations } from 'next-intl/server';
import { Shield, Calendar, Mail, Phone, MapPin } from 'lucide-react';

// Force dynamic rendering to avoid prerendering issues
export const dynamic = 'force-dynamic';

export default async function PrivacyPolicyPage() {
  const t = await getTranslations();
  const currentDate = new Date().toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sections = [
    'introduction',
    'dataController',
    'typesOfData',
    'purposes',
    'legalBasis',
    'sharing',
    'internationalTransfer',
    'retention',
    'rights',
    'security',
    'cookies',
    'minors',
    'changes',
    'contact'
  ];

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-none space-y-2">
          {content.map((item, index) => (
            <li key={index} className="text-gray-700 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-700 leading-relaxed">{content}</p>;
  };

  return (
    <main id="main-content" className="min-h-screen py-16 px-4" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('privacyPolicy.title')}
            </h1>
            <div className="flex items-center justify-center text-gray-600 mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{t('privacyPolicy.lastUpdated', { date: currentDate })}</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {sections.map((sectionKey) => {
              const sectionData = t.raw(`privacyPolicy.sections.${sectionKey}`);
              
              return (
                <section key={sectionKey} className="scroll-margin-top">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                    {sectionData.title}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {renderContent(sectionData.content)}
                  </div>
                  
                  {/* Special formatting for contact section */}
                  {sectionKey === 'contact' && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Kontakt pro ochranu údajů
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Mail className="w-5 h-5 text-primary mr-3" />
                              <a 
                                href="mailto:privacy@quickfy.com"
                                className="text-primary hover:text-primary/80 transition-colors"
                              >
                                privacy@quickfy.com
                              </a>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-5 h-5 text-primary mr-3" />
                              <span className="text-gray-700">+420 123 456 789</span>
                            </div>
                            <div className="flex items-start">
                              <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                              <span className="text-gray-700">
                                FL1 s.r.o.<br />
                                Moskevská 1464/61<br />
                                Vršovice<br />
                                101 00 Praha 10
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Dozorový orgán
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Mail className="w-5 h-5 text-primary mr-3" />
                              <a 
                                href="mailto:posta@uoou.cz"
                                className="text-primary hover:text-primary/80 transition-colors"
                              >
                                posta@uoou.cz
                              </a>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-5 h-5 text-primary mr-3" />
                              <span className="text-gray-700">+420 234 665 111</span>
                            </div>
                            <div className="flex items-start">
                              <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                              <span className="text-gray-700">
                                Úřad pro ochranu osobních údajů<br />
                                Pplk. Sochora 27<br />
                                170 00 Praha 7
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-primary/5 rounded-2xl text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Máte otázky k ochraně osobních údajů?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Pokud máte jakékoli dotazy nebo pochybnosti ohledně našich zásad ochrany osobních údajů, 
              neváhejte nás kontaktovat. Rádi vám pomůžeme.
            </p>
            <a
              href="mailto:privacy@quickfy.com"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Mail className="w-5 h-5 mr-2" />
              Kontaktovat nás
            </a>
          </div>
        </div>
      </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  return {
    title: t('privacyPolicy.meta.title'),
    description: t('privacyPolicy.meta.description'),
    openGraph: {
      title: t('privacyPolicy.meta.title'),
      description: t('privacyPolicy.meta.description'),
      type: 'website',
      locale,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}