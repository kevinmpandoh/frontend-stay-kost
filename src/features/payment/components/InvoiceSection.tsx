import React from "react";
import { Invoice } from "../types/invoice.type";

export const InvoiceSection = ({ invoice }: { invoice: Invoice }) => (
  <>
    {/* Invoice Number */}
    <div className="mb-8">
      <h2 className="mb-2 font-semibold select-text">No. Invoice</h2>
      <p className="text-gray-900 select-text">{invoice.invoiceNumber}</p>
      <hr className="mt-6 border-t border-gray-200" />
    </div>

    {/* Jenis Pembayaran */}
    <div className="mb-8">
      <h2 className="mb-2 font-semibold select-text">Jenis Pembayaran</h2>
      <p className="text-gray-900 select-text">
        {invoice.type === "booking" ? "Bayar Kost" : "Langganan Paket"}
      </p>
      <hr className="mt-6 border-t border-gray-200" />
    </div>
  </>
);
