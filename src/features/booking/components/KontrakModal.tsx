"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import TenantContract from "./TenantContract";

export const KontrakModal = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Kontrak Kost</DialogTitle>
        </DialogHeader>
        {/* Ganti ini dengan isi kontrak sebenarnya */}
        <TenantContract data={data} />
      </DialogContent>
    </Dialog>
  );
};
