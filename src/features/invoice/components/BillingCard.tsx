import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Billing = {
  id: string;
  invoiceNumber: string;
  dueDate: string;
  status: "paid" | "unpaid";
  monthNumber: number;
  amount: number;
  daysRemaining: number;
  isDueToday: boolean;
  isLate: boolean;
  daysLate: number;
};

type Props = {
  billing: Billing;
};

const BillingCard: React.FC<Props> = ({ billing }) => {
  const canPay =
    billing.status === "unpaid" &&
    !billing.isLate &&
    billing.daysRemaining <= 14;

  const renderDueStatus = () => {
    if (billing.status === "paid") return null;
    if (billing.isLate) {
      return (
        <p className="text-sm text-red-600">
          Telat {billing.daysLate} hari dari jatuh tempo
        </p>
      );
    } else if (billing.isDueToday) {
      return <p className="text-sm text-orange-500">Hari ini jatuh tempo</p>;
    } else {
      return (
        <p className="text-sm text-gray-600">
          Jatuh tempo dalam {billing.daysRemaining} hari
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{billing.invoiceNumber}</span>
        <span
          className={`font-semibold ${
            billing.status === "paid" ? "text-success-500" : "text-warning-500"
          }`}
        >
          {billing.status === "paid" ? "Sudah Dibayar" : "Menunggu Pembayaran"}
        </span>
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <p className="font-semibold text-gray-900">Kost Vinshi</p>
          {/* <p className="text-xs text-gray-500">
            Pembayaran bulan ke-{billing.monthNumber}
          </p> */}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Jatuh Tempo</p>
          <p className="text-base text-gray-800">{billing?.dueDate}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Pembayaran</p>
          <p className="text-lg font-semibold text-gray-900">
            Rp {billing?.amount.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          {renderDueStatus()}
          {/* <p className="text-sm text-red-600">{statusText}</p> */}
        </div>
        {canPay && (
          <Button>
            <Link href={`/payments?invoice=${billing.invoiceNumber}`}>
              Bayar Sekarang
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default BillingCard;
