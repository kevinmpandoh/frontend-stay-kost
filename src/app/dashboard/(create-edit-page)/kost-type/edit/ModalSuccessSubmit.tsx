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
  const { kostId } = useCreateKostStore();
  const router = useRouter();
  return (
    <Dialog open={isSubmitSuccess} onOpenChange={setIsSubmitSuccess}>
      <DialogContent className="z-9999">
        <DialogHeader>
          <DialogTitle>Edit Berhasil</DialogTitle>
        </DialogHeader>
        <h1 className="text-2xl font-bold mb-2">
          Data Tipe Kost berhasil disimpan
        </h1>

        <h3>
          Silakan lanjutkan untuk mengedit tipe kost lainnya atau klik Selesai
          Edit untuk kembali ke halaman utama.
        </h3>
        <DialogFooter className="flex flex-row justify-end gap-3">
          <Button variant="outline" onClick={() => setIsSubmitSuccess(false)}>
            Lanjut Edit
          </Button>
          <Button
            onClick={() => {
              setIsSubmitSuccess(false);
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
