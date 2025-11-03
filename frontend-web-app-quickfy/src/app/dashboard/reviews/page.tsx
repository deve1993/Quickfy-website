"use client";

import { useEffect, useState } from "react";
import { Star, TrendingUp, MessageSquare, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeatureGate } from "@/components/shared/FeatureGate";
import { ReviewCard } from "@/components/dashboard/ReviewCard";
import { GenericPageSkeleton } from "@/components/skeletons";
import { apiClient } from "@/lib/api/client";
import type { Review } from "@/types";

function ReviewsContent() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await apiClient.getReviews();
        setReviews(data);
      } catch (error) {
        console.error("Errore nel caricamento delle recensioni:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <GenericPageSkeleton showTable={false} />;
  }

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const positiveReviews = reviews.filter((r) => r.sentiment === "positive").length;
  const needsResponse = reviews.filter((r) => !r.hasResponse).length;
  const responseRate =
    ((reviews.length - needsResponse) / reviews.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Recensioni AI</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Analisi sentiment e suggerimenti di risposta automatici
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtri
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Recensioni</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Su {reviews.length} recensioni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {positiveReviews}
            </div>
            <p className="text-xs text-muted-foreground">
              {((positiveReviews / reviews.length) * 100).toFixed(0)}% del totale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Da Rispondere</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {needsResponse}
            </div>
            <p className="text-xs text-muted-foreground">Richiedono attenzione</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasso Risposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseRate.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {reviews.length - needsResponse} risposte date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Card */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Insights AI
          </CardTitle>
          <CardDescription>
            Analisi automatica delle tue recensioni
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              ✨ Le parole chiave più menzionate:{" "}
              <strong>servizio clienti, professionalità, consegna</strong>
            </p>
            <p>
              📈 Il sentiment è migliorato del <strong>12%</strong> nell'ultimo
              mese
            </p>
            <p>
              🎯 {needsResponse} recensioni negative richiedono una risposta urgente
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Tutte le Recensioni</h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            {reviews.length} recensioni totali
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <FeatureGate
      requiredPlan={["plus", "pro"]}
      feature="Gestione Recensioni AI"
    >
      <ReviewsContent />
    </FeatureGate>
  );
}
