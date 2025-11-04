'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { billingSchema, type BillingFormData } from '@/lib/validations/onboarding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface BillingFormProps {
  onSubmit: (data: BillingFormData) => void;
  onSkip: () => void;
  initialData?: Partial<BillingFormData>;
}

export function BillingForm({ onSubmit, onSkip, initialData }: BillingFormProps) {
  const form = useForm<BillingFormData>({
    resolver: zodResolver(billingSchema),
    defaultValues: initialData || {
      companyName: '',
      vatNumber: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'IT',
    },
  });

  const handleSubmit = async (data: BillingFormData) => {
    // Simula API call con delay di 2 secondi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log dati per debug
    console.group('💳 Billing Data');
    console.log('Ragione sociale:', data.companyName);
    console.log('P.IVA:', data.vatNumber || '(non fornita)');
    console.log('Indirizzo:', data.address);
    console.log('Città:', data.city);
    console.log('CAP:', data.postalCode);
    console.log('Paese:', data.country);
    console.groupEnd();

    onSubmit(data);
  };

  const handleSkip = () => {
    console.log('⏭️ Billing skipped - Trial mode activated');
    onSkip();
  };

  return (
    <div className="space-y-6">
      {/* Info trial */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Nota:</strong> Puoi saltare questo passaggio e iniziare con un trial di 14 giorni gratuito.
          Potrai aggiungere le informazioni di fatturazione in seguito.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Ragione sociale */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ragione sociale</FormLabel>
                <FormControl>
                  <Input
                    placeholder="La mia azienda S.r.l."
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Partita IVA (opzionale) */}
          <FormField
            control={form.control}
            name="vatNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Partita IVA <span className="text-gray-400 font-normal">(opzionale)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="IT12345678901"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Formato: IT seguito da 11 cifre (es. IT12345678901)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Indirizzo */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indirizzo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Via Roma 123"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Città e CAP - Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Città */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Città</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Milano"
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CAP */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CAP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="20100"
                      maxLength={5}
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Paese */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paese</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={form.formState.isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona paese" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IT">Italia</SelectItem>
                    <SelectItem value="CH">Svizzera</SelectItem>
                    <SelectItem value="SM">San Marino</SelectItem>
                    <SelectItem value="VA">Vaticano</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pulsanti - Skip e Submit */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={handleSkip}
              disabled={form.formState.isSubmitting}
            >
              Salta per ora
            </Button>
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                'Completa'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
