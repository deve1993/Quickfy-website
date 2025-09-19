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

// Create validation schema function to support i18n
const createContactFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
  name: z.string().min(2, t('contact.form.validation.name')),
  email: z.string().email(t('contact.form.validation.email')),
  company: z.string().min(2, t('contact.form.validation.company')),
  phone: z.string().min(10, t('contact.form.validation.phone')),
  message: z.string().min(10, t('contact.form.validation.message')),
  privacy: z.boolean().refine((val) => val === true, t('contact.form.validation.privacy')),
});

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  privacy: boolean;
};

export function ContactForm() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { success, error } = useToastHelpers();

  // Create schema with translations
  const contactFormSchema = createContactFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange' // Real-time validation for better UX
  });

  const privacyAccepted = watch('privacy');

  // Calculate progress starting from 0% - only count fields with actual values
  const watchedValues = watch();
  const filledFields = [
    watchedValues.name?.trim(),
    watchedValues.email?.trim(),
    watchedValues.company?.trim(),
    watchedValues.phone?.trim(),
    watchedValues.message?.trim()
  ].filter(value => value && value !== '').length;

  // Add privacy checkbox only if it's explicitly accepted (true)
  const privacyCount = watchedValues.privacy === true ? 1 : 0;
  const totalFilledFields = filledFields + privacyCount;

  const progressPercentage = Math.round((totalFilledFields / 6) * 100);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', data);
      setSubmitStatus('success');
      success(
        t('contact.success.title'),
        t('contact.success.message'),
        {
          label: t('contact.form.submitAnother'),
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
        t('contact.form.error.title'),
        t('contact.form.error.message'),
        {
          label: t('contact.form.error.retry'),
          onClick: () => setSubmitStatus('idle')
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {t('contact.success.title')}
          </h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t('contact.success.message')}
          </p>
          <motion.button
            onClick={() => setSubmitStatus('idle')}
            className="px-8 py-4 border-2 border-blue-300 hover:border-blue-500 bg-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact.form.submitAnother')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Social Proof Data - CARDLESS LAYOUT WITH RAISED EFFECTS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
      >
        {/* 24H Response */}
        <motion.div
          whileHover={{ y: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-center p-6 transition-all duration-300 hover:shadow-lg rounded-xl"
        >
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            24H
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {t('contact.socialProof.response')}
          </div>
        </motion.div>

        {/* 500+ Clients */}
        <motion.div
          whileHover={{ y: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-center p-6 transition-all duration-300 hover:shadow-lg rounded-xl"
        >
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            500+
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {t('contact.socialProof.clients')}
          </div>
        </motion.div>

        {/* ROI Guaranteed */}
        <motion.div
          whileHover={{ y: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-center p-6 transition-all duration-300 hover:shadow-lg rounded-xl"
        >
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
            ROI
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {t('contact.socialProof.roi')}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Form with Enhanced UX */}
      <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">{t('contact.form.progress.label')}</span>
            <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6" noValidate aria-label={t('contact.form.ariaLabel')}>
          {/* Enhanced input fields with placeholders only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <Input
                id="name"
                {...register('name')}
                placeholder={t('contact.form.fields.name.placeholder')}
                className={cn(
                  'h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-xl',
                  errors.name && 'border-red-400 focus:border-red-500',
                  watch('name') && !errors.name && 'border-green-400'
                )}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <motion.p
                  id="name-error"
                  role="alert"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Input
                id="email"
                {...register('email')}
                type="email"
                placeholder={t('contact.form.fields.email.placeholder')}
                className={cn(
                  'h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-xl',
                  errors.email && 'border-red-400 focus:border-red-500',
                  watch('email') && !errors.email && 'border-green-400'
                )}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <motion.p
                  id="email-error"
                  role="alert"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <Input
                id="company"
                {...register('company')}
                placeholder={t('contact.form.fields.company.placeholder')}
                className={cn(
                  'h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-xl',
                  errors.company && 'border-red-400 focus:border-red-500',
                  watch('company') && !errors.company && 'border-green-400'
                )}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? 'company-error' : undefined}
                autoComplete="organization"
              />
              {errors.company && (
                <motion.p
                  id="company-error"
                  role="alert"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.company.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <Input
                id="phone"
                {...register('phone')}
                type="tel"
                placeholder={t('contact.form.fields.phone.placeholder')}
                className={cn(
                  'h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-xl',
                  errors.phone && 'border-red-400 focus:border-red-500',
                  watch('phone') && !errors.phone && 'border-green-400'
                )}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
              />
              {errors.phone && (
                <motion.p
                  id="phone-error"
                  role="alert"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone.message}
                </motion.p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Textarea
              id="message"
              {...register('message')}
              placeholder={t('contact.form.fields.message.placeholder')}
              rows={5}
              className={cn(
                'text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 rounded-xl resize-none',
                errors.message && 'border-red-400 focus:border-red-500',
                watch('message') && !errors.message && 'border-green-400'
              )}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <motion.p
                id="message-error"
                role="alert"
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4" />
                {errors.message.message}
              </motion.p>
            )}
          </motion.div>

          {/* Enhanced Privacy Checkbox */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <Checkbox
              id="privacy"
              {...register('privacy')}
              className="mt-1 w-5 h-5"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? 'privacy-error' : undefined}
            />
            <div className="flex-1">
              <label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                {t('contact.form.privacy')}
              </label>
              {errors.privacy && (
                <motion.p
                  id="privacy-error"
                  role="alert"
                  className="mt-1 text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.privacy.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{t('contact.form.error.message')}</span>
            </motion.div>
          )}

          {/* Enhanced Submit Button with Conversion Optimization */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !privacyAccepted}
            className={cn(
              "group relative overflow-hidden w-full h-16 rounded-2xl text-white font-bold text-xl shadow-2xl transition-all duration-500 transform focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2",
              isValid && privacyAccepted
                ? "bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-500 hover:scale-105 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            )}
            whileHover={{
              scale: !isSubmitting && privacyAccepted && isValid ? 1.02 : 1,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.6)"
            }}
            whileTap={{ scale: !isSubmitting && privacyAccepted && isValid ? 0.98 : 1 }}
            aria-label={isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />

            {/* Button content */}
            <div className="relative flex items-center justify-center space-x-4">
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                    aria-hidden="true"
                  />
                  <span>{t('contact.form.submitting')}</span>
                </>
              ) : (
                <>
                  <span className="tracking-wide">{t('contact.form.submit')}</span>
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Send className="w-6 h-6" aria-hidden="true" />
                  </motion.div>
                </>
              )}
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 -z-10 transition-opacity duration-500" />
          </motion.button>

          {/* Conversion-focused footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center pt-4"
          >
            <p className="text-sm text-gray-500">
              {t('contact.form.footer.security')}
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}