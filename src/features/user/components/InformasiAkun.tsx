"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { ProfilePicture } from "./ProfilePicture";
import { EditProfileModal } from "./EditProfileModal";
import { UserProfileInfo } from "./UserProfileInfo";

import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/validation/tenant.validation";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { useUser } from "@/features/user/hooks/useUser";

export default function InformasiAkun() {
  // const user = useAuthStore((state) => state.user);

  const { userCurrent } = useUser();
  const { data: user, isLoading } = userCurrent;

  const { updateCurrentUser } = useUser();

  const [openEdit, setOpenEdit] = useState(false);

  const handleUpdateProfile = (data: any) => {
    updateCurrentUser.mutate(data); // akan trigger ke backend dan re-fetch data
    setOpenEdit(false);
  };

  return (
    <>
      <main className="item relative flex w-full max-w-4xl flex-col gap-8 sm:flex-row">
        <section className="flex flex-col items-center justify-center p-6 text-center sm:w-56">
          <ProfilePicture src={user?.photo} />

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <Mail size={18} />
              {user?.email}
            </div>
            {user?.phone && (
              <div className="flex items-center justify-center gap-2">
                <Phone size={18} />
                {user?.phone}
              </div>
            )}
          </div>
        </section>

        <div className="hidden w-px bg-gray-200 sm:block" />

        <section className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0F172A]">Detail Akun</h2>
            <EditProfileModal
              open={openEdit}
              onOpenChange={setOpenEdit}
              user={user}
              onSubmit={handleUpdateProfile}
              isLoading={updateCurrentUser.isPending}
            />
          </div>

          <UserProfileInfo
            name={user?.name ?? "User"}
            gender={user?.gender ?? null}
            pekerjaan={user?.job ?? null}
            kota_asal={user?.hometown ?? null}
            kontakDarurat={user?.emergencyContact ?? null}
            tanggal_lahir={user?.birthDate ?? null}
          />
        </section>
      </main>
      <hr className="my-6" />
    </>
  );
}
