"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-select";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
import React from "react";

type PaymentDetailModalProps = {
  open: boolean;
  onClose: () => void;
  payment: any;
};

export const PaymentDetailModal = ({
  open,
  onClose,
  payment,
}: PaymentDetailModalProps) => {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Status</span>
            <Badge variant="outline" className="capitalize">
              {payment.status}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Tanggal Pembayaran</span>
            <span>{payment.payment_date}</span>
          </div>
          <div className="flex justify-between">
            <span>Invoice</span>
            <span>{payment.invoice}</span>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Nama Kost</span>
            <span className="font-semibold">{payment.kost}</span>
          </div>

          <div className="flex justify-between">
            <span>Metode Pembayaran</span>
            <span>{payment.methodName || payment.payment_method}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>Rp {payment.amount.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
