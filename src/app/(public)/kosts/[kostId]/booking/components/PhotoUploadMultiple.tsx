"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";

type PhotoUploadMultipleProps = {
  label?: string;
  values?: File[];
  onChange: (files: File[]) => void;
};

export default function PhotoUploadMultiple({
  label,
  values = [],
  onChange,
}: PhotoUploadMultipleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = [...values, ...files];
      onChange(newFiles);

      const newPreviews = [
        ...previews,
        ...files.map((f) => URL.createObjectURL(f)),
      ];
      setPreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = values.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onChange(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      <div className="flex flex-wrap gap-3">
        {previews.map((src, i) => (
          <div key={i} className="relative h-32 w-32">
            <img
              src={src}
              alt={`Preview-${i}`}
              className="h-full w-full rounded-lg border object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 rounded-full bg-white p-1 shadow hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <div
          onClick={() => inputRef.current?.click()}
          className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-gray-50"
        >
          <p className="text-sm text-gray-500">+ Tambah Foto</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
}
