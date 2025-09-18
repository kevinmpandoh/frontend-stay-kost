"use client";

import { useState, useMemo, useEffect } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { usePhotoKost } from "@/features/photo-kost/hooks/usePhotoKost";
import { useCreateKostStore } from "@/stores/createKost.store";
import Image from "next/image";
import { useEditKostModalStore } from "@/stores/editKostModal";

type Photo = {
  _id: string;
  url: string;
  kategori: "tampak_depan" | "dalam_bangunan" | "dari_jalan";
};

const MAX_SIZE_MB = 5;
const MAX_PHOTOS_PER_CATEGORY = 5;

const kategoriList: Photo["kategori"][] = [
  "tampak_depan",
  "dalam_bangunan",
  "dari_jalan",
];

export default function StepFotoKost() {
  const [uploadingKategori, setUploadingKategori] = useState<
    Photo["kategori"] | null
  >(null);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);

  const { setCurrentStep, setOnNext, kostId } = useCreateKostStore();
  const { setIsSubmitSuccess } = useEditKostModalStore();

  const {
    photoKost,
    isLoadingPhoto,
    uploadPhoto,
    deletePhoto,
    submitPhotoKost,
  } = usePhotoKost({ kostId: kostId ?? "" });

  const groupedPhotos = useMemo(() => {
    const data: Record<Photo["kategori"], Photo[]> = {
      tampak_depan: [],
      dalam_bangunan: [],
      dari_jalan: [],
    };

    photoKost?.forEach((p: Photo) => {
      if (data[p.kategori]) data[p.kategori].push(p);
    });

    return data;
  }, [photoKost]);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    kategori: Photo["kategori"],
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 5MB");
      return;
    }

    if (groupedPhotos[kategori].length >= MAX_PHOTOS_PER_CATEGORY) {
      toast.error(
        `Maksimal ${MAX_PHOTOS_PER_CATEGORY} foto untuk kategori ini`,
      );
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("kategori", kategori);

    setUploadingKategori(kategori);

    if (!kostId) {
      toast.error("Kost ID tidak ditemukan");
      return;
    }
    try {
      await uploadPhoto({ kostId, formData });
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
      if (!kostId) return;
      submitPhotoKost(
        { kostId },
        {
          onSuccess: () => {
            setIsSubmitSuccess(true);
          },
        },
      );
    });
  }, [setOnNext, setCurrentStep, submitPhotoKost, kostId]);

  const handleDelete = async (kategori: Photo["kategori"], photoId: string) => {
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
      {kategoriList.map((kategori) => (
        <div key={kategori}>
          <h2 className="mb-2 font-semibold">{kategori}</h2>
          <div className="flex flex-wrap gap-3">
            {groupedPhotos[kategori]?.map((photo) => (
              <div
                key={photo._id}
                className="relative h-28 w-28 overflow-hidden rounded border"
              >
                <Image
                  src={photo.url}
                  alt={kategori}
                  className="h-full w-full object-cover"
                  width={150}
                  height={150}
                />
                <button
                  onClick={() => handleDelete(kategori, photo._id)}
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

            {groupedPhotos[kategori]?.length < MAX_PHOTOS_PER_CATEGORY && (
              <label className="flex h-28 w-28 cursor-pointer items-center justify-center rounded border-2 border-dashed text-gray-500 hover:bg-gray-50">
                {uploadingKategori === kategori ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ImagePlus />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, kategori)}
                  className="hidden"
                  disabled={uploadingKategori === kategori}
                />
              </label>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
