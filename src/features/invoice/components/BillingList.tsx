"use client";

import React from "react";

import { Invoice } from "@/features/payment/types/invoice.type";
import BillingCard from "./BillingCard";

type Props = {
  invoices: Invoice[];
  status: "paid" | "unpaid";
};

const BillingList: React.FC<Props> = ({ invoices, status }) => {
  if (invoices.length === 0) {
    return (
      <p className="mt-4 flex h-[400px] w-full items-center justify-center text-sm text-gray-500">
        {status === "paid"
          ? "Belum ada tagihan yang sudah dibayar."
          : "Belum ada tagihan yang harus dibayar."}
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {invoices.map((item: any) => (
        <BillingCard key={item.id} billing={item} />
      ))}
    </div>
  );
};

export default BillingList;
