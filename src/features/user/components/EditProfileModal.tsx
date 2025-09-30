// components/EditProfileDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { editProfileSchema } from "@/validation/tenant.validation";

import { Pencil } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { useEffect } from "react";
import { parseISO } from "date-fns";
import DatePicker from "@/app/(public)/kosts/[kostId]/booking/components/DatePicker";

interface EditProfileDialogProps {
  open: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onSubmit: (data: any) => void;
}

export const EditProfileModal = ({
  open,
  onOpenChange,
  user,
  onSubmit,
  isLoading,
}: EditProfileDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: "",
      gender: "male",
      job: "",
      otherJob: "",
      hometown: "",
      birthDate: undefined,
      emergencyContact: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        gender: user.gender || "male",
        job: user.job || "",
        otherJob: user.otherJob || "",
        hometown: user.hometown || "",
        birthDate: user.birthDate ? parseISO(user.birthDate) : undefined,
        emergencyContact: user.emergencyContact || "",
      });
    }
  }, [user, reset]);

  const pekerjaan = watch("job");

  const pekerjaanOptions = [
    "Pelajar",
    "Mahasiswa",
    "Karyawan",
    "Wiraswasta",
    "Lainnya",
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="bg-primary-100 hover:bg-primary-200 cursor-pointer rounded-full p-2 transition">
          <Pencil className="text-primary-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profil</DialogTitle>
          <DialogDescription>Perbarui informasi akun Anda.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nama */}
          <div className="space-y-4">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" {...register("name")} placeholder="Nama lengkap" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Jenis Kelamin */}
          <div className="space-y-4">
            <Label>Jenis Kelamin</Label>
            <RadioGroup
              defaultValue="male"
              className="flex gap-6"
              {...register("gender")}
            >
              <Label className="flex items-center space-x-2">
                <RadioGroupItem value="male" />
                <span>👨 Laki-laki</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <RadioGroupItem value="female" />
                <span>👩 Perempuan</span>
              </Label>
            </RadioGroup>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender.message}</p>
            )}
          </div>

          {/* Pekerjaan */}
          <div className="space-y-4">
            <Label htmlFor="pekerjaan">Pekerjaan</Label>
            <select
              id="pekerjaan"
              {...register("job")}
              className="h-10 w-full rounded border px-2"
            >
              <option value="">-- Pilih pekerjaan --</option>
              {pekerjaanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.job && (
              <p className="text-sm text-red-500">{errors.job.message}</p>
            )}
          </div>

          {/* Pekerjaan Lainnya */}
          {pekerjaan === "Lainnya" && (
            <div>
              <Label htmlFor="otherJob">Pekerjaan Lainnya</Label>
              <Input
                id="otherJob"
                {...register("otherJob")}
                placeholder="Isi pekerjaan lainnya"
              />
              {errors.otherJob && (
                <p className="text-sm text-red-500">
                  {errors.otherJob.message}
                </p>
              )}
            </div>
          )}

          {/* Tanggal Lahir */}
          <div className="space-y-4">
            <Label htmlFor="birthDate">Tanggal Lahir</Label>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pilih tanggal lahir"
                  maxDate={new Date()} // ⬅️ biar ga bisa pilih masa depan
                />
              )}
            />
            {errors.birthDate && (
              <p className="text-sm text-red-500">{errors.birthDate.message}</p>
            )}
          </div>

          {/* Nama */}
          <div className="space-y-4">
            <Label htmlFor="hometown">Kota Asal</Label>
            <Input
              id="hometown"
              {...register("hometown")}
              placeholder="Kota Asal"
            />
            {errors.hometown && (
              <p className="text-sm text-red-500">{errors.hometown.message}</p>
            )}
          </div>

          {/* Kontak Darurat */}
          <div className="space-y-4">
            <Label htmlFor="emergencyContact">Kontak Darurat</Label>
            <Input
              id="emergencyContact"
              placeholder="08xxxxxxxxxx"
              {...register("emergencyContact")}
            />
            {errors.emergencyContact && (
              <p className="text-sm text-red-500">
                {errors.emergencyContact.message}
              </p>
            )}
          </div>

          <Button disabled={isLoading} type="submit">
            {isLoading ? "Memproses..." : "Simpan Perubahan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
