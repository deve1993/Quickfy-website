"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "@/lib/api/client";
import { useToast } from "@/hooks/use-toast";
import type { TicketPriority, TicketCategory } from "@/types";

const ticketFormSchema = z.object({
  subject: z.string().min(5, {
    message: "L'oggetto deve essere lungo almeno 5 caratteri.",
  }).max(200, {
    message: "L'oggetto non può superare 200 caratteri.",
  }),
  description: z.string().min(20, {
    message: "La descrizione deve essere lunga almeno 20 caratteri.",
  }).max(2000, {
    message: "La descrizione non può superare 2000 caratteri.",
  }),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    required_error: "Seleziona una priorità.",
  }),
  category: z.enum(["support", "bug", "feature", "question", "other"], {
    required_error: "Seleziona una categoria.",
  }),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

const priorityLabels: Record<TicketPriority, string> = {
  low: "Bassa",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};

const categoryLabels: Record<TicketCategory, string> = {
  support: "Supporto",
  bug: "Bug/Errore",
  feature: "Nuova Funzionalità",
  question: "Domanda",
  other: "Altro",
};

export default function NewTicketPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      subject: "",
      description: "",
      priority: "medium",
      category: "support",
    },
  });

  async function onSubmit(values: TicketFormValues) {
    setIsSubmitting(true);
    try {
      await apiClient.createTicket(values);

      toast({
        title: "Ticket creato con successo!",
        description: "Il tuo ticket è stato registrato e verrà gestito al più presto.",
      });

      router.push("/dashboard/tickets");
    } catch (error) {
      console.error("Errore nella creazione del ticket:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la creazione del ticket. Riprova.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tickets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Nuovo Ticket</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Crea una nuova richiesta di supporto o segnalazione
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dettagli Ticket</CardTitle>
          <CardDescription>
            Compila tutti i campi per creare un nuovo ticket
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Oggetto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descrivi brevemente il problema o la richiesta"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Un titolo chiaro e conciso del ticket
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrizione</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Fornisci tutti i dettagli necessari per gestire la richiesta..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Fornisci una descrizione dettagliata del problema o della richiesta
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priorità</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona una priorità" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(priorityLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Quanto è urgente questa richiesta?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona una categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Che tipo di richiesta è?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crea Ticket
                </Button>
                <Link href="/dashboard/tickets" className="w-full sm:w-auto">
                  <Button type="button" variant="outline" className="w-full">
                    Annulla
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
