'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/forms/ContactForm';

export function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact" className="py-0 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30">
      <div className="max-w-6xl mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t('contact.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}