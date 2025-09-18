// components/ProfilePicture.tsx
"use client";

import { ChangeEvent } from "react";
import { useTenant } from "@/hooks/useTenant";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ProfilePictureProps {
  src: string;
}

export const ProfilePicture = ({ src }: ProfilePictureProps) => {
  const { uploadPhoto } = useTenant();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // setPreview(URL.createObjectURL(file)); // instant preview
    uploadPhoto.mutate(file);
  };

  return (
    <div className="group relative">
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
      <label className="text-primary-600 cursor-pointer text-sm font-semibold">
        <span className="underline">Ganti Foto</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
