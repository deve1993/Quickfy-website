/**
 * Lazy loaded components for code splitting
 * Reduces initial bundle size and improves performance
 */

import { lazy } from "react";

// Dashboard components - heavy charts and data visualization
export const SessionsChart = lazy(() =>
  import("@/components/dashboard/SessionsChart").then((mod) => ({
    default: mod.SessionsChart,
  }))
);

export const TrafficSourcesTable = lazy(() =>
  import("@/components/dashboard/TrafficSourcesTable").then((mod) => ({
    default: mod.TrafficSourcesTable,
  }))
);

export const TopPagesTable = lazy(() =>
  import("@/components/dashboard/TopPagesTable").then((mod) => ({
    default: mod.TopPagesTable,
  }))
);

// Heavy feature components
export const Chatbot = lazy(() =>
  import("@/components/chatbot").then((mod) => ({
    default: mod.Chatbot,
  }))
);

// Forms - typically heavy with validation
// TODO: Uncomment when form components are created
// export const TicketForm = lazy(() =>
//   import("@/components/forms/TicketForm").then((mod) => ({
//     default: mod.TicketForm,
//   })).catch(() => ({ default: () => null })) // Fallback if doesn't exist
// );

// export const GoalForm = lazy(() =>
//   import("@/components/forms/GoalForm").then((mod) => ({
//     default: mod.GoalForm,
//   })).catch(() => ({ default: () => null }))
// );
