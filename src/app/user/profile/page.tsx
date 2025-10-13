// app/user/profile/page.tsx

"use client";

import { useState } from "react";

import InformasiAkun from "@/features/user/components/InformasiAkun";
import PreferensiPengguna from "@/features/user/components/UserPreference";
import ProfileTabs from "@/features/user/components/ProfileTabs";
import ChangePasswordTenant from "@/features/user/components/ChangePasswordTenant";

export default function UserProfilePage() {
  const [tab, setTab] = useState("Informasi Akun");

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Profil Saya</h2>

      <ProfileTabs onChange={setTab} />
      <hr className="my-4 border-t border-[#E4E4E7]" />

      {tab === "Informasi Akun" && <InformasiAkun />}
      {tab === "Ganti Password" && <ChangePasswordTenant />}
      {tab === "Preferensi" && <PreferensiPengguna />}
    </>
  );
}
