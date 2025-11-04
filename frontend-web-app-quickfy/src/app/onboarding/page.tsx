"use client";

import { useMachine } from "@xstate/react";
import { useRouter } from "next/navigation";
import { onboardingMachine } from "@/lib/machines/onboardingMachine";
import { PlanSelection } from "@/components/onboarding/PlanSelection";
import { SignupForm } from "@/components/onboarding/SignupForm";
import { WorkspaceForm } from "@/components/onboarding/WorkspaceForm";
import { BillingForm } from "@/components/onboarding/BillingForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";
import type { SignupFormData } from "@/lib/validations/onboarding";
import type { WorkspaceFormData } from "@/lib/validations/onboarding";
import type { BillingFormData } from "@/lib/validations/onboarding";

export default function OnboardingPage() {
  const router = useRouter();
  const [state, send] = useMachine(onboardingMachine);
  const toast = useToastStore();

  // Quando l'onboarding è completo, redirect alla dashboard
  if (state.matches('complete')) {
    router.push('/dashboard');
    return null;
  }

  const canGoBack = !state.matches('welcome') && !state.matches('complete');

  const handleSignupSubmit = (data: SignupFormData) => {
    toast.success('Account creato con successo!');
    send({ type: 'SUBMIT_SIGNUP', data });
  };

  const handleWorkspaceSubmit = (data: WorkspaceFormData & { slug: string }) => {
    toast.success('Workspace creato con successo!');
    send({ type: 'SUBMIT_WORKSPACE', name: data.name });
  };

  const handleBillingSubmit = (data: BillingFormData) => {
    toast.success('Informazioni di fatturazione salvate!');
    send({ type: 'SUBMIT_BILLING', data });
  };

  const handleBillingSkip = () => {
    toast.info('Trial di 14 giorni attivato!');
    send({ type: 'SKIP_BILLING' });
  };

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
            <SignupForm
              onSubmit={handleSignupSubmit}
              initialData={state.context.userData}
            />
          </div>
        )}

        {state.matches('createWorkspace') && (
          <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Crea il tuo workspace</h2>
            <WorkspaceForm
              onSubmit={handleWorkspaceSubmit}
              initialData={{
                name: state.context.workspaceName || '',
                description: '',
              }}
            />
          </div>
        )}

        {state.matches('billing') && (
          <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Informazioni di fatturazione</h2>
            <BillingForm
              onSubmit={handleBillingSubmit}
              onSkip={handleBillingSkip}
              initialData={state.context.billingInfo}
            />
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
