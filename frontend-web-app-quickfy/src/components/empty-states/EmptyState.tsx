import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** Icon or illustration to display */
  icon?: ReactNode;
  /** Main title */
  title: string;
  /** Description text */
  description?: string;
  /** Call-to-action button */
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Custom className */
  className?: string;
  /** Show as card (default true) */
  showCard?: boolean;
}

/**
 * EmptyState component for displaying no-data scenarios
 * Provides consistent UX across all empty states in the application
 *
 * @example
 * <EmptyState
 *   icon={<FileX className="h-16 w-16" />}
 *   title="No tickets found"
 *   description="Create your first support ticket to get started"
 *   action={{ label: "Create Ticket", onClick: () => navigate('/new') }}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  showCard = true,
}: EmptyStateProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
      {icon && (
        <div className="mb-4 text-muted-foreground opacity-50">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {description && (
        <p className="text-muted-foreground max-w-md mb-6">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            action.href ? (
              <a href={action.href}>
                <Button>{action.label}</Button>
              </a>
            ) : (
              <Button onClick={action.onClick}>{action.label}</Button>
            )
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <a href={secondaryAction.href}>
                <Button variant="outline">{secondaryAction.label}</Button>
              </a>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );

  if (!showCard) {
    return content;
  }

  return (
    <Card>
      <CardContent className="p-6">
        {content}
      </CardContent>
    </Card>
  );
}
