"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { payoutSchema } from "@/validation/payout.validation";
import { useUpdatePayout } from "@/features/payout/hooks/usePayout";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useUser } from "@/features/user/hooks/useUser";
// import { useUpdatePayout } from "@/hooks/usePayout";

export default function PayoutModal({
  open,
  onOpenChange,
  banks,
  defaultValues,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  banks: any;
  defaultValues?: {
    bank: string;
    account: string;
  };
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(payoutSchema),
    defaultValues,
  });

  const { updateBankAccount } = useUser();

  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onSubmit = (data: any) => {
    updateBankAccount.mutate(
      {
        bank: data.bank,
        account: data.account,
      },
      {
        onSuccess: () => onOpenChange(false),
        onError: () => {},
      },
    );
  };

  const selectedBankCode = watch("bank");
  // const selectedBank = banks?.find((b: any) => b.code === selectedBankCode);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informasi Pembayaran</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nama Bank</label>
            <Select
              onValueChange={(value) => setValue("bank", value)}
              defaultValue={defaultValues?.bank}
              value={selectedBankCode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Bank" />
              </SelectTrigger>
              <SelectContent>
                {banks?.map((bank: any) => (
                  <SelectItem key={bank.code} value={bank.code}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.bank && (
              <p className="mt-1 text-sm text-red-500">{errors.bank.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Nomor Rekening" {...register("account")} />
            {errors.account && (
              <p className="text-sm text-red-500">{errors.account.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={updateBankAccount.isPending}
          >
            {updateBankAccount.isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
