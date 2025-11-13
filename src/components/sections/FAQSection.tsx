'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Zap, Shield, Clock, DollarSign } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
  icon: typeof HelpCircle;
  gradient: string;
  ringColor: string;
  hoverRingColor: string;
}

export function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: t('items.0.question'),
      answer: t('items.0.answer'),
      icon: HelpCircle,
      gradient: 'from-blue-500 to-cyan-500',
      ringColor: 'ring-blue-400/50',
      hoverRingColor: 'hover:ring-blue-500'
    },
    {
      question: t('items.1.question'),
      answer: t('items.1.answer'),
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      ringColor: 'ring-purple-400/50',
      hoverRingColor: 'hover:ring-purple-500'
    },
    {
      question: t('items.2.question'),
      answer: t('items.2.answer'),
      icon: Shield,
      gradient: 'from-green-500 to-emerald-500',
      ringColor: 'ring-green-400/50',
      hoverRingColor: 'hover:ring-green-500'
    },
    {
      question: t('items.3.question'),
      answer: t('items.3.answer'),
      icon: Clock,
      gradient: 'from-orange-500 to-red-500',
      ringColor: 'ring-orange-400/50',
      hoverRingColor: 'hover:ring-orange-500'
    },
    {
      question: t('items.4.question'),
      answer: t('items.4.answer'),
      icon: DollarSign,
      gradient: 'from-indigo-500 to-violet-500',
      ringColor: 'ring-indigo-400/50',
      hoverRingColor: 'hover:ring-indigo-500'
    }
  ];

  // Helper function to get background gradient class for open state
  const getOpenBgClass = (gradient: string): string => {
    const bgMap: Record<string, string> = {
      'from-blue-500 to-cyan-500': 'bg-gradient-to-br from-blue-50 to-cyan-50',
      'from-purple-500 to-pink-500': 'bg-gradient-to-br from-purple-50 to-pink-50',
      'from-green-500 to-emerald-500': 'bg-gradient-to-br from-green-50 to-emerald-50',
      'from-orange-500 to-red-500': 'bg-gradient-to-br from-orange-50 to-red-50',
      'from-indigo-500 to-violet-500': 'bg-gradient-to-br from-indigo-50 to-violet-50'
    };
    return bgMap[gradient] || '';
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="relative py-0 px-4 overflow-hidden">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                className={`rounded-xl shadow-md border-2 border-transparent overflow-hidden ring-2 transition-all duration-300 ${faq.ringColor} ${faq.hoverRingColor} ${isOpen ? `${getOpenBgClass(faq.gradient)} ring-4` : 'bg-white'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/* Numbered Badge */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${faq.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${faq.gradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Question */}
                  <span className="text-lg font-semibold text-slate-900 flex-1">
                    {faq.question}
                  </span>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="flex-shrink-0"
                  >
                    <div className={`${isOpen ? `bg-gradient-to-r ${faq.gradient} p-2 rounded-lg` : ''}`}>
                      <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-700 leading-relaxed ml-16">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">{t('ctaText')}</p>
          <motion.button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {t('ctaButton')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
