import { createMachine, assign } from 'xstate';
import type { PlanType, SignupData, BillingInfo } from '@/types';

export interface OnboardingContext {
  plan?: PlanType;
  userData?: SignupData;
  workspaceName?: string;
  billingInfo?: BillingInfo;
  error?: string;
}

export type OnboardingEvent =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SELECT_PLAN'; plan: PlanType }
  | { type: 'SUBMIT_SIGNUP'; data: SignupData }
  | { type: 'SUBMIT_WORKSPACE'; name: string }
  | { type: 'SUBMIT_BILLING'; data: BillingInfo }
  | { type: 'SKIP_BILLING' };

export const onboardingMachine = createMachine(
  {
    id: 'onboarding',
    initial: 'welcome',
    context: {
      plan: undefined,
      userData: undefined,
      workspaceName: undefined,
      billingInfo: undefined,
      error: undefined,
    } as OnboardingContext,
    states: {
      welcome: {
        on: {
          NEXT: 'selectPlan',
        },
      },
      selectPlan: {
        on: {
          SELECT_PLAN: {
            target: 'signup',
            actions: 'setPlan',
          },
          BACK: 'welcome',
        },
      },
      signup: {
        on: {
          SUBMIT_SIGNUP: {
            target: 'createWorkspace',
            actions: 'setUserData',
          },
          BACK: 'selectPlan',
        },
      },
      createWorkspace: {
        on: {
          SUBMIT_WORKSPACE: {
            target: 'billing',
            actions: 'setWorkspaceName',
          },
          BACK: 'signup',
        },
      },
      billing: {
        on: {
          SUBMIT_BILLING: {
            target: 'complete',
            actions: 'setBillingInfo',
          },
          SKIP_BILLING: {
            target: 'complete',
          },
          BACK: 'createWorkspace',
        },
      },
      complete: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      setPlan: assign({
        plan: ({ event }) => ('plan' in event ? event.plan : undefined),
      }),
      setUserData: assign({
        userData: ({ event }) =>
          'data' in event && event.type === 'SUBMIT_SIGNUP' ? event.data : undefined,
      }),
      setWorkspaceName: assign({
        workspaceName: ({ event }) => ('name' in event ? event.name : undefined),
      }),
      setBillingInfo: assign({
        billingInfo: ({ event }) =>
          'data' in event && event.type === 'SUBMIT_BILLING' ? event.data : undefined,
      }),
    },
  }
);
