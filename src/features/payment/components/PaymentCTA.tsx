import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/types/paymentMethod.type";
import React from "react";

export const PaymentCTA = ({
  creatingPayment,
  handleClick,
  confirmedMethod,
}: {
  creatingPayment: boolean;
  handleClick: () => void;
  confirmedMethod: PaymentMethod | null;
}) => {
  return (
    <Button
      onClick={handleClick}
      disabled={creatingPayment || !confirmedMethod}
      size={"lg"}
      className="mt-10 w-full font-bold"
    >
      {creatingPayment ? "Memproses..." : "Bayar Sekarang"}
    </Button>
  );
};
