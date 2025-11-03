/**
 * Confirm Dialog Component
 *
 * Accessible confirmation dialog to replace window.confirm()
 * Features: keyboard navigation, animations, customizable
 */

"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface ConfirmDialogProps {
  /**
   * Dialog open state
   */
  open: boolean;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Callback when user confirms
   */
  onConfirm: () => void;
  /**
   * Dialog title
   */
  title: string;
  /**
   * Dialog description/message
   */
  description: string;
  /**
   * Confirm button text
   * @default "Continue"
   */
  confirmText?: string;
  /**
   * Cancel button text
   * @default "Cancel"
   */
  cancelText?: string;
  /**
   * Variant for confirm button
   * @default "default"
   */
  variant?: "default" | "destructive";
}

/**
 * Confirm Dialog Component
 *
 * Replaces window.confirm() with accessible, animated dialog
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <ConfirmDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onConfirm={() => deleteItem()}
 *   title="Delete item?"
 *   description="This action cannot be undone."
 *   variant="destructive"
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              variant === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : undefined
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/**
 * Hook for managing confirm dialog state
 *
 * @example
 * ```tsx
 * const { confirmDialog, openConfirm } = useConfirmDialog({
 *   onConfirm: () => deleteItem(),
 *   title: "Delete item?",
 *   description: "This action cannot be undone.",
 * });
 *
 * <Button onClick={openConfirm}>Delete</Button>
 * {confirmDialog}
 * ```
 */
export function useConfirmDialog(props: Omit<ConfirmDialogProps, "open" | "onOpenChange">) {
  const [open, setOpen] = React.useState(false);

  const confirmDialog = (
    <ConfirmDialog
      {...props}
      open={open}
      onOpenChange={setOpen}
    />
  );

  return {
    confirmDialog,
    openConfirm: () => setOpen(true),
    closeConfirm: () => setOpen(false),
    isOpen: open,
  };
}
