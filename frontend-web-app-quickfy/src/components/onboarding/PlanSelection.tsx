import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlanType } from "@/types";

interface PlanSelectionProps {
  onSelectPlan: (plan: PlanType) => void;
}

const plans = [
  {
    name: 'Starter',
    value: 'starter' as PlanType,
    price: '€29',
    description: 'Per iniziare',
    features: [
      'Dashboard Analytics',
      'Sistema Ticketing',
      'Obiettivi e KPI',
      'Campagne Google Ads',
      'Supporto email',
    ],
  },
  {
    name: 'Plus',
    value: 'plus' as PlanType,
    price: '€79',
    description: 'Per crescere',
    popular: true,
    features: [
      'Tutto in Starter',
      'Gestione Recensioni AI',
      'Analisi Sentiment',
      'Suggerimenti risposte automatiche',
      'Report avanzati',
      'Supporto prioritario',
    ],
  },
  {
    name: 'Pro',
    value: 'pro' as PlanType,
    price: '€149',
    description: 'Per professionisti',
    features: [
      'Tutto in Plus',
      'Social Media Management',
      'Content Generator AI',
      'Chatbot intelligente',
      'Multi-piattaforma',
      'API Access',
      'Supporto dedicato 24/7',
    ],
  },
];

export function PlanSelection({ onSelectPlan }: PlanSelectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Scegli il tuo piano</h1>
        <p className="text-lg text-muted-foreground">
          Inizia con una prova gratuita di 14 giorni. Nessuna carta richiesta.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.value}
            className={`relative ${
              plan.popular ? 'border-primary shadow-lg scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Più popolare
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/mese</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => onSelectPlan(plan.value)}
              >
                Scegli {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
