"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Invoice } from "@/features/payment/types/invoice.type";
import BillingCard from "@/features/invoice/components/BillingCard";

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
                {unpaidInvoices.length === 0 ? (
                  <p className="mt-4 flex h-[400px] w-full items-center justify-center text-sm text-gray-500">
                    Belum ada tagihan yang harus dibayar.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {unpaidInvoices.map((item: any) => (
                      <BillingCard key={item.id} billing={item} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="paid">
                {paidInvoices.length === 0 ? (
                  <p className="mt-4 flex h-[400px] w-full items-center justify-center text-sm text-gray-500">
                    Belum ada tagihan yang sudah dibayar.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {paidInvoices.map((item: any) => (
                      <BillingCard key={item.id} billing={item} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
