// components/admin/EditOwnerModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const EditOwnerModal = ({ open, onClose, owner }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (owner) {
      setName(owner.name);
      setPhone(owner.phone);
    }
  }, [owner]);

  const handleSubmit = () => {
    // TODO: Kirim PATCH ke API
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Pemilik Kost</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nomor HP"
          />
          <Button onClick={handleSubmit}>Simpan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOwnerModal;
