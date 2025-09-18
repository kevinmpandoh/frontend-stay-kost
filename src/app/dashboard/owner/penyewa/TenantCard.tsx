import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalKonfirmasiBerhenti from "./ModalKonfirmasiBerhenti";
import { useOwnerBooking } from "@/features/booking/hooks/useOwnerBooking";
import { CheckCircle, CircleAlert } from "lucide-react";
import TenantDetailModal from "./TenantDetailModal";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useConfirm } from "@/hooks/useConfirmModal";

const TenantCard = ({ booking }: { booking: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"accept" | "reject" | null>(null);
  const { acceptMutation, rejectMutation } = useOwnerBooking();
  const confirm = useConfirm();
  // state untuk detail
  const [openDetail, setOpenDetail] = useState(false);
  const stopRent = booking.stopRent || null;

  const handleApprove = async (bookingId: string) => {
    const ok = await confirm({
      title: "Terima Pengajuan Berhenti Sewa Kost?",
      description: `Apakah Anda yakin ingin menerima berhenti sewa dari penyewa ?`,
      confirmText: "Terima",
      cancelText: "Batal",
    });

    if (ok) {
      acceptMutation.mutate(bookingId);
    }
  };

  return (
    <div className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-6 shadow">
      <div className="mb-4 flex items-start justify-between">
        <StatusBadge status={booking.status} />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image
                src={booking.tenant.photo || "/profile-default.png"}
                alt="Profile Image"
                className="h-12 w-12 rounded-full object-contain"
                width={40}
                height={40}
              />
              <div>
                <span className="block text-base font-semibold text-gray-700 dark:text-gray-400">
                  {booking.tenant.name}
                </span>
                <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                  {booking.kostName}
                </span>
              </div>
            </div>

            <div className="mb-2 flex gap-0">
              <div className="flex flex-col gap-2 border-l-2 border-gray-200 px-10 text-sm text-[#6b7280]">
                <h3 className="text-lg font-semibold">Mulai Sewa</h3>

                <span className="font-semibold text-[#374151]">
                  {booking.startDate}
                </span>
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-gray-200 px-10 text-sm text-[#6b7280]">
                <h3 className="text-lg font-semibold">Durasi</h3>

                <span className="font-semibold text-[#374151]">
                  {booking.duration} Bulan
                </span>
              </div>

              <div className="flex items-center gap-2 border-l-2 border-gray-200 px-10 text-sm text-[#6b7280]">
                <Button variant={"ghost"} onClick={() => setOpenDetail(true)}>
                  Lihat Detail
                </Button>
              </div>

              {booking.stopRent &&
                booking.stopRent?.status === "pending_approval" && (
                  <div className="flex flex-col items-center gap-2 border-l-2 border-gray-200 px-4 text-sm text-[#6b7280]">
                    <h3 className="text-lg font-semibold">Konfirmasi </h3>

                    <div className="flex gap-2">
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setModalMode("reject");
                          setOpenModal(true);
                        }}
                      >
                        Tolak
                      </Button>
                      <Button
                        onClick={() => {
                          handleApprove(booking.id);
                        }}
                      >
                        Terima
                      </Button>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {stopRent.status === "pending_approval" && (
            <div className="border-warning-300 text-warning-800 mt-4 flex items-center gap-2 rounded-md border bg-yellow-50 px-4 py-3 text-sm">
              <CircleAlert size={18} className="text-warning-500" />

              <h3>
                Penyewa mengajukan berhenti sewa pada
                <span>{stopRent.stopDate}</span>.
                <span className="text-warning-700 ml-2 font-semibold">
                  (Menunggu Persetujuan)
                </span>
              </h3>
            </div>
          )}
          {stopRent.status === "approved" && (
            <div className="border-success-300 text-success-800 bg-success-50 mt-4 flex items-center gap-2 rounded-md border px-4 py-3 text-sm">
              <CheckCircle size={18} className="text-success-500" />

              <h3>
                Pengajuan berhenti sewa telah disetujui. Penyewa akan check out
                pada tanggal <span>{stopRent.stopDate}</span>
              </h3>
            </div>
          )}
        </div>
      </div>
      <ModalKonfirmasiBerhenti
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={(reason) => {
          if (modalMode === "accept") {
            acceptMutation.mutate(booking.id);
          } else if (modalMode === "reject" && reason) {
            rejectMutation.mutate({ bookingId: booking.id, reason });
          }
          setOpenModal(false);
        }}
        mode={modalMode!}
      />

      <TenantDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        booking={booking}
      />
    </div>
  );
};

export default TenantCard;
