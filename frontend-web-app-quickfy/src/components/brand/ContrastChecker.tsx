/**
 * Contrast Checker Component
 *
 * WCAG contrast ratio validator for color accessibility.
 * Displays contrast ratio and compliance badges (AA/AAA).
 */

"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, X, AlertTriangle } from "lucide-react";
import { checkContrast } from "@/lib/brand/brandValidator";
import type { ColorValue } from "@/types/brand";
import { cn } from "@/lib/utils";

interface ContrastCheckerProps {
  /**
   * Foreground color (text)
   */
  foreground: ColorValue;
  /**
   * Background color
   */
  background: ColorValue;
  /**
   * Label for this contrast check
   */
  label?: string;
  /**
   * Show detailed compliance info
   */
  detailed?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Contrast Checker Component
 *
 * Validates and displays WCAG contrast compliance
 */
export function ContrastChecker({
  foreground,
  background,
  label,
  detailed = false,
  className,
}: ContrastCheckerProps) {
  // Calculate contrast
  const contrastResult = useMemo(() => {
    try {
      return checkContrast(foreground, background);
    } catch (error) {
      console.error("Failed to check contrast:", error);
      return null;
    }
  }, [foreground, background]);

  if (!contrastResult) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription>Unable to calculate contrast ratio</AlertDescription>
      </Alert>
    );
  }

  const { ratio, aa, aaa, aaLarge, aaaLarge } = contrastResult;

  // Determine overall status
  // const status = aa ? "pass" : "fail";
  const statusColor = aa ? "text-green-600" : "text-destructive";
  const statusIcon = aa ? Check : X;
  const StatusIcon = statusIcon;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Label */}
      {label && (
        <p className="text-sm font-medium text-foreground">{label}</p>
      )}

      {/* Color Preview */}
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-16 rounded-lg border-2 border-border flex items-center justify-center font-medium text-sm"
          style={{
            backgroundColor: `hsl(${background})`,
            color: `hsl(${foreground})`,
          }}
        >
          Aa
        </div>
        <div className="flex flex-col gap-1">
          <Badge
            variant={aa ? "default" : "destructive"}
            className="justify-center"
          >
            AA {aa ? <Check className="w-3 h-3 ml-1" /> : <X className="w-3 h-3 ml-1" />}
          </Badge>
          <Badge
            variant={aaa ? "default" : "secondary"}
            className="justify-center"
          >
            AAA {aaa ? <Check className="w-3 h-3 ml-1" /> : <X className="w-3 h-3 ml-1" />}
          </Badge>
        </div>
      </div>

      {/* Ratio Display */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
        <div className="flex items-center gap-2">
          <StatusIcon className={cn("w-4 h-4", statusColor)} />
          <span className="text-sm font-medium">Contrast Ratio</span>
        </div>
        <span className={cn("text-lg font-bold font-mono", statusColor)}>
          {ratio.toFixed(2)}:1
        </span>
      </div>

      {/* Detailed Compliance */}
      {detailed && (
        <div className="grid grid-cols-2 gap-2">
          <ComplianceItem
            label="Normal Text AA"
            passed={aa}
            requirement="4.5:1"
          />
          <ComplianceItem
            label="Normal Text AAA"
            passed={aaa}
            requirement="7:1"
          />
          <ComplianceItem
            label="Large Text AA"
            passed={aaLarge}
            requirement="3:1"
          />
          <ComplianceItem
            label="Large Text AAA"
            passed={aaaLarge}
            requirement="4.5:1"
          />
        </div>
      )}

      {/* Guidance */}
      {!aa && (
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription className="text-xs">
            This color combination does not meet WCAG AA standards (4.5:1 minimum).
            Consider increasing contrast for better accessibility.
          </AlertDescription>
        </Alert>
      )}

      {aa && !aaa && (
        <Alert>
          <Check className="w-4 h-4" />
          <AlertDescription className="text-xs">
            Meets WCAG AA standards. Consider achieving AAA (7:1) for enhanced
            accessibility.
          </AlertDescription>
        </Alert>
      )}

      {aaa && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
          <Check className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-xs text-green-800 dark:text-green-200">
            Excellent! Meets WCAG AAA standards for enhanced accessibility.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

/**
 * Compliance Item
 */
function ComplianceItem({
  label,
  passed,
  requirement,
}: {
  label: string;
  passed: boolean;
  requirement: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-2 rounded-lg border text-xs",
        passed
          ? "border-green-200 bg-green-50 dark:bg-green-950/20"
          : "border-border bg-muted/30"
      )}
    >
      <span className={passed ? "text-green-800 dark:text-green-200" : "text-muted-foreground"}>
        {label}
      </span>
      <div className="flex items-center gap-1">
        <span className="font-mono text-[10px]">{requirement}</span>
        {passed ? (
          <Check className="w-3 h-3 text-green-600" />
        ) : (
          <X className="w-3 h-3 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

/**
 * Compact Contrast Badge
 *
 * Simplified version showing just the ratio and pass/fail status
 */
export function ContrastBadge({
  foreground,
  background,
  className,
}: {
  foreground: ColorValue;
  background: ColorValue;
  className?: string;
}) {
  const contrastResult = useMemo(() => {
    try {
      return checkContrast(foreground, background);
    } catch {
      return null;
    }
  }, [foreground, background]);

  if (!contrastResult) {
    return <Badge variant="destructive">Error</Badge>;
  }

  const { ratio, aa } = contrastResult;

  return (
    <Badge
      variant={aa ? "default" : "destructive"}
      className={cn("font-mono", className)}
    >
      {ratio.toFixed(1)}:1 {aa ? "✓" : "✗"}
    </Badge>
  );
}
