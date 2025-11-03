"use client";

import { Share2, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureGate } from "@/components/shared/FeatureGate";
import { Button } from "@/components/ui/button";

function SocialContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Social & AI</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Gestione social media e content generator AI
          </p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Genera Contenuto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers Totali</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21,475</div>
            <p className="text-xs text-muted-foreground">
              +690 questo mese
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">
              +0.5% vs mese scorso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post Pubblicati</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">
              Negli ultimi 30 giorni
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Content Generator */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Genera contenuti ottimizzati per i tuoi social media
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              L'AI può generare post, didascalie e hashtag ottimizzati per massimizzare l'engagement su tutte le tue piattaforme social.
            </p>
            <Button>
              <Zap className="mr-2 h-4 w-4" />
              Inizia a Generare
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>Piattaforme Connesse</CardTitle>
          <CardDescription>
            Gestisci i tuoi account social media
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((platform) => (
              <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {platform[0]}
                  </div>
                  <div>
                    <p className="font-medium">{platform}</p>
                    <p className="text-sm text-muted-foreground">Non connesso</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connetti</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SocialPage() {
  return (
    <FeatureGate requiredPlan={["pro"]} feature="Social & AI">
      <SocialContent />
    </FeatureGate>
  );
}
