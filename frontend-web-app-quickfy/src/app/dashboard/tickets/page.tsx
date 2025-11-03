"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketsSkeleton } from "@/components/skeletons";
import { NoTicketsEmptyState, NoSearchResultsEmptyState } from "@/components/empty-states";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api/client";
import type { Ticket, TicketStatus, TicketPriority } from "@/types";
import { TicketMobileCard } from "@/components/dashboard/TicketMobileCard";

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

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await apiClient.getTickets();
        setTickets(data);
      } catch (error) {
        console.error("Errore nel caricamento dei ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter((t) => t.status === "in_progress").length;

  if (loading) {
    return <TicketsSkeleton />;
  }

  // Show empty state if no tickets at all
  if (tickets.length === 0) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Ticketing</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Gestisci le richieste di supporto e segnalazioni
            </p>
          </div>
        </div>
        <NoTicketsEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Ticketing</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Gestisci le richieste di supporto e segnalazioni
          </p>
        </div>
        <Link href="/dashboard/tickets/new">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Nuovo Ticket</span>
            <span className="sm:hidden">Nuovo</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Aperti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Lavorazione</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tutti i Ticket</CardTitle>
          <CardDescription>
            Una panoramica completa di tutte le richieste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca ticket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Oggetto</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Priorità</TableHead>
                  <TableHead>Creato</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="p-8">
                      <NoSearchResultsEmptyState
                        query={searchQuery}
                        onClearSearch={() => setSearchQuery("")}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">#{ticket.number}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[ticket.status]}>
                          {statusLabel[ticket.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={priorityVariant[ticket.priority]}>
                          {priorityLabel[ticket.priority]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.createdAt).toLocaleDateString("it-IT")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/dashboard/tickets/${ticket.id}`}>
                          <Button variant="ghost" size="sm">
                            Visualizza
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3">
            {filteredTickets.length === 0 ? (
              <div className="py-4">
                <NoSearchResultsEmptyState
                  query={searchQuery}
                  onClearSearch={() => setSearchQuery("")}
                />
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <TicketMobileCard key={ticket.id} ticket={ticket} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
