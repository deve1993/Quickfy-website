import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Ticket, TicketStatus, TicketPriority } from "@/types";
import { Calendar, User } from "lucide-react";

const statusVariant: Record<
  TicketStatus,
  "default" | "secondary" | "warning" | "success" | "destructive" | "info"
> = {
  open: "destructive",
  in_progress: "warning",
  waiting: "info",
  closed: "success",
};

const statusLabel: Record<TicketStatus, string> = {
  open: "Aperto",
  in_progress: "In Lavorazione",
  waiting: "In Attesa",
  closed: "Chiuso",
};

const priorityVariant: Record<
  TicketPriority,
  "default" | "secondary" | "warning" | "destructive"
> = {
  low: "secondary",
  medium: "default",
  high: "warning",
  urgent: "destructive",
};

const priorityLabel: Record<TicketPriority, string> = {
  low: "Bassa",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};

interface TicketMobileCardProps {
  ticket: Ticket;
}

export function TicketMobileCard({ ticket }: TicketMobileCardProps) {
  return (
    <Card className="p-4 hover:border-primary/50 transition-colors">
      {/* Header: Number + Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1">#{ticket.number}</p>
          <h3 className="font-semibold text-base line-clamp-2 mb-2">
            {ticket.subject}
          </h3>
        </div>
        <Badge variant={statusVariant[ticket.status]} className="ml-2 shrink-0">
          {statusLabel[ticket.status]}
        </Badge>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        {/* Priority */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Priorità</p>
          <Badge variant={priorityVariant[ticket.priority]} className="text-xs">
            {priorityLabel[ticket.priority]}
          </Badge>
        </div>

        {/* Created Date */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Creato</p>
          <div className="flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>{new Date(ticket.createdAt).toLocaleDateString("it-IT")}</span>
          </div>
        </div>

        {/* Assigned To */}
        {ticket.assignedTo && (
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground mb-1">Assegnato a</p>
            <div className="flex items-center gap-1 text-xs">
              <User className="h-3 w-3 text-muted-foreground" />
              <span>{ticket.assignedTo.name}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Link href={`/dashboard/tickets/${ticket.id}`} className="block">
        <Button variant="outline" size="sm" className="w-full">
          Visualizza Dettagli
        </Button>
      </Link>
    </Card>
  );
}
