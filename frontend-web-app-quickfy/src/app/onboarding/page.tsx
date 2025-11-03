"use client";

import { useMachine } from "@xstate/react";
import { useRouter } from "next/navigation";
import { onboardingMachine } from "@/lib/machines/onboardingMachine";
import { PlanSelection } from "@/components/onboarding/PlanSelection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [state, send] = useMachine(onboardingMachine);

  // Quando l'onboarding è completo, redirect alla dashboard
  if (state.matches('complete')) {
    router.push('/dashboard');
    return null;
  }

  const canGoBack = !state.matches('welcome') && !state.matches('complete');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {canGoBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => send({ type: 'BACK' })}
          className="mb-4 md:mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Indietro
        </Button>
      )}

      <div className="flex items-center justify-center">
        {state.matches('welcome') && (
          <div className="text-center max-w-2xl px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Benvenuto in Quickfy!
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8">
              La piattaforma all-in-one per gestire analytics, recensioni,
              social media e campagne marketing.
            </p>
            <Button size="lg" onClick={() => send({ type: 'NEXT' })} className="w-full sm:w-auto">
              Inizia
            </Button>
          </div>
        )}

        {state.matches('selectPlan') && (
          <PlanSelection
            onSelectPlan={(plan) => send({ type: 'SELECT_PLAN', plan })}
          />
        )}

        {state.matches('signup') && (
          <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Crea il tuo account</h2>
            <p className="text-muted-foreground mb-4">
              Piano selezionato: <strong>{state.context.plan}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Form di registrazione in costruzione...
            </p>
            <Button
              className="mt-4"
              onClick={() =>
                send({
                  type: 'SUBMIT_SIGNUP',
                  data: {
                    name: 'Demo User',
                    email: 'demo@example.com',
                    password: 'password123',
                  },
                })
              }
            >
              Continua (Demo)
            </Button>
          </div>
        )}

        {state.matches('createWorkspace') && (
          <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Crea il tuo workspace</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Form workspace in costruzione...
            </p>
            <Button
              onClick={() =>
                send({ type: 'SUBMIT_WORKSPACE', name: 'My Workspace' })
              }
            >
              Continua (Demo)
            </Button>
          </div>
        )}

        {state.matches('billing') && (
          <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Informazioni di fatturazione</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Form billing in costruzione...
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => send({ type: 'SKIP_BILLING' })}>
                Salta per ora
              </Button>
              <Button
                onClick={() =>
                  send({
                    type: 'SUBMIT_BILLING',
                    data: {
                      companyName: 'Demo Company',
                      address: 'Via Demo 1',
                      city: 'Milano',
                      postalCode: '20100',
                      country: 'IT',
                    },
                  })
                }
              >
                Completa
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <div className="flex gap-2">
          {['welcome', 'selectPlan', 'signup', 'createWorkspace', 'billing'].map(
            (step, index) => {
              const steps = ['welcome', 'selectPlan', 'signup', 'createWorkspace', 'billing'];
              const currentIndex = steps.indexOf(state.value as string);
              const isActive = state.value === step;
              const isCompleted = index < currentIndex;

              return (
                <div
                  key={step}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    isActive
                      ? 'bg-primary'
                      : isCompleted
                      ? 'bg-primary/50'
                      : 'bg-gray-300'
                  }`}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
