'use client';

import { useTranslations } from 'next-intl';
import { BarChart3, Mail, Phone, MapPin, ArrowUp, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneLink } from '../ui/PhoneLink';

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  // Check if we're on the home page (any locale home page)
  const isHomePage = pathname === '/' || pathname?.match(/^\/[a-z]{2}$/);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      // If we're on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If we're not on home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleQuickLinkClick = (sectionId: string) => {
    if (isHomePage) {
      // If we're on home page, scroll to section
      scrollToSection(sectionId);
    } else {
      // If we're not on home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const quickLinks = [
    { label: t('navigation.features'), sectionId: 'features' },
    { label: t('navigation.benefits'), sectionId: 'benefits' },
    { label: t('navigation.pricing'), sectionId: 'pricing' },
    { label: t('navigation.testimonials'), sectionId: 'testimonials' },
    { label: t('navigation.contact'), sectionId: 'contact' }
  ];

  const resourceLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Guide', href: '/guide' },
    { label: 'Documentazione', href: '/docs' }
  ];

  return (
    <footer id="footer" className="bg-secondary border-t border-border py-16 px-4" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-primary" size={32} aria-hidden="true" />
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">QuickFy</h3>
            </div>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-6">
              {t('footer.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@quickfy.eu"
                  className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
                  aria-label={t('footer.contact.emailAria')}
                >
                  info@quickfy.eu
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <PhoneLink
                  phoneNumber="+420775113732"
                  className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
                  ariaLabel="Zavolat QuickFy"
                >
                  +420 775 113 732
                </PhoneLink>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Moskevská 1464/61, Vršovice, Praha 10</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Link Rapidi</h4>
            <nav aria-label="Link di navigazione footer">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.sectionId}>
                    {isHomePage ? (
                      <button
                        onClick={() => handleQuickLinkClick(link.sectionId)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded text-left"
                        aria-label={`Vai alla sezione ${link.label}`}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={`/#${link.sectionId}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
                        aria-label={`Vai alla sezione ${link.label}`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Risorse</h4>
            <nav aria-label="Link risorse">
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
                      aria-label={`Vai a ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Seguici</h4>

            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              <a
                href="https://linkedin.com/company/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                aria-label="Segui QuickFy su LinkedIn (apre in una nuova scheda)"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                aria-label="Segui QuickFy su Twitter (apre in una nuova scheda)"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

            {/* Legal Links */}
            <nav aria-label="Link legali">
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
                  >
                    {t('footer.links.privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded"
                  >
                    {t('footer.links.terms')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border gap-4">
          <p className="text-muted-foreground text-sm text-center sm:text-left order-2 sm:order-1">
            {t('footer.copyright')}
          </p>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 min-h-[56px] min-w-[56px] px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 order-1 sm:order-2 touch-manipulation"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Torna in cima alla pagina"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium">Torna su</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
