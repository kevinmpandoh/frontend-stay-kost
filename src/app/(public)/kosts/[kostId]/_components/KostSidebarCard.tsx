"use client";

import SimpleCalendar from "@/components/ui/calendar2";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, MessageCircleMore } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginModal } from "@/stores/loginModal.store";
import { useChat } from "@/features/chat/hooks/useChat";
import { Button } from "@/components/ui/button";

// components/KostSidebarCard.tsx
export default function KostSidebarCard({
  price,
  kostId,
  handleBookingClick,
  serviceFeeTenant,
  availableRooms,
}: {
  price: number;
  kostId: string;
  serviceFeeTenant: number;
  handleBookingClick: (tanggalMasuk: string) => void;
  availableRooms: number;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const { open } = useLoginModal();
  const { startChat } = useChat();

  const [tanggalMasuk, setTanggalMasuk] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const isTenant = user?.role === "tenant";
  const isOwnerOrAdmin = user?.role === "owner" || user?.role === "admin";

  const handleSelectDate = (date: Date) => {
    setTanggalMasuk(date);
    setShowCalendar(false);
  };

  const handleChatClick = async (kostId: string) => {
    if (!isAuthenticated) {
      open();
      return;
    }
    if (!isTenant) return; // hanya tenant yang bisa chat
    startChat({ roomTypeId: kostId });
  };

  // Detect click outside calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 lg:max-w-sm">
      <div className="mb-2 text-2xl font-semibold text-gray-800">
        Rp{price.toLocaleString("id-ID")}
        <span className="text-sm text-gray-500"> / bulan</span>
      </div>
      {isOwnerOrAdmin ||
        (availableRooms !== 0 && (
          <div className="mb-4 space-y-4">
            <div className="relative mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tanggal Masuk
              </label>
              <input
                readOnly
                type="text"
                value={
                  tanggalMasuk
                    ? format(tanggalMasuk, "dd MMMM yyyy", { locale: id })
                    : ""
                }
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full cursor-pointer rounded-lg border px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="Pilih tanggal masuk"
              />
              <Calendar
                size={18}
                className="absolute top-10 right-3 text-gray-500"
              />
            </div>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute z-20 mt-2 rounded-xl border bg-white p-4 shadow-lg"
              >
                <SimpleCalendar
                  selectedDate={tanggalMasuk ?? undefined}
                  onSelect={handleSelectDate}
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().setMonth(new Date().getMonth() + 3))
                  }
                />
              </div>
            )}
          </div>
        ))}

      <div className="text-md mb-4 flex flex-col gap-2 space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Harga Bulanan</span>
          <span>Rp{price.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span>Rp{serviceFeeTenant.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>Total</span>
          <span>Rp {(price + serviceFeeTenant).toLocaleString("id-ID")}</span>
        </div>
      </div>

      {isOwnerOrAdmin ||
        (availableRooms !== 0 && (
          <div className="space-y-2">
            <Button
              type="button"
              onClick={() => {
                if (!tanggalMasuk) {
                  setShowCalendar(true); // buka kalender kalau belum pilih tanggal
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
        ))}
    </div>
  );
}
