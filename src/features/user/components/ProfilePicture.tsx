// components/ProfilePicture.tsx
"use client";

import { ChangeEvent } from "react";

import { Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { useUser } from "../hooks/useUser";

interface ProfilePictureProps {
  src?: string | null;
}

export const ProfilePicture = ({ src }: ProfilePictureProps) => {
  const { uploadPhoto } = useUser();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadPhoto.mutate(file);
  };

  return (
    <div className="group relative flex flex-col items-center">
      {src ? (
        <>
          <Image
            alt="Foto Profil"
            className="mb-2 h-32 w-32 rounded-2xl object-cover transition-opacity"
            src={src}
            width={120}
            height={120}
          />
          {uploadPhoto.isPending && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
              <Loader2 className="h-6 w-6 animate-spin text-gray-700" />
            </div>
          )}
        </>
      ) : (
        <label className="mb-2 flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100">
          <ImageIcon className="mb-2 h-12 w-12" />
          <span className="text-base">Upload Gambar</span>
          <span className="text-sm text-gray-400">jpg, jpeg, png</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}

      {uploadPhoto.isPending && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
          <Loader2 className="h-6 w-6 animate-spin text-gray-700" />
        </div>
      )}

      {src && (
        <label className="text-primary-600 cursor-pointer text-sm font-semibold">
          <span className="underline">Ganti Foto</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};
