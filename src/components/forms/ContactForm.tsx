'use client';

import { useState, useMemo } from 'react';
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
import { useMotionPreference } from '@/hooks/usePerformance';

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
  const { motionConfig, shouldReduceMotion } = useMotionPreference();

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

  const watchedValues = watch();

  // Memoize progress calculation to prevent unnecessary re-renders
  const progressPercentage = useMemo(() => {
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

    return Math.round((totalFilledFields / 6) * 100);
  }, [watchedValues]);

  const privacyAccepted = watchedValues.privacy;

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Form submitted successfully
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
    } catch {
      // Handle form submission error
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
      <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-slate-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            {t('contact.success.title')}
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {t('contact.success.message')}
          </p>
          <motion.button
            onClick={() => setSubmitStatus('idle')}
            className="px-8 py-4 border-2 border-blue-500 hover:border-purple-600 bg-transparent hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-blue-700 hover:text-purple-800 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
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
          whileHover={shouldReduceMotion ? {} : { y: -8, scale: motionConfig.scale }}
          transition={shouldReduceMotion ? {} : { type: "spring", stiffness: 300, duration: motionConfig.duration }}
          className="text-center p-3 sm:p-6 transition-all duration-300 hover:shadow-lg rounded-xl"
        >
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            24H
          </div>
          <div className="text-sm text-slate-600 font-medium">
            {t('contact.form.socialProof.response')}
          </div>
        </motion.div>

        {/* 500+ Clients */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -8, scale: motionConfig.scale }}
          transition={shouldReduceMotion ? {} : { type: "spring", stiffness: 300, duration: motionConfig.duration }}
          className="text-center p-3 sm:p-6 transition-all duration-300 hover:shadow-lg rounded-xl"
        >
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            500+
          </div>
          <div className="text-sm text-slate-600 font-medium">
            {t('contact.form.socialProof.clients')}
          </div>
        </motion.div>

        {/* ROI Guaranteed */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -8, scale: motionConfig.scale }}
          transition={shouldReduceMotion ? {} : { type: "spring", stiffness: 300, duration: motionConfig.duration }}
          className="text-center p-3 sm:p-6 transition-all duration-300 hover:shadow-lg rounded-xl"
        >
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ROI
          </div>
          <div className="text-sm text-slate-600 font-medium">
            {t('contact.form.socialProof.roi')}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Form with Enhanced UX */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-300 hover:border-slate-400 transition-colors duration-300 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 sm:p-4 hidden sm:block">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">{t('contact.form.progress.label')}</span>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
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
                  'h-12 sm:h-14 text-base sm:text-lg border-2 border-slate-300 hover:border-slate-400 focus:border-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 transition-all duration-300 rounded-xl',
                  errors.name && 'border-red-400 focus:border-red-500',
                  watchedValues.name && !errors.name && 'border-green-400'
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
                  'h-12 sm:h-14 text-base sm:text-lg border-2 border-slate-300 hover:border-slate-400 focus:border-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 transition-all duration-300 rounded-xl',
                  errors.email && 'border-red-400 focus:border-red-500',
                  watchedValues.email && !errors.email && 'border-green-400'
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
                  'h-12 sm:h-14 text-base sm:text-lg border-2 border-slate-300 hover:border-slate-400 focus:border-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 transition-all duration-300 rounded-xl',
                  errors.company && 'border-red-400 focus:border-red-500',
                  watchedValues.company && !errors.company && 'border-green-400'
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
                  'h-12 sm:h-14 text-base sm:text-lg border-2 border-slate-300 hover:border-slate-400 focus:border-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 transition-all duration-300 rounded-xl',
                  errors.phone && 'border-red-400 focus:border-red-500',
                  watchedValues.phone && !errors.phone && 'border-green-400'
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
                'text-base sm:text-lg border-2 border-slate-300 hover:border-slate-400 focus:border-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 transition-all duration-300 rounded-xl resize-none',
                errors.message && 'border-red-400 focus:border-red-500',
                watchedValues.message && !errors.message && 'border-green-400'
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
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border-2 border-slate-300 hover:border-slate-400 transition-colors duration-200"
          >
            <Checkbox
              id="privacy"
              {...register('privacy')}
              className="mt-1 w-5 h-5"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? 'privacy-error' : undefined}
            />
            <div className="flex-1">
              <label htmlFor="privacy" className="text-sm text-slate-700 leading-relaxed cursor-pointer">
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
              "group relative overflow-hidden w-full h-14 sm:h-16 rounded-2xl text-white font-bold text-lg sm:text-xl shadow-2xl transition-all duration-500 transform focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2",
              isValid && privacyAccepted
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 cursor-pointer"
                : "bg-slate-400 cursor-not-allowed"
            )}
            whileHover={shouldReduceMotion ? {} : {
              scale: !isSubmitting && privacyAccepted && isValid ? motionConfig.scale : 1,
              boxShadow: "0 25px 50px -12px rgba(30, 64, 175, 0.6)"
            }}
            whileTap={shouldReduceMotion ? {} : { scale: !isSubmitting && privacyAccepted && isValid ? 0.98 : 1 }}
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
            <p className="text-sm text-slate-500">
              {t('contact.form.footer.security')}
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
