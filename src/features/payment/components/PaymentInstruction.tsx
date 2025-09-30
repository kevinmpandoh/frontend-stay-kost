import Image from "next/image";
import React from "react";
import type { Payment } from "@/features/payment/types/invoice.type";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Copy } from "lucide-react";
import { PaymentSteps } from "./PaymentSteps";
import { findPaymentMethod } from "@/utils/findPaymentMethod";

interface PaymentInstructionProps {
  payment: Payment;
}

export const PaymentInstruction = ({ payment }: PaymentInstructionProps) => {
  const selectedMethod = findPaymentMethod(payment.channel || payment.method);

  return (
    <div className="mb-8">
      <p className="mb-4 font-semibold">Silahkan bayar melalui</p>

      <div className="flex flex-col space-y-4 text-base font-normal">
        <div className="flex items-center justify-between">
          <span>Nama Bank</span>
          <span className="flex items-center space-x-1">
            <Image
              src={selectedMethod?.logo || "/logos/bank/default.png"}
              alt={`${selectedMethod?.name || "Bank"} logo`}
              width={38}
              height={38}
              className="h-8 w-8 object-contain"
            />
            <span>
              {selectedMethod?.name || payment.channel?.toUpperCase()}
            </span>
          </span>
        </div>

        {payment.method === "echannel" ? (
          <>
            <div className="flex items-center justify-between">
              <span>Kode Perusahaan</span>
              <button
                onClick={() => copyToClipboard(payment.billerCode)}
                className="flex cursor-pointer items-center space-x-1 font-semibold text-gray-700"
              >
                <Copy size={18} />
                <span>{payment.billerCode}</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span>Nomor Virtual Account</span>
              <button
                onClick={() => copyToClipboard(payment.billKey)}
                className="flex cursor-pointer items-center space-x-1 font-semibold text-gray-700"
              >
                <Copy size={18} className="text-gray-600" />
                <span>{payment.billKey}</span>
              </button>
            </div>
          </>
        ) : payment.method === "bank_transfer" ? (
          <>
            <div className="flex items-center justify-between">
              <span>Nomor Virtual Account</span>
              <button
                onClick={() => copyToClipboard(payment.vaNumber)}
                className="flex cursor-pointer items-center space-x-1 font-semibold text-gray-700"
              >
                <Copy size={18} className="text-gray-600" />
                <span>{payment.vaNumber}</span>
              </button>
            </div>
          </>
        ) : payment.method === "ewallet" ? (
          <div>
            <p>Scan QR Code berikut:</p>
            <Image
              src={payment?.qrisUrl || ""}
              alt="QR Code"
              width={300}
              height={300}
              unoptimized
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <span>Total Pembayaran</span>
          <button
            onClick={() => copyToClipboard(payment.amount.toString())}
            className="flex cursor-pointer items-center space-x-1 font-bold text-gray-700"
          >
            <Copy size={18} />
            <span>Rp {payment.amount.toLocaleString("id-ID")}</span>
          </button>
        </div>
      </div>

      <PaymentSteps method={payment.channel || payment.method} />
    </div>
  );
};
