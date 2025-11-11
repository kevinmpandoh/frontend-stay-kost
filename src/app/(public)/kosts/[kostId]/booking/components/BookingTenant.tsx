// app/(public)/kost/[kostId]/booking/components/BookingTenant.tsx

"use client";

import { useKost } from "@/features/kost/hooks/useKost";
import BookingForm from "./BookingForm";
import BookingSidebar from "./BookingSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/features/booking/booking.store";
import BackLink from "@/components/common/BackLink";
import { BookingFormData } from "@/features/booking/booking.schema";
import { useTenantBooking } from "@/features/booking/hooks/useTenantBooking";
import ModalBookingSuccess from "./ModalBookingSuccess";
import ModalBookingConfirmation from "./ModalBookingConfirmation";
interface BookingTenantProps {
  kostId: string;
}

export default function BookingTenant({ kostId }: BookingTenantProps) {
  const { kostDetail } = useKost(kostId);
  const { data: kost, isLoading, isError, error } = kostDetail;

  const router = useRouter();
  const { startDate } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const { createBooking, creating } = useTenantBooking();

  useEffect(() => {
    if (!startDate) {
      router.replace(`/kosts/${kostId}`); // balik ke list/detail kalau akses langsung
    } else {
      setLoading(false);
    }
  }, [startDate, router, kostId]);

  const handleFormSubmit = (data: BookingFormData) => {
    setFormData(data);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!formData) return;
    const date = new Date(formData.startDate);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const localDate = `${yyyy}-${mm}-${dd}`;

    createBooking(
      {
        duration: formData.duration,
        roomType: kostId,
        startDate: localDate,
        note: formData.note,
      },
      {
        onSuccess: () => {
          setIsConfirmModalOpen(false);
          setIsSuccessModalOpen(true);
        },
        onError: () => {
          setIsConfirmModalOpen(false);
        },
      },
    );
  };

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Memuat halaman booking...</p>
      </div>
    );
  }

  if (isError || !kost) {
    if ((error as any)?.status === 404) {
      return <div>Kost tidak ditemukan atau sudah dihapus.</div>;
    }

    return <div>Gagal memuat detail kost. Silakan coba lagi nanti.</div>;
  }

  return (
    <>
      <>
        {/* Kiri - Form */}
        <div className="mr-8 flex-1 space-y-6 rounded-2xl p-6">
          <BackLink
            label="Kembali ke detail kost"
            fallbackUrl={`/kosts/${kostId}`}
          />

          <BookingForm onSubmitBooking={handleFormSubmit} />
        </div>

        {/* Kanan - Sidebar */}
        <div className="w-full md:w-1/3">
          <BookingSidebar
            kost={{
              name: kost?.name,
              type: kost?.type,
              address: `${kost?.address.district}, ${kost?.address.city}`,
              image: kost?.photos[0]?.url,
              price: kost.price,
            }}
          />
        </div>

        {/* Modal konfirmasi */}
        <ModalBookingConfirmation
          open={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmBooking}
          loading={creating}
          kost={{
            name: kost.name,
            type: kost.type,
            image: kost.photos[0]?.url,
            address: `${kost.address.district}, ${kost.address.city}`,
            rules: kost.rules || [
              "Tidak boleh merokok",
              "Tidak boleh bawa hewan",
            ],
            facilities: kost.kostFacilities || ["Wifi"],
            price: kost.price,
          }}
          bookingInfo={{
            duration: formData?.duration || 0,
            checkIn: formData?.startDate || "",
            note: formData?.note,
          }}
        />

        <ModalBookingSuccess open={isSuccessModalOpen} />
      </>
    </>
  );
}
