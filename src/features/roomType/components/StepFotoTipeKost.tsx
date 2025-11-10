"use client";

import { useState, useMemo, useEffect } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCreateKostStore } from "@/stores/createKost.store";
import { usePhotoRoom } from "@/features/photo-room/hooks/usePhotoRoom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useKostType } from "@/features/roomType/hooks/useKostType";

type Photo = {
  _id: string;
  url: string;
  category: "dalam_kamar" | "depan_kamar" | "kamar_mandi";
};

const MAX_SIZE_MB = 5;
const MAX_PHOTOS_PER_CATEGORY = 5;

const kategoriList: Photo["category"][] = [
  "dalam_kamar",
  "depan_kamar",
  "kamar_mandi",
];

const categoryOptions: { label: string; value: Photo["category"] }[] = [
  { label: "Depan Kamar", value: "depan_kamar" },
  { label: "Dalam Kamar", value: "dalam_kamar" },
  { label: "Kamar Mandi", value: "kamar_mandi" },
];

export default function StepFotoTipeKost() {
  const [uploadingKategori, setUploadingKategori] = useState<
    Photo["category"] | null
  >(null);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);
  const router = useRouter();
  const { setCurrentStep, setOnNext, kostTypeId } = useCreateKostStore();

  const { photoRoom, isLoadingPhoto, uploadPhoto, deletePhoto } =
    usePhotoRoom();

  const { submitPhotoRoom } = useKostType({
    kostTypeId: kostTypeId ?? "",
  });

  const groupedPhotos = useMemo(() => {
    const data: Record<Photo["category"], Photo[]> = {
      dalam_kamar: [],
      depan_kamar: [],
      kamar_mandi: [],
    };

    photoRoom?.forEach((p: Photo) => {
      if (data[p.category]) data[p.category].push(p);
    });

    return data;
  }, [photoRoom]);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Photo["category"],
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 5MB");
      return;
    }

    if (groupedPhotos[category].length >= MAX_PHOTOS_PER_CATEGORY) {
      toast.error(
        `Maksimal ${MAX_PHOTOS_PER_CATEGORY} foto untuk kategori ini`,
      );
      return;
    }

    setUploadingKategori(category);

    if (!kostTypeId) {
      toast.error("Tipe Kost tidak ditemukan");
      return;
    }
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("category", category);
    formData.append("roomTypeId", kostTypeId);

    try {
      await uploadPhoto({ kostTypeId, formData });
      toast.success("Foto berhasil diunggah");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengunggah foto");
    } finally {
      setUploadingKategori(null);
    }
  };

  useEffect(() => {
    setOnNext(() => {
      if (!kostTypeId) return;
      submitPhotoRoom(
        { kostTypeId },
        {
          onError: (err: any) => {
            toast.error(err.message || "Gagal mengirim foto");
          },
        },
      );
    });
  }, [setOnNext, setCurrentStep, submitPhotoRoom, kostTypeId, router]);

  const handleDelete = async (category: Photo["category"], photoId: string) => {
    setDeletingPhotoId(photoId);
    if (!kostTypeId) {
      toast.error("Tipe Kost tidak ditemukan");
      return;
    }

    try {
      await deletePhoto({ kostTypeId, photoId });
      toast.success("Foto berhasil dihapus");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus foto");
    } finally {
      setDeletingPhotoId(null);
    }
  };

  if (isLoadingPhoto) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="mb-6 text-2xl font-semibold">Foto Tipe Kamar Anda</h1>
      {categoryOptions.map((category) => (
        <div key={category.label}>
          <h2 className="mb-2 font-semibold">{category.label}</h2>
          <div className="flex flex-wrap gap-3">
            {groupedPhotos[category.value]?.map((photo) => (
              <div
                key={photo._id}
                className="relative h-48 w-48 overflow-hidden rounded border"
              >
                <Image
                  src={photo.url}
                  alt={category.value}
                  className="h-full w-full object-cover"
                  width={280}
                  height={280}
                />
                <button
                  onClick={() => handleDelete(category.value, photo._id)}
                  disabled={deletingPhotoId === photo._id}
                  className={cn(
                    "absolute top-1 right-1 rounded-full bg-white/70 p-0.5",
                    deletingPhotoId === photo._id &&
                      "cursor-not-allowed opacity-50",
                  )}
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {groupedPhotos[category.value]?.length <
              MAX_PHOTOS_PER_CATEGORY && (
              <label className="flex h-48 w-48 cursor-pointer items-center justify-center rounded border-2 border-dashed text-gray-500 hover:bg-gray-50">
                {uploadingKategori === category.value ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <ImagePlus />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, category.value)}
                  className="hidden"
                  disabled={uploadingKategori === category.value}
                />
              </label>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
