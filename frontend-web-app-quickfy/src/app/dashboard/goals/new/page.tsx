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
import type { GoalPeriod } from "@/types";

const goalFormSchema = z.object({
  name: z.string().min(3, {
    message: "Il nome deve essere lungo almeno 3 caratteri.",
  }).max(100, {
    message: "Il nome non può superare 100 caratteri.",
  }),
  description: z.string().min(10, {
    message: "La descrizione deve essere lunga almeno 10 caratteri.",
  }).max(500, {
    message: "La descrizione non può superare 500 caratteri.",
  }),
  metric: z.string().min(2, {
    message: "La metrica deve essere specificata.",
  }).max(50, {
    message: "La metrica non può superare 50 caratteri.",
  }),
  targetValue: z.coerce.number().positive({
    message: "Il valore target deve essere maggiore di zero.",
  }),
  period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"], {
    required_error: "Seleziona un periodo.",
  }),
  startDate: z.string().min(1, {
    message: "La data di inizio è obbligatoria.",
  }),
  endDate: z.string().min(1, {
    message: "La data di fine è obbligatoria.",
  }),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: "La data di fine deve essere successiva alla data di inizio.",
  path: ["endDate"],
});

type GoalFormValues = z.infer<typeof goalFormSchema>;

const periodLabels: Record<GoalPeriod, string> = {
  daily: "Giornaliero",
  weekly: "Settimanale",
  monthly: "Mensile",
  quarterly: "Trimestrale",
  yearly: "Annuale",
};

export default function NewGoalPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name: "",
      description: "",
      metric: "",
      targetValue: 0,
      period: "monthly",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
    },
  });

  async function onSubmit(values: GoalFormValues) {
    setIsSubmitting(true);
    try {
      await apiClient.createGoal(values);

      toast({
        title: "Obiettivo creato con successo!",
        description: "Il tuo obiettivo è stato aggiunto e puoi ora monitorarlo.",
      });

      router.push("/dashboard/goals");
    } catch (error) {
      console.error("Errore nella creazione dell'obiettivo:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la creazione dell'obiettivo. Riprova.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/goals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Nuovo Obiettivo</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Crea un nuovo obiettivo aziendale da monitorare
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dettagli Obiettivo</CardTitle>
          <CardDescription>
            Compila tutti i campi per creare un nuovo obiettivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Obiettivo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Es: Aumentare le vendite online"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Un nome chiaro e descrittivo dell'obiettivo
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
                        placeholder="Descrivi l'obiettivo e come verrà misurato..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Fornisci maggiori dettagli sull'obiettivo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="metric"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metrica</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Es: Numero di vendite, Fatturato €"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        L'unità di misura dell'obiettivo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valore Target</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Es: 1000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Il valore da raggiungere
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Periodo di Misurazione</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona un periodo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(periodLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Ogni quanto verrà misurato l'obiettivo?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Inizio</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Quando inizia l'obiettivo?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Fine</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Quando termina l'obiettivo?
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
                  Crea Obiettivo
                </Button>
                <Link href="/dashboard/goals" className="w-full sm:w-auto">
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
