"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type PhotoUploadProps = {
  label?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
};

export default function PhotoUpload({ label, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      {preview ? (
        <div className="relative h-40 w-40">
          <Image
            src={preview}
            alt="Preview"
            width={120}
            height={120}
            className="h-full w-full rounded-lg border object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1 rounded-full bg-white p-1 shadow hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-gray-50"
        >
          <p className="text-sm text-gray-500">+ Upload Foto</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}
