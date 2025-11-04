'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signupSchema, type SignupFormData } from '@/lib/validations/onboarding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { PasswordStrength } from '@/components/ui/PasswordStrength';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  initialData?: Partial<SignupFormData>;
}

export function SignupForm({ onSubmit, initialData }: SignupFormProps) {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = form.watch('password');

  const handleSubmit = async (data: SignupFormData) => {
    // Simula API call con delay di 2 secondi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log dati per debug (senza password)
    console.group('🔐 Signup Data');
    console.log('Nome:', data.name);
    console.log('Email:', data.email);
    console.log('Password:', '***hidden***');
    console.log('Termini accettati:', data.acceptTerms);
    console.groupEnd();

    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Nome completo */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mario Rossi"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="mario.rossi@example.com"
                  autoComplete="email"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />

              {/* Indicatore forza password */}
              {password && <PasswordStrength password={password} className="mt-2" />}
            </FormItem>
          )}
        />

        {/* Conferma Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conferma password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkbox termini e condizioni */}
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  Accetto i{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    termini e condizioni
                  </a>{' '}
                  e la{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    privacy policy
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Pulsante submit */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creazione account...
            </>
          ) : (
            'Crea account'
          )}
        </Button>
      </form>
    </Form>
  );
}
