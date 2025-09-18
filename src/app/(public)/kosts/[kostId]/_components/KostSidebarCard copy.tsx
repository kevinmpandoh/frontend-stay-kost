"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MessageCircleMore } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginModal } from "@/stores/loginModal.store";
import { useChat } from "@/features/chat/hooks/useChat";
import { Button } from "@/components/ui/button";
import DatePicker from "../booking/components/DatePicker";

// components/KostSidebarCard.tsx
export default function KostSidebarCard({
  price,
  kostId,
  handleBookingClick,
  availableRooms,
}: {
  price: number;
  kostId: string;
  handleBookingClick: (tanggalMasuk: string) => void;
  availableRooms: number;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const { open } = useLoginModal();
  const { startChat } = useChat();

  const [tanggalMasuk, setTanggalMasuk] = useState<Date | null>(null);

  const handleChatClick = async (kostId: string) => {
    if (!isAuthenticated) {
      open();
      return;
    }
    startChat({ roomTypeId: kostId });
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-2 text-2xl font-semibold text-gray-800">
        Rp{price.toLocaleString("id-ID")}
        <span className="text-sm text-gray-500"> / bulan</span>
      </div>

      {user?.role === "tenant" && availableRooms !== 0 && (
        <div className="mb-4 space-y-4">
          {/* ✅ Ganti input manual jadi DatePicker */}
          <DatePicker
            value={tanggalMasuk ?? undefined}
            onChange={setTanggalMasuk}
            placeholder="Pilih tanggal masuk"
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
          />
        </div>
      )}

      <div className="text-md mb-4 flex flex-col gap-2 space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Harga Bulanan</span>
          <span>Rp{price.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Admin</span>
          <span>Rp10.000</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>Total</span>
          <span>Rp {(price + 10000).toLocaleString("id-ID")}</span>
        </div>
      </div>

      {user?.role === "tenant" && availableRooms !== 0 && (
        <div className="space-y-2">
          <Button
            type="button"
            onClick={() => {
              if (!tanggalMasuk) {
                alert("Pilih tanggal masuk terlebih dahulu!");
                return;
              }
              handleBookingClick(
                format(tanggalMasuk, "yyyy-MM-dd", { locale: id }),
              );
            }}
            size="lg"
            className="w-full font-semibold"
          >
            Booking Sekarang
          </Button>

          <Button
            variant={"outline"}
            onClick={() => handleChatClick(kostId)}
            className="w-full font-semibold"
            size={"lg"}
          >
            <MessageCircleMore />
            Chat Pemilik
          </Button>
        </div>
      )}
    </div>
  );
}
