import {
  FileX,
  Search,
  Target,
  Star,
  Megaphone,
  Share2,
  AlertCircle,
  Inbox,
  Database
} from "lucide-react";
import { EmptyState } from "./EmptyState";

/** Empty state for no tickets */
export function NoTicketsEmptyState({ onCreateTicket }: { onCreateTicket?: () => void }) {
  return (
    <EmptyState
      icon={<Inbox className="h-16 w-16" />}
      title="Nessun Ticket"
      description="Non ci sono ancora ticket di supporto. Crea il tuo primo ticket per iniziare a gestire le richieste dei clienti."
      action={{
        label: "Crea Primo Ticket",
        onClick: onCreateTicket,
        href: onCreateTicket ? undefined : "/dashboard/tickets/new",
      }}
    />
  );
}

/** Empty state for no search results */
export function NoSearchResultsEmptyState({
  query,
  onClearSearch
}: {
  query?: string;
  onClearSearch?: () => void;
}) {
  return (
    <EmptyState
      icon={<Search className="h-16 w-16" />}
      title="Nessun Risultato"
      description={
        query
          ? `Nessun risultato trovato per "${query}". Prova con termini di ricerca diversi.`
          : "Nessun risultato trovato. Prova a modificare i filtri di ricerca."
      }
      action={
        onClearSearch
          ? { label: "Cancella Ricerca", onClick: onClearSearch }
          : undefined
      }
      showCard={false}
    />
  );
}

/** Empty state for no goals */
export function NoGoalsEmptyState({ onCreateGoal }: { onCreateGoal?: () => void }) {
  return (
    <EmptyState
      icon={<Target className="h-16 w-16" />}
      title="Nessun Obiettivo"
      description="Inizia a tracciare i tuoi progressi creando il tuo primo obiettivo aziendale."
      action={{
        label: "Crea Primo Obiettivo",
        onClick: onCreateGoal,
        href: onCreateGoal ? undefined : "/dashboard/goals/new",
      }}
    />
  );
}

/** Empty state for no reviews */
export function NoReviewsEmptyState() {
  return (
    <EmptyState
      icon={<Star className="h-16 w-16" />}
      title="Nessuna Recensione"
      description="Non hai ancora recensioni da gestire. Le recensioni dei tuoi clienti appariranno qui."
      showCard={false}
    />
  );
}

/** Empty state for no campaigns */
export function NoCampaignsEmptyState() {
  return (
    <EmptyState
      icon={<Megaphone className="h-16 w-16" />}
      title="Nessuna Campagna"
      description="Non hai ancora campagne Google Ads attive. Inizia a monitorare le tue campagne pubblicitarie."
      showCard={false}
    />
  );
}

/** Empty state for no social posts */
export function NoSocialPostsEmptyState() {
  return (
    <EmptyState
      icon={<Share2 className="h-16 w-16" />}
      title="Nessun Post"
      description="Non hai ancora post programmati. Usa l'AI Content Generator per creare contenuti ottimizzati."
      action={{
        label: "Genera Contenuto",
        onClick: () => console.log("Generate content"),
      }}
    />
  );
}

/** Empty state for errors */
export function ErrorEmptyState({
  title = "Errore di Caricamento",
  description = "Si è verificato un errore durante il caricamento dei dati.",
  onRetry
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={<AlertCircle className="h-16 w-16" />}
      title={title}
      description={description}
      action={
        onRetry
          ? { label: "Riprova", onClick: onRetry }
          : undefined
      }
    />
  );
}

/** Empty state for no data */
export function NoDataEmptyState({
  title = "Nessun Dato Disponibile",
  description = "Non ci sono dati da visualizzare in questo momento."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <EmptyState
      icon={<Database className="h-16 w-16" />}
      title={title}
      description={description}
      showCard={false}
    />
  );
}

/** Empty state for filtered results */
export function NoFilteredResultsEmptyState({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      icon={<FileX className="h-16 w-16" />}
      title="Nessun Risultato con i Filtri Attuali"
      description="Prova a rimuovere alcuni filtri per visualizzare più risultati."
      action={
        onClearFilters
          ? { label: "Cancella Filtri", onClick: onClearFilters }
          : undefined
      }
      showCard={false}
    />
  );
}
