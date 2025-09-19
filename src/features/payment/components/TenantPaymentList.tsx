"use client";
import { usePayment } from "@/features/payment/hooks/usePayment";
import Image from "next/image";
import React, { useState } from "react";

import { PAYMENT_METHOD } from "@/constants/paymentMethod";
import { PaymentDetailModal } from "./PaymentDetailModal";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";

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
    return <p>Loading..</p>;
  }

  if (tenantPayment.length === 0) {
    return <h1>Payment Tidak Ada</h1>;
  }

  return (
    <div className="space-y-4">
      {tenantPayment.map((data: any) => {
        const method = findPaymentMethod(data.paymentMethod);
        return (
          <div key={data.id} className="rounded-lg border bg-white p-5">
            <div className="mb-4 flex items-start justify-between text-sm font-normal text-gray-600">
              <span>
                {data.payment_date} | {data.invoice}
              </span>
              <StatusBadge status={data.status} />
            </div>
            <div className="flex flex-col rounded-md p-4 sm:flex-row sm:items-center sm:space-x-6">
              <div className="mb-4 flex-1 border-r border-gray-200 pr-4 sm:mb-0">
                <p className="text-lg font-semibold text-gray-900">
                  {data.kost}
                </p>
              </div>
              <div className="mb-4 flex-1 border-r border-gray-200 px-4 sm:mb-0">
                <p className="text-lg font-semibold text-gray-900">
                  Metode Pembayaran
                </p>
                <div className="text-md mt-1 flex items-center space-x-2 text-gray-500">
                  {method ? (
                    <>
                      <Image
                        src={method.logo}
                        alt={method.name}
                        width={48}
                        height={48}
                      />
                      <span>{method.name}</span>
                    </>
                  ) : (
                    <span>{data.paymentMethod}</span>
                  )}
                </div>
              </div>
              <div className="flex-1 px-4">
                <p className="text-md font-semibold text-gray-900">
                  Total Pembayaran
                </p>
                <p className="mt-1 text-base font-bold">
                  Rp {data.amount?.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                variant={"ghost"}
                // className="mt-3 rounded border border-blue-600 px-3 py-1 text-base font-semibold text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
      <PaymentDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        payment={selectedPayment}
      />
    </div>
  );
};

export default TenantPaymentList;
