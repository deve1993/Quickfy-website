'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Clock, Users, TrendingUp } from 'lucide-react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useToastHelpers } from '@/components/ui/toast';
import { useMotionPreference } from '@/hooks/usePerformance';
import { useRateLimit } from '@/hooks/useRateLimit';
import { sanitizeObject } from '@/lib/sanitize';
import { trackFormSubmit } from '@/lib/analytics';
import { useSearchParams } from 'next/navigation';

// Create validation schema function to support i18n
const createContactFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
  name: z.string().min(2, t('contact.form.validation.name')),
  email: z.string().email(t('contact.form.validation.email')),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, t('contact.form.validation.message')),
  privacy: z.boolean().refine((val) => val === true, t('contact.form.validation.privacy')),
});

type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  privacy: boolean;
};

export function ContactForm() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { success, error } = useToastHelpers();
  const { motionConfig, shouldReduceMotion } = useMotionPreference();

  // Rate limiting: 3 submissions per minute
  const { isAllowed, remainingRequests: _remainingRequests, resetTime } = useRateLimit({
    maxRequests: 3,
    timeWindow: 60000 // 1 minute
  });

  // Create schema with translations
  const contactFormSchema = createContactFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    control
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange' // Real-time validation for better UX
  });

  // Pre-fill form from URL parameters
  useEffect(() => {
    if (!searchParams) return;

    const plan = searchParams.get('plan');
    const utm_source = searchParams.get('utm_source');
    const utm_campaign = searchParams.get('utm_campaign');
    const message = searchParams.get('message');

    let prefillMessage = '';

    if (message) {
      // Direct message from URL
      prefillMessage = decodeURIComponent(message);
    } else if (plan) {
      // From pricing plan selection
      prefillMessage = `Sono interessato al piano ${plan}. Vorrei saperne di più sui dettagli e i vantaggi.`;
    } else if (utm_source || utm_campaign) {
      // From marketing campaign
      prefillMessage = `Ho visto la vostra campagna e vorrei avere maggiori informazioni.`;
    }

    if (prefillMessage) {
      setValue('message', prefillMessage, { shouldValidate: true });
    }
  }, [searchParams, setValue]);


  const watchedValues = watch();

  // Memoize progress calculation to prevent unnecessary re-renders
  const progressPercentage = useMemo(() => {
    const requiredFields = [
      watchedValues.name?.trim(),
      watchedValues.email?.trim(),
      watchedValues.message?.trim()
    ].filter(value => value && value !== '').length;

    const optionalFields = [
      watchedValues.company?.trim(),
      watchedValues.phone?.trim()
    ].filter(value => value && value !== '').length;

    // Add privacy checkbox only if it's explicitly accepted (true)
    const privacyCount = watchedValues.privacy === true ? 1 : 0;
    const totalFilledFields = requiredFields + optionalFields + privacyCount;

    return Math.round((totalFilledFields / 6) * 100);
  }, [watchedValues]);

  const privacyAccepted = watchedValues.privacy;

  const onSubmit = async (data: ContactFormData) => {
    // Check rate limit
    if (!isAllowed()) {
      const waitTime = resetTime();
      const waitSeconds = waitTime ? Math.ceil(waitTime / 1000) : 60;
      error(
        t('contact.form.errors.rateLimit.title') || 'Troppi tentativi',
        t('contact.form.errors.rateLimit.message') || `Hai raggiunto il limite di invii. Riprova tra ${waitSeconds} secondi.`
      );
      return;
    }

    // Sanitize all input data to prevent XSS attacks
    const _sanitizedData = sanitizeObject(data);

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call using _sanitizedData
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(_sanitizedData) })
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Form submitted successfully
      setSubmitStatus('success');

      // Track successful form submission
      trackFormSubmit('contact_form', {
        has_company: !!data.company,
        has_phone: !!data.phone,
        message_length: data.message.length
      });

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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-transparent ring-2 ring-green-400/50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon with Pulsing Ring */}
          <div className="relative inline-block mb-6">
            <motion.div
              className="absolute inset-0 rounded-full ring-4 ring-green-400/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
          </div>

          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            {t('contact.success.title')}
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {t('contact.success.message')}
          </p>
          <motion.button
            onClick={() => setSubmitStatus('idle')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl border-2 border-transparent ring-2 ring-blue-400/50 hover:ring-blue-500 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t('contact.form.submitAnother')}
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Social Proof Data - Enhanced with Ring Colors */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
      >
        {/* 24H Response */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
          transition={shouldReduceMotion ? {} : { type: "spring", stiffness: 300 }}
          className="text-center p-6 bg-white rounded-xl shadow-md border-2 border-transparent ring-2 ring-blue-400/50 hover:ring-blue-500 transition-all duration-300"
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            24H
          </div>
          <div className="text-sm text-slate-600 font-medium">
            {t('contact.form.socialProof.response')}
          </div>
        </motion.div>

        {/* 500+ Clients */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
          transition={shouldReduceMotion ? {} : { type: "spring", stiffness: 300 }}
          className="text-center p-6 bg-white rounded-xl shadow-md border-2 border-transparent ring-2 ring-green-400/50 hover:ring-green-500 transition-all duration-300"
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            500+
          </div>
          <div className="text-sm text-slate-600 font-medium">
            {t('contact.form.socialProof.clients')}
          </div>
        </motion.div>

        {/* ROI Guaranteed */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
          transition={shouldReduceMotion ? {} : { type: "spring", stiffness: 300 }}
          className="text-center p-6 bg-white rounded-xl shadow-md border-2 border-transparent ring-2 ring-purple-400/50 hover:ring-purple-500 transition-all duration-300"
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
            ROI
          </div>
          <div className="text-sm text-slate-600 font-medium">
            {t('contact.form.socialProof.roi')}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Form with Enhanced UX */}
      <motion.div
        whileHover={shouldReduceMotion ? {} : { y: -4 }}
        transition={shouldReduceMotion ? {} : { type: "spring", stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl border-2 border-transparent ring-2 ring-blue-400/50 hover:ring-blue-500 transition-all duration-300 overflow-hidden"
      >
        {/* Progress Bar - Desktop */}
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
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>

        {/* Progress Bar - Mobile (Compact) */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-2 sm:hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-600">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8 space-y-6" noValidate aria-label={t('contact.form.ariaLabel')}>
          {/* Enhanced input fields with placeholders only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
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
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              className="relative"
            >
              <Input
                id="company"
                {...register('company')}
                placeholder={`${t('contact.form.fields.company.placeholder')} (Opzionale)`}
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
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="relative"
            >
              <Input
                id="phone"
                {...register('phone')}
                type="tel"
                placeholder={`${t('contact.form.fields.phone.placeholder')} (Opzionale)`}
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
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
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
            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl border-2 border-transparent ring-2 ring-slate-300 hover:ring-slate-400 transition-all duration-200"
          >
            <Controller
              name="privacy"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="privacy"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 w-6 h-6 sm:w-5 sm:h-5"
                  aria-invalid={!!errors.privacy}
                  aria-describedby={errors.privacy ? 'privacy-error' : undefined}
                />
              )}
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
              "group relative overflow-hidden w-full min-h-[44px] py-3 px-6 md:py-4 md:px-8 rounded-2xl text-white font-bold text-base sm:text-lg md:text-xl shadow-2xl transition-all duration-500 transform focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2",
              isValid && privacyAccepted
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 cursor-pointer"
                : "bg-slate-400 cursor-not-allowed"
            )}
            whileHover={shouldReduceMotion ? {} : {
              scale: !isSubmitting && privacyAccepted && isValid ? 1.02 : 1,
              y: !isSubmitting && privacyAccepted && isValid ? -4 : 0,
              boxShadow: "0 25px 50px -12px rgba(30, 64, 175, 0.6)"
            }}
            whileTap={shouldReduceMotion ? {} : { scale: !isSubmitting && privacyAccepted && isValid ? 0.98 : 1 }}
            aria-label={isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
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
      </motion.div>
    </div>
  );
}
