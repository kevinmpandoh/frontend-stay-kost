"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import BackLink from "@/components/common/BackLink";
import { kostAdminService } from "@/features/kost/services/kostAdmin.service";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/useConfirmModal";
import { useAdminKost } from "@/features/kost/hooks/useAdminKost";
import RejectKostModal from "../RejectKostModal";

// 🗺️ Peta Kost
const MapEmbed = ({ lat, lng }: { lat: number; lng: number }) => {
  const src = `https://www.google.com/maps?q=${lat},${lng}&hl=id&z=15&output=embed`;
  return (
    <iframe
      src={src}
      width="100%"
      height="260"
      loading="lazy"
      style={{ borderRadius: "12px" }}
      className="border"
    ></iframe>
  );
};

// 💡 Lightbox Foto
const Lightbox = ({
  photo,
  onClose,
}: {
  photo: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="relative">
      <Image
        src={photo}
        alt="Lightbox"
        width={800}
        height={600}
        className="max-h-[80vh] rounded-lg object-contain"
      />
      <button
        className="absolute -top-4 -right-4 rounded-full bg-white p-1 text-black shadow-md"
        onClick={onClose}
      >
        <X />
      </button>
    </div>
  </div>
);

export default function AdminKostDetailPage() {
  const { id } = useParams();
  const { rejectKost, approveKost } = useAdminKost();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-kost-detail", id],
    queryFn: () => kostAdminService.getKostById(id as string),
    enabled: !!id,
  });

  const confirm = useConfirm();

  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [kostPhotoIndex, setKostPhotoIndex] = useState(0);
  const [roomPhotoIndexes, setRoomPhotoIndexes] = useState<
    Record<string, number>
  >({});

  if (isLoading || !data) return <p>Loading...</p>;

  const kost = data;
  const photos = kost.photos || [];
  const coords = kost.address?.coordinates || { lat: 0, lng: 0 };

  // Navigasi foto untuk kost
  const nextKostPhoto = () =>
    setKostPhotoIndex((prev) => (prev + 1) % photos.length);
  const prevKostPhoto = () =>
    setKostPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);

  // Navigasi foto untuk tipe kamar
  const nextRoomPhoto = (roomId: string, total: number) =>
    setRoomPhotoIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % total,
    }));
  const prevRoomPhoto = (roomId: string, total: number) =>
    setRoomPhotoIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + total) % total,
    }));

  const handleApprove = async () => {
    const ok = await confirm({
      title: "Terima Pengajuan Kost?",
      description: `Apakah Anda yakin ingin menerima pengajuan kost "${kost.name}"?`,
      confirmText: "Terima",
      cancelText: "Batal",
    });
    if (ok) approveKost.mutate(kost.id);
  };

  const handleReject = (reason: string) => {
    rejectKost.mutate({ kostId: kost.id, reason });
    setShowRejectModal(false);
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex gap-4">
        <BackLink label="Kembali" fallbackUrl="/dashboard/admin/kost" />
      </div>

      {/* ====== BARIS PERTAMA ====== */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        {/* === KOLOM KIRI (2/3) === */}
        <div className="space-y-6 rounded-lg border bg-white p-6 md:col-span-3">
          {/* Bagian atas (Foto + Info Singkat) */}
          <StatusBadge status={kost.status} />
          <div className="flex gap-6">
            {/* Foto */}

            <div className="relative">
              {photos.length > 0 ? (
                <>
                  <Image
                    src={photos[kostPhotoIndex].url}
                    alt="Foto Kost"
                    width={500}
                    height={350}
                    className="h-[200px] w-[400px] cursor-pointer rounded-lg object-cover"
                    onClick={() => setLightboxPhoto(photos[kostPhotoIndex].url)}
                  />
                  {/* Tombol navigasi foto */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={prevKostPhoto}
                        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 px-1 py-1 shadow"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <button
                        onClick={nextKostPhoto}
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 px-1 py-1 shadow"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-[200px] w-[400px] items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  Tidak ada foto
                </div>
              )}
            </div>

            {/* Info Kost */}
            <div className="flex w-full flex-col">
              <div className="mb-1 flex w-full items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{kost.name}</h1>
                <Badge variant="secondary" className="uppercase">
                  {kost.type}
                </Badge>
              </div>

              <p className="mt-3 leading-relaxed text-gray-700">
                {kost.description || "Tidak ada deskripsi kost"}
              </p>
            </div>
          </div>

          {/* Info tambahan (pemilik, fasilitas, peraturan) */}
          <div className="space-y-6">
            {/* Pemilik */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Informasi Pemilik
              </h2>
              <div className="rounded-md border bg-gray-50 p-3">
                <p className="font-semibold text-gray-800">{kost.owner.name}</p>
                <p className="text-sm text-gray-600">{kost.owner.email}</p>
                <p className="text-sm text-gray-600">{kost.owner.phone}</p>
              </div>
            </div>

            {/* Fasilitas */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Fasilitas Kost
              </h2>
              <div className="flex flex-wrap gap-2">
                {kost.facilities?.length ? (
                  kost.facilities.map((f: string, i: number) => (
                    <span
                      key={i}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {f}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Tidak ada fasilitas</p>
                )}
              </div>
            </div>

            {/* Peraturan */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Peraturan Kost
              </h2>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                {kost.rules?.length ? (
                  kost.rules.map((r: string, i: number) => <li key={i}>{r}</li>)
                ) : (
                  <p className="text-sm text-gray-500">Belum ada peraturan</p>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* === KOLOM KANAN (1/3) === */}
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm md:col-span-2">
          {coords.lat && coords.lng ? (
            <MapEmbed lat={coords.lat} lng={coords.lng} />
          ) : (
            <p className="text-sm text-gray-500">Koordinat tidak tersedia</p>
          )}
          <div className="mt-4 flex flex-col gap-4 text-base text-gray-800">
            <div>
              <span className="mb-1 block font-semibold">Provinsi</span>
              <span className="pl-2">{kost.address?.province || "-"}</span>
            </div>
            <div>
              <span className="mb-1 block font-semibold">Kota/Kabupaten</span>
              <span className="pl-2">{kost.address?.city || "-"}</span>
            </div>
            <div>
              <span className="mb-1 block font-semibold">Kecamatan</span>
              <span className="pl-2">{kost.address?.district || "-"}</span>
            </div>
            <div>
              <span className="mb-1 block font-semibold">Detail Alamat</span>
              <span className="pl-2">{kost.address?.detail || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====== BARIS KEDUA - TIPE KAMAR ====== */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Daftar Tipe Kamar
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {kost.roomTypes.map((room: any) => {
            const roomPhotos = room.photos || [];
            const currentIndex = roomPhotoIndexes[room.id] || 0;
            return (
              <div
                key={room.id}
                className="overflow-hidden rounded-lg border bg-white shadow-sm"
              >
                {/* Foto */}
                <div className="relative">
                  {roomPhotos.length > 0 ? (
                    <>
                      <Image
                        src={roomPhotos[currentIndex].url}
                        alt={room.name}
                        width={400}
                        height={250}
                        className="h-52 w-full cursor-pointer object-cover"
                        onClick={() =>
                          setLightboxPhoto(roomPhotos[currentIndex].url)
                        }
                      />
                      {/* Tombol navigasi foto */}
                      {roomPhotos.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              prevRoomPhoto(room.id, roomPhotos.length)
                            }
                            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 px-1 py-1 shadow"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() =>
                              nextRoomPhoto(room.id, roomPhotos.length)
                            }
                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 px-1 py-1 shadow"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex h-52 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      Tidak ada foto
                    </div>
                  )}
                  <StatusBadge
                    status={room.status}
                    className="absolute top-3 left-3"
                  />
                </div>

                {/* Detail */}
                <div className="space-y-2 p-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Ukuran Kamar: {room.size || "-"}
                  </p>

                  <div className="mt-4 flex space-x-4 rounded-md border border-gray-200 p-2 px-4 text-xs text-gray-600">
                    <div className="flex-1">
                      <p className="text-base text-gray-400">Kamar Terisi</p>
                      <p className="text-base font-semibold text-black">
                        {room?.occupiedRooms} Kamar
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-base text-gray-400">Kamar Kosong</p>
                      <p className="text-base font-semibold text-black">
                        {room?.availableRooms} Kamar
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-4 rounded-md border border-gray-200 p-2 px-4 text-xs text-gray-600">
                    <div className="flex-1">
                      <p className="text-base text-gray-500">Review</p>
                      {room.totalReviews > 0 ? (
                        <div className="text-base font-semibold">
                          {room.average_rating}{" "}
                          <span className="text-primary-500">★</span> (
                          {room.totalReviews} Reviews)
                        </div>
                      ) : (
                        "Belum ada review"
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-700">
                    <p className="mb-1 text-sm font-semibold">
                      Fasilitas Kamar
                    </p>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-600">
                      {room.facilities.length > 0 ? (
                        room.facilities.map((fasilitas: any, index: number) => (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-1 py-1 text-gray-700"
                          >
                            {fasilitas}
                          </span>
                        ))
                      ) : (
                        <div>-</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-700">
                    <p className="mb-1 text-base font-semibold">Harga</p>
                    <div className="w-full text-xl font-bold">
                      {room.price ? (
                        <>
                          Rp
                          <span className="ml-2 text-xl">
                            {room?.price?.toLocaleString("id-ID")}
                          </span>
                          <span className="font-normal">/bulan</span>
                        </>
                      ) : (
                        <div>-</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {kost.status === "pending" && (
          <div className="mt-6 flex justify-end gap-3 border-t pt-4">
            <Button
              variant="outline"
              size={"lg"}
              onClick={() => setShowRejectModal(true)}
            >
              Tolak
            </Button>
            <Button size={"lg"} onClick={handleApprove}>
              Terima
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Foto */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}

      <RejectKostModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
      />
    </div>
  );
}
