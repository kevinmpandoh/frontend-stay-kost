"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    name: string;
    phone: string;
    jenis_kelamin: string;
  };
  onSave: (data: {
    name: string;
    phone: string;
    jenis_kelamin: string;
  }) => void;
};

export const EditProfileModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}: Props) => {
  const [form, setForm] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Data Diri</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm font-medium">Nomor HP</label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm font-medium">Jenis Kelamin</label>
            <select
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2"
            >
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
