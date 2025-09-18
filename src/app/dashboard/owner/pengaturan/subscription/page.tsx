"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import Link from "next/link";

import { useSubscriptionInvoice } from "@/features/subscription/hooks/useSubscriptionInvoice";
import { Badge } from "@/components/ui/badge";
import ExtendSubscriptionModal from "@/features/subscription/components/ExtendSubscriptionModal";
import { useModalStore } from "@/stores/modal.store";
import SubscriptionActiveCard from "./SubscriptionActiveCard";
import { useConfirm } from "@/hooks/useConfirmModal";
import SubscriptionInvoiceTable from "./SubscriptionInvoiceTable";
import { Loader2 } from "lucide-react";

const SubscriptionPage = () => {
  const { currentSubscription, loadingSub } = useSubscription();
  const { invoices, isLoading, cancelInvoice, cancelling } =
    useSubscriptionInvoice();
  const confirm = useConfirm();
  const { openUpgrade } = useModalStore();
  // const [openUpgrade, setOpenUpgrade] = useState(false);
  const [openExtend, setOpenExtend] = useState(false);

  if (loadingSub || isLoading) return <p>Loading...</p>;

  const pendingInvoice = invoices?.find(
    (item: any) => item.status === "unpaid",
  );
  const historyInvoices = invoices?.filter(
    (inv: any) => inv.status !== "unpaid",
  );

  const handleCancle = async (pendingnvoiceId: string) => {
    const ok = await confirm({
      title: "Batalkan Langganan Kost?",
      description: `Apakah Anda yakin ingin membatalkannya?`,
      confirmText: "Batalkan",
      cancelText: "Tidak Jadi",
    });

    if (ok) {
      cancelInvoice(pendingnvoiceId);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Langganan Saya</h1>
      {/* Paket Saya */}
      <SubscriptionActiveCard
        currentSubscription={currentSubscription}
        pendingInvoice={pendingInvoice}
        openUpgrade={openUpgrade}
        setOpenExtend={setOpenExtend}
      />

      {pendingInvoice && (
        <div className="mb-6 rounded-lg border p-4">
          <h2 className="mb-3 font-medium">Menunggu Pembayaran</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Paket: {pendingInvoice.packageName}</p>
              <p className="text-sm text-gray-600">
                Durasi : {pendingInvoice.packageDuration}
              </p>
              <p>
                Harga: Rp {pendingInvoice.totalPrice?.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => handleCancle(pendingInvoice.id)}
                disabled={cancelling}
              >
                {cancelling && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Batalkan
              </Button>

              <Button asChild>
                <Link
                  href={`/payments?invoice=${pendingInvoice.invoiceNumber}`}
                >
                  Bayar Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Riwayat Pembayaran */}
      <div>
        <h2 className="mb-3 text-lg font-medium">Riwayat Pembayaran</h2>
        <SubscriptionInvoiceTable
          invoices={historyInvoices ?? []}
          pageSize={5}
        />
      </div>
      {/* Modal */}

      <ExtendSubscriptionModal
        open={openExtend}
        onClose={() => setOpenExtend(false)}
      />
    </div>
  );
};

export default SubscriptionPage;
