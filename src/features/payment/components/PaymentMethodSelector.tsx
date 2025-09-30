import { PaymentMethod } from "@/types/paymentMethod.type";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export const PaymentMethodSelector = ({
  confirmedMethod,
  openModal,
}: {
  confirmedMethod: PaymentMethod | null;
  openModal: () => void;
}) => (
  <div className="mb-6">
    <h2 className="font-semibold mb-2">Metode Pembayaran</h2>
    <button
      type="button"
      className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 text-gray-700 text-sm font-semibold hover:bg-gray-50"
      onClick={openModal}
    >
      {confirmedMethod ? (
        <span className="flex items-center gap-2">
          <Image
            src={confirmedMethod.logo}
            alt={confirmedMethod.name}
            className="w-12 h-auto object-cover"
            width={40}
            height={20}
          />
          {confirmedMethod.name}
        </span>
      ) : (
        <div className="text-gray-600 flex gap-2 items-center">
          <CreditCard /> <span>Pilih Metode Pembayaran</span>
        </div>
      )}
    </button>
  </div>
);
