"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="text-center sm:max-w-md">
        <div className="mx-auto my-6 flex h-12 w-12 items-center justify-center rounded-full">
          <CircleHelp className="text-gray-600" size={48} />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          {description && (
            <DialogDescription className="mt-2 text-center text-base text-gray-600">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="mt-4 flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            variant="outline"
            className="sm: w-full flex-1 sm:w-auto"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant="default"
            className="w-full flex-1 sm:w-auto"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
