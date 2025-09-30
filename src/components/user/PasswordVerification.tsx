// components/user/PasswordVerifikasi.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PasswordVerifikasi() {
  return (
    <>
      {/* Password Section */}
      <section className="bg-white rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Ubah Password</h2>
        <form className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="oldPassword">Password Lama</Label>
            <Input id="oldPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="newPassword">Password Baru</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button type="submit" className="mt-2">
            Simpan Perubahan
          </Button>
        </form>
      </section>
    </>
  );
}
