import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEditKostModalStore } from "@/stores/editKostModal";
import { useRouter } from "next/navigation";
import { useCreateKostStore } from "@/stores/createKost.store";

const ModalSuccessSubmit = () => {
  const { isSubmitSuccess, setIsSubmitSuccess } = useEditKostModalStore();
  const { kostId, reset } = useCreateKostStore();
  const router = useRouter();
  return (
    <Dialog open={isSubmitSuccess} onOpenChange={setIsSubmitSuccess}>
      <DialogContent className="z-9999">
        <DialogHeader>
          <DialogTitle>Edit Berhasil</DialogTitle>
        </DialogHeader>
        <h1 className="mb-2 text-2xl font-bold">
          Data Tipe Kamar berhasil disimpan
        </h1>

        <h3>
          Silakan Klik Lanjut Edit untuk melanjutkan mengedit data tipe kamar
          atau klik Selesai Edit untuk kembali ke halaman daftar tipe kamar.
        </h3>
        <DialogFooter className="flex flex-row justify-end gap-3">
          <Button variant="outline" onClick={() => setIsSubmitSuccess(false)}>
            Lanjut Edit
          </Button>
          <Button
            onClick={() => {
              setIsSubmitSuccess(false);
              reset();
              router.push(`/dashboard/owner/kost-saya/${kostId}`); // Atau halaman setelah selesai edit
            }}
          >
            Selesai Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSuccessSubmit;
