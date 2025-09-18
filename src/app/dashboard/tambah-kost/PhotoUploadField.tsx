"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Photo = {
  _id: string;
  url: string;
  category: string;
};

interface PhotoUploadFieldProps {
  label: string; // Tampilan user-friendly
  value: string; // value untuk backend
  photos: Photo[];
  uploading: boolean;
  deletingPhotoId: string | null;
  onUpload: (file: File, category: string) => void;
  onDelete: (photoId: string) => void;
  maxPhotos?: number;
}

export default function PhotoUploadField({
  label,
  value,
  photos,
  uploading,
  deletingPhotoId,
  onUpload,
  onDelete,
  maxPhotos = 5,
}: PhotoUploadFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file, value);
  };

  return (
    <div>
      <h2 className="mb-2 font-semibold">{label}</h2>
      <div className="flex flex-wrap gap-3">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="relative h-48 w-48 overflow-hidden rounded border"
          >
            <Image
              src={photo.url}
              alt={label}
              className="h-full w-full object-cover"
              width={280}
              height={280}
            />
            <button
              onClick={() => onDelete(photo._id)}
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

        {photos.length < maxPhotos && (
          <label className="flex h-48 w-48 cursor-pointer items-center justify-center rounded border-2 border-dashed text-gray-500 hover:bg-gray-50">
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ImagePlus />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
