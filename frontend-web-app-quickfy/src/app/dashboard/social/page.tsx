"use client";

import { useState } from "react";
import { Share2, TrendingUp, Users, Zap, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureGate } from "@/components/shared/FeatureGate";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { SocialPlatform, PostType, SocialPost } from "@/types/social";
import { PlatformSelector } from "@/components/social/PlatformSelector";
import { PostTypeSelector } from "@/components/social/PostTypeSelector";
import { PostPreview } from "@/components/social/PostPreview";
import { ContentLibrary } from "@/components/social/ContentLibrary";
import { mockSocialPosts } from "@/lib/data/mockSocialPosts";
import { toast } from "sonner";

function SocialContent() {
  const t = useTranslations("social");
  const [activeTab, setActiveTab] = useState("generator");

  // Generator state
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | undefined>();
  const [selectedType, setSelectedType] = useState<PostType | undefined>();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [useBrandValues, setUseBrandValues] = useState(true);
  const [generatedPost, setGeneratedPost] = useState<SocialPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!selectedPlatform || !selectedType) {
      toast.error("Seleziona piattaforma e tipo di post");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      // Find a matching post from mock data or use first available
      const matchingPost = mockSocialPosts.find(
        p => p.platform === selectedPlatform && p.type === selectedType
      ) || mockSocialPosts[0];

      setGeneratedPost({
        ...matchingPost,
        id: `generated-${Date.now()}`,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setIsGenerating(false);
      toast.success("Contenuto generato con successo!");
    }, 2000);
  };

  const handleSaveAsDraft = () => {
    if (!generatedPost) return;
    toast.success(t("notifications.postSaved"));
  };

  const handleSchedule = () => {
    if (!generatedPost) return;
    toast.success(t("notifications.postScheduled"));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" />
            {t("title")}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalFollowers")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21,475</div>
            <p className="text-xs text-muted-foreground">
              +690 {t("postsThisMonth").toLowerCase()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("engagement")}</CardTitle>
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
            <CardTitle className="text-sm font-medium">{t("postsThisMonth")}</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSocialPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockSocialPosts.filter(p => p.status === 'published').length} pubblicati
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="generator" className="gap-2">
            <Zap className="h-4 w-4" />
            {t("tabs.generator")}
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2">
            <Share2 className="h-4 w-4" />
            {t("library.title")} ({mockSocialPosts.length})
          </TabsTrigger>
        </TabsList>

        {/* Generator Tab */}
        <TabsContent value="generator" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    {t("generator.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Platform Selector */}
                  <PlatformSelector
                    selected={selectedPlatform}
                    onSelect={setSelectedPlatform}
                  />

                  {/* Post Type Selector */}
                  <PostTypeSelector
                    selected={selectedType}
                    onSelect={setSelectedType}
                  />

                  {/* Optional Fields */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="topic">{t("generator.topic")}</Label>
                      <Input
                        id="topic"
                        placeholder={t("generator.topicPlaceholder")}
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">{t("generator.keywords")}</Label>
                      <Input
                        id="keywords"
                        placeholder={t("generator.keywordsPlaceholder")}
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="audience">{t("generator.targetAudience")}</Label>
                      <Input
                        id="audience"
                        placeholder={t("generator.audiencePlaceholder")}
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="brandValues"
                        checked={useBrandValues}
                        onCheckedChange={(checked) => setUseBrandValues(checked === true)}
                      />
                      <Label
                        htmlFor="brandValues"
                        className="text-sm font-normal cursor-pointer"
                      >
                        {t("generator.useBrandValues")}
                      </Label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleGenerate}
                      disabled={!selectedPlatform || !selectedType || isGenerating}
                      className="flex-1"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                          {t("generator.generating")}
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          {t("generator.generateButton")}
                        </>
                      )}
                    </Button>

                    {generatedPost && (
                      <Button
                        variant="outline"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                      >
                        {t("generator.regenerateButton")}
                      </Button>
                    )}
                  </div>

                  {generatedPost && (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={handleSaveAsDraft}
                        className="flex-1"
                      >
                        {t("generator.saveAsDraft")}
                      </Button>
                      <Button
                        variant="default"
                        onClick={handleSchedule}
                        className="flex-1"
                      >
                        {t("generator.schedule")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="lg:sticky lg:top-6 h-fit">
              <PostPreview post={generatedPost} />
            </div>
          </div>
        </TabsContent>

        {/* Library Tab */}
        <TabsContent value="library">
          <Card>
            <CardHeader>
              <CardTitle>{t("library.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentLibrary posts={mockSocialPosts} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
