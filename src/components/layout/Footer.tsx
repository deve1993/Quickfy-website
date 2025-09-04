'use client';

import { useTranslations } from 'next-intl';
import { BarChart3, Mail, Phone, MapPin, ArrowUp, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhoneLink } from '../ui/PhoneLink';

export function Footer() {
  const t = useTranslations();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickLinks = [
    { label: 'Funzionalità', sectionId: 'features' },
    { label: 'Vantaggi', sectionId: 'benefits' },
    { label: 'Prezzi', sectionId: 'pricing' },
    { label: 'Testimonianze', sectionId: 'testimonials' },
    { label: 'Contatti', sectionId: 'contact' }
  ];

  return (
    <footer id="footer" className="bg-secondary border-t border-border py-16 px-4" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-primary" size={32} aria-hidden="true" />
              <h3 className="text-2xl font-bold text-foreground">QuickFy Performance Suite</h3>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:info@quickfy.com" 
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Invia email a QuickFy"
                >
                  info@quickfy.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <PhoneLink 
                  phoneNumber="+390123456789"
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  ariaLabel="Chiama QuickFy"
                >
                  +39 012 345 6789
                </PhoneLink>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>Milano, Italia</span>
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
                    <button
                      onClick={() => scrollToSection(link.sectionId)}
                      className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded text-left"
                      aria-label={`Vai alla sezione ${link.label}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Seguici</h4>
            
            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              <a
                href="https://linkedin.com/company/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Segui QuickFy su LinkedIn (apre in una nuova scheda)"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/quickfy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Segui QuickFy su Twitter (apre in una nuova scheda)"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            
            {/* Legal Links */}
            <nav aria-label="Link legali">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link 
                    href="/privacy-policy" 
                    className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {t('footer.links.privacy')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms-of-service" 
                    className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {t('footer.links.terms')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            {t('footer.copyright')}
          </p>
          
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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