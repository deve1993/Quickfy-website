/**
 * Component Showcase
 *
 * Displays a comprehensive set of UI components with brand DNA applied.
 * Shows buttons, cards, forms, typography, and more.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Users,
  DollarSign,
  Star,
} from "lucide-react";
import type { BrandDNA } from "@/types/brand";
import { cn } from "@/lib/utils";

interface ComponentShowcaseProps {
  /**
   * Brand DNA to apply
   */
  brandDNA: BrandDNA;
  /**
   * Theme to display
   */
  theme: "light" | "dark";
  /**
   * Show all sections or compact view
   */
  compact?: boolean;
}

/**
 * Component Showcase
 */
export function ComponentShowcase({
  brandDNA,
  theme,
  compact = false,
}: ComponentShowcaseProps) {
  const fontHeading = `${brandDNA.typography.fontHeading.name}, ${brandDNA.typography.fontHeading.fallback.join(", ")}`;
  const fontBody = `${brandDNA.typography.fontBody.name}, ${brandDNA.typography.fontBody.fallback.join(", ")}`;

  return (
    <div className={cn("bg-background", theme === "dark" && "dark")}>
      <div className="p-6 space-y-8" style={{ fontFamily: fontBody }}>
        {/* Header */}
        <div className="space-y-2">
          <h1
            className="text-4xl font-bold text-foreground"
            style={{ fontFamily: fontHeading }}
          >
            {brandDNA.metadata.name}
          </h1>
          <p className="text-muted-foreground">
            {brandDNA.metadata.tagline || "Your marketing automation platform"}
          </p>
        </div>

        {!compact && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$45,231</span>
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">2,350</span>
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +180 new this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">3.24%</span>
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +0.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">4.8</span>
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on 1,234 reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: fontHeading }}>
                  Campaign Overview
                </CardTitle>
                <CardDescription>
                  Manage and monitor your marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Email Campaign</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Social Media</span>
                        <span className="text-sm text-muted-foreground">60%</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Google Ads</span>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: fontHeading }}>Buttons</CardTitle>
            <CardDescription>Different button styles and states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: fontHeading }}>Badges</CardTitle>
            <CardDescription>Status indicators and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: fontHeading }}>Alerts</CardTitle>
            <CardDescription>Different alert types for notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert>
              <Info className="w-4 h-4" />
              <AlertDescription>
                This is an informational message with some helpful context.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                There was an error processing your request. Please try again.
              </AlertDescription>
            </Alert>
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Your changes have been saved successfully!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: fontHeading }}>Form Elements</CardTitle>
            <CardDescription>Input fields and form controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full">Sign In</Button>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: fontHeading }}>Typography</CardTitle>
            <CardDescription>Heading and text styles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: fontHeading }}
              >
                Heading 1
              </h1>
              <h2
                className="text-3xl font-semibold"
                style={{ fontFamily: fontHeading }}
              >
                Heading 2
              </h2>
              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: fontHeading }}
              >
                Heading 3
              </h3>
              <h4
                className="text-xl font-medium"
                style={{ fontFamily: fontHeading }}
              >
                Heading 4
              </h4>
              <p className="text-base text-foreground leading-relaxed">
                This is body text using the brand&apos;s body font. Typography is the art
                and technique of arranging type to make written language legible,
                readable, and appealing when displayed.
              </p>
              <p className="text-sm text-muted-foreground">
                This is small text often used for captions and secondary information.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: fontHeading }}>Color Palette</CardTitle>
            <CardDescription>Your brand colors in action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Primary", color: brandDNA.colors[theme].primary },
                { name: "Secondary", color: brandDNA.colors[theme].secondary },
                { name: "Accent", color: brandDNA.colors[theme].accent },
                { name: "Destructive", color: brandDNA.colors[theme].destructive },
              ].map(({ name, color }) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-16 rounded-lg border"
                    style={{ backgroundColor: `hsl(${color})` }}
                  />
                  <p className="text-xs font-medium">{name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {color}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
