// src/components/common/PasswordInput.tsx
"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const PasswordInput = ({
  register,
  error,
}: {
  register: any;
  error?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        {...register}
        className={`w-full px-4 py-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-2.5 text-gray-500"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
