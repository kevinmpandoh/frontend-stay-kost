"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  type: "terima" | "tolak" | null;
  kamarOptions?: { _id: string; number: string }[]; // untuk pilihan kamar
}

const KonfirmasiModal: FC<Props> = ({
  open,
  onClose,
  onConfirm,
  type,
  kamarOptions = [],
}) => {
  const [selectedKamar, setSelectedKamar] = useState<string>("");
  const [alasan, setAlasan] = useState<string>("");

  const handleSubmit = () => {
    if (type === "terima") {
      onConfirm({ kamarId: selectedKamar });
    } else {
      onConfirm({ alasan });
    }
  };

  useEffect(() => {
    setSelectedKamar("");
    setAlasan("");
  }, [type, open]);

  const isSubmitDisabled =
    (type === "terima" && !selectedKamar) || (type === "tolak" && !alasan);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "terima" ? "Terima Pengajuan" : "Tolak Pengajuan"}
          </DialogTitle>
        </DialogHeader>

        {type === "terima" ? (
          <>
            <label className="text-base font-medium">Pilih Kamar</label>
            <Select value={selectedKamar} onValueChange={setSelectedKamar}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kamar tersedia" />
              </SelectTrigger>
              <SelectContent>
                {kamarOptions.map((kamar: any) => (
                  <SelectItem
                    key={kamar._id}
                    value={kamar._id}
                    disabled={kamar.status !== "available"}
                  >
                    {kamar.number} (Lantai {kamar.floor}){" "}
                    {kamar.status === "available" ? "" : " - Terisi"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : (
          <>
            <Label className="text-base font-medium">Alasan Penolakan</Label>
            <Textarea
              placeholder="Tulis alasan penolakan"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
            />
          </>
        )}

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
            Konfirmasi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KonfirmasiModal;
