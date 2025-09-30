"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePreferenceModalStore } from "@/stores/preferenceModal.store";

export default function EditPreferenceModal() {
  const { isOpen, section, closeModal } = usePreferenceModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {section}</DialogTitle>
        </DialogHeader>

        {section === "lokasi" && <div>Form edit lokasi di sini</div>}
        {section === "jenis_kost" && <div>Form edit jenis kost di sini</div>}
        {section === "harga" && <div>Form edit harga di sini</div>}
        {section === "fasilitas" && <div>Form edit fasilitas di sini</div>}
      </DialogContent>
    </Dialog>
  );
}
