"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Building2, ArrowLeft, Users, Trash2, MoreVertical, UserPlus, AlertTriangle, Link2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { UserRole, GoogleAnalyticsSettings, GoogleAdsSettings } from "@/types";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("workspace");
  const { workspaces, activeWorkspace, updateWorkspace, deleteWorkspace, inviteMember, updateMemberRole, removeMember } = useAuthStore();

  const workspaceId = params.id as string;
  const workspace = workspaces.find((w) => w.id === workspaceId);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: workspace?.name || "", description: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  const [inviteDialog, setInviteDialog] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", role: "viewer" as UserRole });
  const [isInviting, setIsInviting] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const [analyticsData, setAnalyticsData] = useState<GoogleAnalyticsSettings>(
    workspace?.settings.analytics || { connected: false }
  );
  const [googleAdsData, setGoogleAdsData] = useState<GoogleAdsSettings>(
    workspace?.settings.googleAds || { connected: false }
  );
  const [isSavingIntegrations, setIsSavingIntegrations] = useState(false);

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Workspace non trovato</p>
          <Button onClick={() => router.push("/dashboard/workspace")} className="mt-4">
            Torna ai workspace
          </Button>
        </div>
      </div>
    );
  }

  const handleUpdate = async () => {
    if (!editData.name.trim()) {
      toast.error("Nome workspace richiesto");
      return;
    }

    setIsUpdating(true);
    try {
      await updateWorkspace(workspaceId, { name: editData.name });
      toast.success(t("update.success"));
      setEditMode(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteData.email.trim()) {
      toast.error("Email richiesta");
      return;
    }

    setIsInviting(true);
    try {
      await inviteMember(workspaceId, inviteData);
      toast.success(t("members.inviteSuccess", { email: inviteData.email }));
      setInviteDialog(false);
      setInviteData({ email: "", role: "viewer" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsInviting(false);
    }
  };

  const handleDelete = async () => {
    if (confirmName !== workspace.name) {
      toast.error("Nome workspace non corretto");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteWorkspace(workspaceId);
      toast.success(t("delete.success"));
      router.push("/dashboard/workspace");
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMember(workspaceId, memberId);
      toast.success(t("members.removeSuccess", { name: "Membro" }));
      setMemberToRemove(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRole = async (memberId: string, role: UserRole) => {
    try {
      await updateMemberRole(workspaceId, memberId, { role });
      toast.success(t("members.updateRoleSuccess", { name: "Membro" }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveIntegrations = async () => {
    setIsSavingIntegrations(true);
    try {
      await updateWorkspace(workspaceId, {
        settings: {
          analytics: analyticsData,
          googleAds: googleAdsData,
        },
      });
      toast.success(t("integrations.success"));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSavingIntegrations(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/workspace")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            {workspace.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            <Badge variant="outline" className="capitalize">{workspace.plan}</Badge>
            {activeWorkspace?.id === workspaceId && (
              <Badge className="ml-2">{t("list.active")}</Badge>
            )}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("tabs.general")}</TabsTrigger>
          <TabsTrigger value="team">{t("tabs.team")}</TabsTrigger>
          <TabsTrigger value="integrations">{t("tabs.integrations")}</TabsTrigger>
          <TabsTrigger value="danger">{t("tabs.dangerZone")}</TabsTrigger>
        </TabsList>

        {/* Tab General */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("update.title")}</CardTitle>
              <CardDescription>{t("update.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">{t("fields.name")}</Label>
                <Input
                  id="workspace-name"
                  value={editMode ? editData.name : workspace.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  disabled={!editMode}
                />
              </div>

              <div className="space-y-2">
                <Label>{t("fields.plan")}</Label>
                <Input value={workspace.plan.toUpperCase()} disabled />
              </div>

              <div className="space-y-2">
                <Label>{t("fields.createdAt")}</Label>
                <Input value={new Date(workspace.createdAt).toLocaleDateString()} disabled />
              </div>

              <div className="flex gap-2">
                {!editMode ? (
                  <Button onClick={() => setEditMode(true)}>
                    {t("update.title")}
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleUpdate} disabled={isUpdating}>
                      {isUpdating ? t("update.updating") : t("update.button")}
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setEditMode(false);
                      setEditData({ name: workspace.name, description: "" });
                    }}>
                      {t("delete.cancel")}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Team */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("members.title")}</CardTitle>
                  <CardDescription>{t("members.description")}</CardDescription>
                </div>
                <Dialog open={inviteDialog} onOpenChange={setInviteDialog}>
                  <Button onClick={() => setInviteDialog(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("members.invite")}
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("members.invite")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("members.email")}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={inviteData.email}
                          onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                          placeholder={t("members.emailPlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">{t("members.role")}</Label>
                        <Select value={inviteData.role} onValueChange={(role: UserRole) => setInviteData({ ...inviteData, role })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">{t("roles.admin")}</SelectItem>
                            <SelectItem value="editor">{t("roles.editor")}</SelectItem>
                            <SelectItem value="viewer">{t("roles.viewer")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setInviteDialog(false)}>
                        {t("delete.cancel")}
                      </Button>
                      <Button onClick={handleInvite} disabled={isInviting}>
                        {isInviting ? t("members.inviting") : t("members.invite")}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {workspace.members.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t("members.noMembers")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("members.noMembersDesc")}</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("members.email")}</TableHead>
                      <TableHead>{t("members.role")}</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workspace.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{member.user.name}</div>
                            <div className="text-sm text-muted-foreground">{member.user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          {member.acceptedAt ? (
                            <Badge variant="default">{t("members.active")}</Badge>
                          ) : (
                            <Badge variant="secondary">{t("members.pending")}</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleUpdateRole(member.id, member.role === "admin" ? "editor" : "admin")}>
                                {t("members.updateRole")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => setMemberToRemove(member.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t("members.removeButton")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Integrations */}
        <TabsContent value="integrations" className="space-y-4">
          {/* Google Analytics Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <CardTitle>{t("integrations.analytics.title")}</CardTitle>
                  <CardDescription>{t("integrations.analytics.description")}</CardDescription>
                </div>
                <Badge variant={analyticsData.connected ? "default" : "secondary"}>
                  {analyticsData.connected ? t("integrations.analytics.connected") : t("integrations.analytics.disconnected")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics-enabled">{t("integrations.analytics.enable")}</Label>
                </div>
                <Switch
                  id="analytics-enabled"
                  checked={analyticsData.connected}
                  onCheckedChange={(checked) =>
                    setAnalyticsData({ ...analyticsData, connected: checked })
                  }
                />
              </div>

              {analyticsData.connected && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="tracking-id">{t("integrations.analytics.trackingId")}</Label>
                    <Input
                      id="tracking-id"
                      placeholder={t("integrations.analytics.trackingIdPlaceholder")}
                      value={analyticsData.trackingId || ""}
                      onChange={(e) =>
                        setAnalyticsData({ ...analyticsData, trackingId: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("integrations.analytics.trackingIdHelp")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="property-id">{t("integrations.analytics.propertyId")}</Label>
                    <Input
                      id="property-id"
                      placeholder={t("integrations.analytics.propertyIdPlaceholder")}
                      value={analyticsData.propertyId || ""}
                      onChange={(e) =>
                        setAnalyticsData({ ...analyticsData, propertyId: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("integrations.analytics.propertyIdHelp")}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Google Ads Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <CardTitle>{t("integrations.googleAds.title")}</CardTitle>
                  <CardDescription>{t("integrations.googleAds.description")}</CardDescription>
                </div>
                <Badge variant={googleAdsData.connected ? "default" : "secondary"}>
                  {googleAdsData.connected ? t("integrations.googleAds.connected") : t("integrations.googleAds.disconnected")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="googleads-enabled">{t("integrations.googleAds.enable")}</Label>
                </div>
                <Switch
                  id="googleads-enabled"
                  checked={googleAdsData.connected}
                  onCheckedChange={(checked) =>
                    setGoogleAdsData({ ...googleAdsData, connected: checked })
                  }
                />
              </div>

              {googleAdsData.connected && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="customer-id">{t("integrations.googleAds.customerId")}</Label>
                    <Input
                      id="customer-id"
                      placeholder={t("integrations.googleAds.customerIdPlaceholder")}
                      value={googleAdsData.customerId || ""}
                      onChange={(e) =>
                        setGoogleAdsData({ ...googleAdsData, customerId: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("integrations.googleAds.customerIdHelp")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conversion-id">{t("integrations.googleAds.conversionId")}</Label>
                    <Input
                      id="conversion-id"
                      placeholder={t("integrations.googleAds.conversionIdPlaceholder")}
                      value={googleAdsData.conversionId || ""}
                      onChange={(e) =>
                        setGoogleAdsData({ ...googleAdsData, conversionId: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("integrations.googleAds.conversionIdHelp")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conversion-label">{t("integrations.googleAds.conversionLabel")}</Label>
                    <Input
                      id="conversion-label"
                      placeholder={t("integrations.googleAds.conversionLabelPlaceholder")}
                      value={googleAdsData.conversionLabel || ""}
                      onChange={(e) =>
                        setGoogleAdsData({ ...googleAdsData, conversionLabel: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("integrations.googleAds.conversionLabelHelp")}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveIntegrations} disabled={isSavingIntegrations}>
              {isSavingIntegrations ? t("integrations.saving") : t("integrations.saveButton")}
            </Button>
          </div>
        </TabsContent>

        {/* Tab Danger Zone */}
        <TabsContent value="danger" className="space-y-4">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                {t("delete.title")}
              </CardTitle>
              <CardDescription>{t("delete.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={() => setDeleteDialog(true)}>
                {t("delete.button")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete.confirm")}</AlertDialogTitle>
            <AlertDialogDescription>{t("delete.confirmDesc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Label htmlFor="confirm-name">{t("delete.inputLabel")}</Label>
            <Input
              id="confirm-name"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={workspace.name}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("delete.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting || confirmName !== workspace.name}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? t("delete.deleting") : t("delete.button")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Member Dialog */}
      <AlertDialog open={memberToRemove !== null} onOpenChange={() => setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("members.removeTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("members.removeConfirm", { name: "questo membro" })}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("delete.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => memberToRemove && handleRemoveMember(memberToRemove)}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t("members.removeButton")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
