"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Plus, Users, Calendar, ArrowRight } from "lucide-react";
import { generateSlug } from "@/lib/validations/workspace";
import { toast } from "sonner";
import type { Workspace } from "@/types";

export default function WorkspacePage() {
  const t = useTranslations("workspace");
  const router = useRouter();
  const { workspaces, activeWorkspace, createWorkspace, switchWorkspace } = useAuthStore();

  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({ name: "", description: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isCreating) return;

    if (!newWorkspace.name.trim()) {
      toast.error("Nome workspace richiesto");
      return;
    }

    setIsCreating(true);
    try {
      const workspace = await createWorkspace({
        name: newWorkspace.name,
        description: newWorkspace.description,
        slug: generateSlug(newWorkspace.name),
      });
      toast.success(t("create.success"));
      setIsDialogOpen(false);
      setNewWorkspace({ name: "", description: "" });
      router.push(`/dashboard/workspace/${workspace.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSwitch = (workspace: Workspace) => {
    switchWorkspace(workspace);
    toast.success(t("list.switch"), { description: workspace.name });
  };

  const handleManage = (workspaceId: string) => {
    router.push(`/dashboard/workspace/${workspaceId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            {t("page.title")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("page.subtitle")}</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="h-4 w-4 mr-2" />
              {t("page.createNew")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("create.title")}</DialogTitle>
              <DialogDescription>{t("create.subtitle")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("fields.name")}</Label>
                <Input
                  id="name"
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                  placeholder={t("fields.namePlaceholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t("fields.description")}</Label>
                <Textarea
                  id="description"
                  value={newWorkspace.description}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                  placeholder={t("fields.descriptionPlaceholder")}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t("delete.cancel")}
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? t("create.creating") : t("create.button")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workspace Grid */}
      {workspaces.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t("list.empty")}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t("list.emptyDescription")}</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("page.createNew")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                activeWorkspace?.id === workspace.id
                  ? "ring-2 ring-primary shadow-md bg-primary/5"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg truncate">
                  {workspace.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="capitalize">{workspace.plan}</Badge>
                  {activeWorkspace?.id === workspace.id && (
                    <Badge variant="default" className="text-xs">{t("list.active")}</Badge>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>
                      {workspace.members.length === 1
                        ? t("list.member")
                        : t("list.members", { count: workspace.members.length })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(workspace.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {activeWorkspace?.id !== workspace.id ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSwitch(workspace)}
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {t("list.switch")}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleManage(workspace.id)}
                      className="w-full"
                    >
                      {t("list.manage")}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
