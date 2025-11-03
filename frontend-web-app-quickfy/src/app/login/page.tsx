"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/store/useToastStore";
import { apiClient } from "@/lib/api/client";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const toast = useToast();
  const t = useTranslations("auth.login");
  // const tCommon = useTranslations("common");

  // Create schema with translations
  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("emailError")),
        password: z.string().min(6, t("passwordError")),
      }),
    [t]
  );

  type LoginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await apiClient.login({
        email: data.email,
        password: data.password,
      });

      login(response.user, response.token, response.workspaces);
      toast.success(t("loginSuccess"));

      // Redirect to workspace selection if multiple workspaces
      if (response.workspaces.length > 1) {
        router.push("/select-workspace");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(
        t("loginError"),
        error instanceof Error ? error.message : t("invalidCredentials")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl font-bold">{t("title")}</CardTitle>
          <CardDescription className="text-sm md:text-base">{t("subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("loggingIn") : t("login")}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t("noAccount")}{" "}
            <Link href="/onboarding" className="text-primary hover:underline">
              {t("register")}
            </Link>
          </div>
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-muted-foreground text-center">
              {t("demoCredentials")}: <strong>admin@quickfy.com</strong> /{" "}
              <strong>password</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
