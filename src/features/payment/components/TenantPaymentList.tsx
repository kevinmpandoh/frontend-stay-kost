"use client";

import { usePayment } from "@/features/payment/hooks/usePayment";
import Image from "next/image";
import React, { useState } from "react";

import { PAYMENT_METHOD } from "@/constants/paymentMethod";
import { PaymentDetailModal } from "./PaymentDetailModal";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";

export function findPaymentMethod(methodValue: string) {
  for (const category of PAYMENT_METHOD) {
    const method = category.methods.find((m) => m.method === methodValue);
    if (method) return method;
  }
  return null;
}

const TenantPaymentList = () => {
  const { tenantPayment, isLoading } = usePayment();
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  if (isLoading) {
    return <p className="text-center text-gray-500">Memuat data...</p>;
  }

  if (tenantPayment.length === 0) {
    return <EmptyState message="Kamu belum punya riwayat transaksi" />;
  }

  return (
    <div className="space-y-4">
      {tenantPayment.map((data: any) => {
        const method = findPaymentMethod(data.paymentMethod);
        return (
          <div
            key={data.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Header */}
            <div className="mb-3 flex flex-col text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
              <span className="mb-1 sm:mb-0">
                {data.payment_date} | {data.invoice}
              </span>
              {/* <StatusBadge status={data.status} /> */}
            </div>

            {/* Konten */}
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Nama Kost */}
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 sm:text-lg">
                  {data.kost}
                </p>
              </div>

              {/* Metode Pembayaran */}
              <div className="flex flex-1 items-center gap-3">
                <div className="hidden h-10 border-l border-gray-200 sm:block" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Metode Pembayaran
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    {method ? (
                      <>
                        <Image
                          src={method.logo}
                          alt={method.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                        />
                        <span className="text-sm sm:text-base">
                          {method.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base">
                        {data.paymentMethod}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex flex-col gap-1 sm:items-end">
                <p className="text-base font-medium text-gray-700">
                  Total Pembayaran
                </p>
                <p className="text-lg font-bold text-gray-900 sm:text-xl">
                  Rp {data.amount?.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Tombol */}
            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedPayment({
                    ...data,
                    methodName: method?.name,
                  });
                  setOpenDetailModal(true);
                }}
              >
                Lihat Selengkapnya
              </Button>
            </div>
          </div>
        );
      })}

      {/* Modal Detail Pembayaran */}
      <PaymentDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        payment={selectedPayment}
      />
    </div>
  );
};

export default TenantPaymentList;
