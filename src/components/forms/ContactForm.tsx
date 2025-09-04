'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useToastHelpers } from '@/components/ui/toast';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  company: z.string().min(2, 'Il nome dell\'azienda deve contenere almeno 2 caratteri'),
  phone: z.string().min(10, 'Il numero di telefono deve contenere almeno 10 cifre'),
  message: z.string().min(10, 'Il messaggio deve contenere almeno 10 caratteri'),
  privacy: z.boolean().refine((val) => val === true, 'Devi accettare il trattamento dei dati personali'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { success, error } = useToastHelpers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur'
  });

  const privacyAccepted = watch('privacy');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      success(
        'Richiesta inviata con successo!',
        'Ti contatteremo entro 24 ore per programmare la tua consulenza gratuita.',
        {
          label: 'Invia un\'altra richiesta',
          onClick: () => {
            setSubmitStatus('idle');
            reset();
          }
        }
      );
      reset();
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
      error(
        'Errore nell\'invio della richiesta',
        'Si è verificato un problema. Riprova o contattaci direttamente.',
        {
          label: 'Riprova',
          onClick: () => setSubmitStatus('idle')
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t('contact.success.title')}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t('contact.success.message')}
          </p>
          <motion.button
            onClick={() => setSubmitStatus('idle')}
            className="px-6 py-3 border-2 border-gray-300 hover:border-blue-500 bg-transparent hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Invia Altra Richiesta
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-label="Modulo di contatto QuickFy">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="sr-only">{t('contact.form.fields.name.label')}</label>
            <Input
              id="name"
              {...register('name')}
              placeholder={t('contact.form.fields.name.placeholder')}
              className={cn(
                'h-12 border-input focus:border-primary focus:ring-primary',
                errors.name && 'border-destructive'
              )}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">{t('contact.form.fields.email.label')}</label>
            <Input
              id="email"
              {...register('email')}
              type="email"
              placeholder={t('contact.form.fields.email.placeholder')}
              className={cn(
                'h-12 border-input focus:border-primary focus:ring-primary',
                errors.email && 'border-destructive'
              )}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="sr-only">{t('contact.form.fields.company.label')}</label>
            <Input
              id="company"
              {...register('company')}
              placeholder={t('contact.form.fields.company.placeholder')}
              className={cn(
                'h-12 border-input focus:border-primary focus:ring-primary',
                errors.company && 'border-destructive'
              )}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? 'company-error' : undefined}
              autoComplete="organization"
            />
            {errors.company && (
              <p id="company-error" role="alert" className="mt-1 text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">{t('contact.form.fields.phone.label')}</label>
            <Input
              id="phone"
              {...register('phone')}
              type="tel"
              placeholder={t('contact.form.fields.phone.placeholder')}
              className={cn(
                'h-12 border-input focus:border-primary focus:ring-primary',
                errors.phone && 'border-destructive'
              )}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
            {errors.phone && (
              <p id="phone-error" role="alert" className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="sr-only">{t('contact.form.fields.message.label')}</label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder={t('contact.form.fields.message.placeholder')}
            rows={4}
            className={cn(
              'border-input focus:border-primary focus:ring-primary resize-none',
              errors.message && 'border-destructive'
            )}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-1 text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy"
            {...register('privacy')}
            className="mt-1"
            aria-invalid={!!errors.privacy}
            aria-describedby={errors.privacy ? 'privacy-error' : undefined}
          />
          <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
            {t('contact.form.privacy')}
          </label>
        </div>
        {errors.privacy && (
          <p id="privacy-error" role="alert" className="text-sm text-destructive">{errors.privacy.message}</p>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg"
          >
            <AlertCircle size={20} />
            <span>Si è verificato un errore. Riprova o contattaci direttamente.</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting || !privacyAccepted}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-500 focus:from-blue-500 focus:via-blue-600 focus:to-purple-500 w-full h-12 rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-2xl focus:shadow-2xl transition-all duration-500 transform hover:scale-105 focus:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ 
            scale: !isSubmitting && privacyAccepted ? 1.02 : 1,
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: !isSubmitting && privacyAccepted ? 0.98 : 1 }}
          aria-label={isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
        >
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Button content */}
          <div className="relative flex items-center justify-center space-x-3">
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  aria-hidden="true"
                />
                <span className="sr-only">{t('contact.form.submitting')}</span>
              </>
            ) : (
              <>
                <span className="tracking-wide">{t('contact.form.submit')}</span>
                <motion.div
                  className="flex items-center justify-center w-6 h-6"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Send className="w-5 h-5" aria-hidden="true" />
                </motion.div>
              </>
            )}
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 -z-10 transition-opacity duration-500" />
        </motion.button>
      </form>
    </div>
  );
}