"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import BillingList from "../../invoice/components/BillingList";
import { Invoice } from "@/features/payment/types/invoice.type";

export const TagihanModal = ({
  open,
  onClose,
  invoices,
}: {
  open: boolean;
  onClose: () => void;
  invoices: Invoice[];
}) => {
  const unpaidInvoices =
    invoices?.filter((item: any) => item.status === "unpaid") || [];

  const paidInvoices =
    invoices?.filter((item: any) => item.status === "paid") || [];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tagihan Kost</DialogTitle>
        </DialogHeader>
        <div className="h-full max-h-[85vh] overflow-y-auto">
          <Tabs defaultValue="unpaid" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="unpaid">Belum Dibayar</TabsTrigger>
              <TabsTrigger value="paid">Sudah Dibayar</TabsTrigger>
            </TabsList>

            <div className="max-h-[80vh] overflow-y-auto">
              <TabsContent value="unpaid">
                <BillingList invoices={unpaidInvoices} status="unpaid" />
              </TabsContent>

              <TabsContent value="paid">
                <BillingList invoices={paidInvoices} status="paid" />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
