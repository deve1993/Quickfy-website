'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { workspaceSchema, type WorkspaceFormData } from '@/lib/validations/onboarding';
import { generateSlug } from '@/lib/utils/slug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface WorkspaceFormProps {
  onSubmit: (data: WorkspaceFormData & { slug: string }) => void;
  initialData?: Partial<WorkspaceFormData>;
}

export function WorkspaceForm({ onSubmit, initialData }: WorkspaceFormProps) {
  const form = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
    },
  });

  const workspaceName = form.watch('name');
  const slug = React.useMemo(() => {
    if (!workspaceName) return '';
    return generateSlug(workspaceName);
  }, [workspaceName]);

  const handleSubmit = async (data: WorkspaceFormData) => {
    // Simula API call con delay di 2 secondi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log dati per debug
    console.group('🏢 Workspace Data');
    console.log('Nome:', data.name);
    console.log('Slug:', slug);
    console.log('Descrizione:', data.description || '(vuota)');
    console.groupEnd();

    onSubmit({ ...data, slug });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Nome workspace */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome workspace</FormLabel>
              <FormControl>
                <Input
                  placeholder="La mia azienda"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Questo è il nome del tuo workspace che vedrai nella dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug auto-generato (readonly) */}
        {slug && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">URL del tuo workspace:</p>
            <p className="text-sm text-gray-600 font-mono">
              quickfy.app/<span className="text-primary font-semibold">{slug}</span>
            </p>
          </div>
        )}

        {/* Descrizione (opzionale) */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Descrizione <span className="text-gray-400 font-normal">(opzionale)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrivi brevemente il tuo workspace..."
                  className="resize-none"
                  rows={3}
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Max 200 caratteri. Questa descrizione è per uso interno.
              </FormDescription>
              <FormMessage />
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
              Creazione workspace...
            </>
          ) : (
            'Crea workspace'
          )}
        </Button>
      </form>
    </Form>
  );
}
