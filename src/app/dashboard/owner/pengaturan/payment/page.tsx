"use client";

import { useState } from "react";
import { usePayout } from "@/features/payout/hooks/usePayout";
// import PayoutModal from "@/components/owner/payout/PayoutModal";
import PayoutModal from "./PayoutModal";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark, SquareUser } from "lucide-react";
import { useUser } from "@/features/user/hooks/useUser";
// import { useBanks } from "@/hooks/useBanks";

export default function Page() {
  const [open, setOpen] = useState(false);

  const { banks, userCurrent } = useUser();

  if (banks.isLoading || userCurrent.isLoading) {
    return <h1>LOADING</h1>;
  }
  const { accountName, bankCode, accountNumber } = userCurrent.data?.bank;

  const selectedBank = banks?.data.find((bank: any) => bank.code === bankCode);
  const bankDisplayName = selectedBank?.name || "-";

  const hasData = bankCode && accountNumber && accountName;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Pembayaran</h1>
      <p className="mb-6 text-gray-600">
        Atur informasi pembayaran Anda untuk transaksi yang lebih mudah dan
        cepat.
        <br />
        Pastikan informasi yang Anda masukkan akurat untuk menghindari masalah
        dalam proses pembayaran.
      </p>

      {!userCurrent.isLoading && hasData ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Landmark className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Nama Bank</p>
              <p className="text-gray-500">{bankDisplayName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCard className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Nomor Rekening</p>
              <p className="text-gray-500">{accountNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <SquareUser className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Nama Pemilik</p>
              <p className="text-gray-500">{accountName}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-gray-500">
          Belum ada informasi pembayaran.
        </div>
      )}

      <div className="mt-6">
        <Button onClick={() => setOpen(true)} className="w-full">
          {hasData
            ? "Ubah Informasi Pembayaran"
            : "Tambah Informasi Pembayaran"}
        </Button>
      </div>

      <PayoutModal
        open={open}
        onOpenChange={setOpen}
        banks={banks.data}
        defaultValues={
          hasData
            ? {
                bank: bankCode,
                account: accountNumber,
              }
            : { bank: "", account: "" }
        }
      />
    </div>
  );
}
