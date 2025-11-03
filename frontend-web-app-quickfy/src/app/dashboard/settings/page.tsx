"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Building2, CreditCard, Bell, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Il nome deve essere lungo almeno 2 caratteri.",
  }),
  email: z.string().email({
    message: "Inserisci un'email valida.",
  }),
});

const workspaceFormSchema = z.object({
  name: z.string().min(2, {
    message: "Il nome del workspace deve essere lungo almeno 2 caratteri.",
  }),
});

// TODO: Implement notifications
// const notificationsFormSchema = z.object({
//   newReviews: z.boolean(),
//   urgentTickets: z.boolean(),
//   weeklyReports: z.boolean(),
// });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type WorkspaceFormValues = z.infer<typeof workspaceFormSchema>;
// type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export default function SettingsPage() {
  const { user, activeWorkspace } = useAuthStore();
  const { toast } = useToast();
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isWorkspaceSubmitting, setIsWorkspaceSubmitting] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const workspaceForm = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      name: activeWorkspace?.name || "",
    },
  });

  // TODO: Implement notifications form
  // const notificationsForm = useForm<NotificationsFormValues>({
  //   resolver: zodResolver(notificationsFormSchema),
  //   defaultValues: {
  //     newReviews: true,
  //     urgentTickets: true,
  //     weeklyReports: false,
  //   },
  // });

  async function onProfileSubmit(_values: ProfileFormValues) {
    setIsProfileSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Profilo aggiornato!",
        description: "Le modifiche al tuo profilo sono state salvate con successo.",
      });
    } catch (error) {
      console.error("Errore nell'aggiornamento del profilo:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio. Riprova.",
        variant: "error",
      });
    } finally {
      setIsProfileSubmitting(false);
    }
  }

  async function onWorkspaceSubmit(_values: WorkspaceFormValues) {
    setIsWorkspaceSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Workspace aggiornato!",
        description: "Le modifiche al workspace sono state salvate con successo.",
      });
    } catch (error) {
      console.error("Errore nell'aggiornamento del workspace:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio. Riprova.",
        variant: "error",
      });
    } finally {
      setIsWorkspaceSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Impostazioni</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Gestisci il tuo profilo e le preferenze dell'account
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profilo
          </CardTitle>
          <CardDescription>
            Aggiorna le informazioni del tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Ruolo</Label>
                <Input id="role" defaultValue={user?.role} disabled />
              </div>
              <Button type="submit" disabled={isProfileSubmitting}>
                {isProfileSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salva Modifiche
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Workspace Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Workspace
          </CardTitle>
          <CardDescription>
            Configurazione del workspace attivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...workspaceForm}>
            <form onSubmit={workspaceForm.handleSubmit(onWorkspaceSubmit)} className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <FormField
                  control={workspaceForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Workspace</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Label>Piano Attuale</Label>
                  <Input
                    defaultValue={activeWorkspace?.plan.toUpperCase()}
                    disabled
                    className="capitalize"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" disabled={isWorkspaceSubmitting} className="w-full sm:w-auto">
                  {isWorkspaceSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salva
                </Button>
                <Button type="button" variant="outline" className="w-full sm:w-auto">Gestisci Team</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Abbonamento
          </CardTitle>
          <CardDescription>
            Gestisci il tuo piano e la fatturazione
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg">
            <div>
              <p className="font-medium">Piano {activeWorkspace?.plan.toUpperCase()}</p>
              <p className="text-sm text-muted-foreground">
                Rinnovo automatico il 1° del prossimo mese
              </p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">Aggiorna Piano</Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto">Metodo di Pagamento</Button>
            <Button variant="outline" className="w-full sm:w-auto">Cronologia Fatture</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifiche
          </CardTitle>
          <CardDescription>
            Configura le tue preferenze di notifica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex-1">
              <p className="font-medium text-sm md:text-base">Nuove recensioni</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Ricevi notifiche per nuove recensioni
              </p>
            </div>
            <input type="checkbox" className="h-5 w-5 md:h-4 md:w-4" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex-1">
              <p className="font-medium text-sm md:text-base">Ticket urgenti</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Notifiche per ticket ad alta priorità
              </p>
            </div>
            <input type="checkbox" className="h-5 w-5 md:h-4 md:w-4" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex-1">
              <p className="font-medium text-sm md:text-base">Report settimanali</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Ricevi report sulle performance ogni lunedì
              </p>
            </div>
            <input type="checkbox" className="h-5 w-5 md:h-4 md:w-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
