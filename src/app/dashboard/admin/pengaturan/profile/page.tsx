"use client";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { EditNameDialog } from "./EditNameDialog";
import { useUser } from "@/features/user/hooks/useUser";
import { useAuthStore } from "@/stores/auth.store";

const AdminProfile = () => {
  const [openEditName, setOpenEditName] = useState(false);
  const { user } = useAuthStore();
  const { uploadPhoto, updateCurrentUser } = useUser();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // setPreview(URL.createObjectURL(file)); // instant preview
    uploadPhoto.mutate(file);
  };

  const handleUpdate = (values: any) => {
    if (!user) return;
    updateCurrentUser.mutate(
      { name: values.name, phone: user?.phone },
      {
        onSuccess: () => {
          setOpenEditName(false);
        },
      },
    );
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Profile Saya</h1>
      <p className="mb-6 text-gray-600">
        Atur informasi akun Anda, termasuk profil, keamanan, dan pembayaran.
      </p>
      {/* Content for Pengaturan Owner goes here */}
      <section className="flex">
        <div className="group relative mr-10">
          <Image
            alt="Foto Profil"
            className="mb-2 h-32 w-32 rounded-2xl object-cover transition-opacity"
            src={user?.photo || "/profile-default.png"}
            width={120}
            height={120}
          />
          {uploadPhoto.isPending && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
              <Loader2 className="h-6 w-6 animate-spin text-gray-700" />
            </div>
          )}
          <label className="cursor-pointer text-sm font-semibold text-blue-600">
            <span className="underline">Ganti Foto</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="w-[80%] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CircleUserRound className="text-lg text-gray-600" />
              <div>
                <p className="text-base leading-tight font-semibold text-gray-900">
                  Nama Lengkap
                </p>
                <p className="text-base leading-tight text-gray-500">
                  {user?.name}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setOpenEditName(true)}>
              Ubah
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="text-lg text-gray-600" />
              <div>
                <p className="text-base leading-tight font-semibold text-gray-900">
                  Email
                </p>
                <p className="text-base leading-tight text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
            {/* <Button variant={"outline"}>Verifikasi</Button> */}
          </div>
        </div>
      </section>
      <EditNameDialog
        open={openEditName}
        onClose={() => setOpenEditName(false)}
        defaultName={user?.name || ""}
        loading={updateCurrentUser.isPending}
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default AdminProfile;
