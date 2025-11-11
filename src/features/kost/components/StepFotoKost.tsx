"use client";

import { useState, useMemo, useEffect } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { usePhotoKost } from "@/features/photo-kost/hooks/usePhotoKost";
import { useCreateKostStore } from "@/stores/createKost.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOwnerKost } from "../hooks/useOwnerKost";
import imageCompression from "browser-image-compression";

const categoryOptions: { label: string; value: Photo["category"] }[] = [
  { label: "Tampak Depan", value: "tampak_depan" },
  { label: "Dalam Bangunan", value: "dalam_bangunan" },
  { label: "Dari Jalan", value: "dari_jalan" },
];

type Photo = {
  _id: string;
  url: string;
  category: "tampak_depan" | "dalam_bangunan" | "dari_jalan";
};

const MAX_SIZE_MB = 5;
const MAX_PHOTOS_PER_CATEGORY = 5;

export default function StepFotoKost() {
  const [uploadingKategori, setUploadingKategori] = useState<
    Photo["category"] | null
  >(null);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);

  const { setCurrentStep, setOnNext, kostId } = useCreateKostStore();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const { submitPhotoKost } = useOwnerKost(kostId ?? "");

  const { photoKost, isLoadingPhoto, uploadPhoto, deletePhoto } = usePhotoKost({
    kostId: kostId ?? "",
  });

  const groupedPhotos = useMemo(() => {
    const data: Record<Photo["category"], Photo[]> = {
      tampak_depan: [],
      dalam_bangunan: [],
      dari_jalan: [],
    };

    photoKost?.forEach((p: Photo) => {
      if (data[p.category]) data[p.category].push(p);
    });

    return data;
  }, [photoKost]);

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
    try {
      if (!kostId) {
        toast.error("Kost ID tidak ditemukan");
        return;
      }

      // ✅ 1. Kompres file dulu sebelum upload
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1, // target maksimal 1MB
        maxWidthOrHeight: 1920, // resize otomatis
        useWebWorker: true, // performa lebih baik
      });
      const formData = new FormData();
      formData.append("photo", compressedFile);
      formData.append("category", category);
      formData.append("kostId", kostId);

      uploadPhoto(
        { kostId, formData },
        {
          onSuccess: () => {
            toast.success("Foto berhasil diunggah");
            setUploadingKategori(null);
            setFieldErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[category];
              return newErrors;
            });
          },
          onError: (err: any) => {
            console.error(err);
            toast.error(err.message || "Terjadi kesalahan saat upload");
          },
        },
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Terjadi kesalahan saat upload");
    } finally {
      setUploadingKategori(null);
    }
  };

  useEffect(() => {
    setOnNext(() => {
      if (!kostId) return;

      submitPhotoKost(
        { kostId },
        {
          onSuccess: () => {
            setFieldErrors({});
          },
          onError: (err: any) => {
            toast.error(err.message); // tampilkan pesan utama

            if (err.details) {
              setFieldErrors(err.details); // simpan error per category
            }
          },
        },
      );
    });
  }, [setOnNext, setCurrentStep, submitPhotoKost, kostId, router]);

  const handleDelete = async (category: Photo["category"], photoId: string) => {
    setDeletingPhotoId(photoId);
    if (!kostId) {
      toast.error("Kost ID tidak ditemukan");
      return;
    }

    try {
      await deletePhoto(photoId);
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
      <h1 className="mb-6 text-2xl font-semibold">Foto Kost Anda</h1>
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
                  <Loader2 className="h-5 w-5 animate-spin" />
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
          {fieldErrors[category.value] && (
            <p className="mt-1 text-sm text-red-500">
              {fieldErrors[category.label]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
