"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../../hooks/useAuth";
import { Eye, EyeOff, Mail, User, Phone, KeyRound } from "lucide-react";
import Link from "next/link";
import { RegisterFormValues, registerSchema } from "../auth.schema";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { Autoplay } from "@/utils/kennAutoPlay";
import "keen-slider/keen-slider.min.css";
import { Label } from "@/components/ui/label";
import { AppLogo } from "@/components/common/AppLogo";
import { APIError } from "@/utils/handleAxiosError";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tenantFeatures = [
  {
    image: "/images/tenant-search.jpg",
    title: "Cari Kost Sesuai Preferensi",
    description:
      "Gunakan filter lokasi, harga, dan fasilitas untuk menemukan kost yang cocok.",
  },
  {
    image: "/images/tenant-secure.jpg",
    title: "Transaksi Sewa Aman",
    description:
      "Pembayaran sewa dan tagihan dilakukan secara aman melalui sistem aplikasi.",
  },
  {
    image: "/images/tenant-chat.jpg",
    title: "Chat dengan Pemilik",
    description:
      "Hubungi pemilik kost secara langsung untuk bertanya detail sebelum menyewa.",
  },
  {
    image: "/images/tenant-review.jpg",
    title: "Lihat Review Kost",
    description:
      "Baca ulasan dari penyewa sebelumnya agar lebih yakin dengan pilihanmu.",
  },
];

const ownerFeatures = [
  {
    image: "/images/owner-manage.jpg",
    title: "Kelola Kost dengan Mudah",
    description:
      "Tambahkan kamar, atur harga, dan update ketersediaan secara real-time.",
  },
  {
    image: "/images/owner-income.jpg",
    title: "Pantau Pendapatan",
    description:
      "Cek laporan transaksi dan pendapatan kost kapan pun dengan transparan.",
  },
  {
    image: "/images/tenant-chat.jpg",
    title: "Komunikasi Cepat",
    description: "Balas chat calon penyewa langsung dari aplikasi tanpa ribet.",
  },
  {
    image: "/images/owner-promo.jpg",
    title: "Promosi Kost",
    description:
      "Tingkatkan visibilitas kost dengan fitur promosi khusus agar cepat tersewa.",
  },
];

export const RegisterForm = () => {
  const { register: registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [role, setRole] = useState<"tenant" | "owner">("tenant");
  const features = role === "tenant" ? tenantFeatures : ownerFeatures;

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel); // update current slide index
      },
      created() {
        setLoaded(true);
      },
    },
    [Autoplay(3000)],
  );

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "tenant",
    },
    //   mode: "onChange",
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(
      {
        ...values,
        role,
      },
      {
        onError: (error) => {
          if (error instanceof APIError) {
            if (error.details && typeof error.details === "object") {
              Object.entries(error.details).forEach(([field, message]) => {
                setError(field as keyof RegisterFormValues, {
                  type: "manual",
                  message: message as string,
                });
              });
            } else {
              // fallback jika error tidak punya details (misalnya error umum)
              setError("root", {
                type: "manual",
                message: error.message || "Terjadi kesalahan",
              });
            }
          }
        },
      },
    );
  };

  const roleColor =
    role === "owner"
      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
      : "bg-primary hover:bg-primary/90 text-white";

  return (
    <div
      className={`${role === "tenant" ? "from-primary-200 to-primary-50" : "from-warning-200 to-warning-50"} flex min-h-screen items-center justify-center bg-gradient-to-br via-white`}
    >
      <div className="flex w-full max-w-6xl">
        <div className="w-full lg:w-1/2">
          <div className="bg-white px-10 py-4 shadow-lg ring-gray-100">
            <h2 className="mb-6 text-center text-xl font-semibold">
              Mendaftar sebagai
            </h2>

            <Tabs
              defaultValue="tenant"
              onValueChange={(v) => setRole(v as "tenant" | "owner")}
            >
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="tenant">Penyewa Kost</TabsTrigger>
                <TabsTrigger value="owner">Pemilik Kost</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 space-y-2">
                <Label>Nama Lengkap</Label>
                <Input
                  size={"md"}
                  {...register("name")}
                  type="text"
                  className={
                    role === "owner" ? "focus-visible:ring-warning-400" : ""
                  }
                  leftIcon={<User size={20} className="text-gray-500" />}
                  error={errors.name?.message}
                  placeholder="Masukkan nama lengkap kamu"
                />
              </div>

              <div className="mb-4 space-y-2">
                <Label>Email</Label>
                <Input
                  size={"md"}
                  {...register("email")}
                  type="email"
                  className={
                    role === "owner" ? "focus-visible:ring-warning-400" : ""
                  }
                  leftIcon={<Mail size={20} className="text-gray-500" />}
                  error={errors.email?.message}
                  placeholder="Masukkan email kamu"
                />
              </div>
              <div className="mb-4 space-y-2">
                <Label>Nomor Handphone</Label>
                <Input
                  size={"md"}
                  {...register("phone")}
                  type="text"
                  className={
                    role === "owner" ? "focus-visible:ring-warning-400" : ""
                  }
                  leftIcon={<Phone size={20} className="text-gray-500" />}
                  error={errors.phone?.message}
                  placeholder="Masukkan Nomor Handphone kamu"
                />
              </div>

              <div className="mb-4 space-y-2">
                <Label>Kata Sandi</Label>
                <Input
                  placeholder="Masukkan Password Kamu"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? <EyeOff size={20} /> : <Eye size={20} />
                  }
                  className={
                    role === "owner" ? "focus-visible:ring-warning-400" : ""
                  }
                  leftIcon={<KeyRound size={20} />}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  {...register("password")}
                  error={errors.password?.message}
                />
              </div>

              <div className="mb-4 space-y-2">
                <Label>Konfirmasi Password</Label>
                <Input
                  placeholder="Masukkan Password Kamu"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? <EyeOff size={20} /> : <Eye size={20} />
                  }
                  className={
                    role === "owner" ? "focus-visible:ring-warning-400" : ""
                  }
                  leftIcon={<KeyRound size={20} />}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>

              <Button
                type="submit"
                className={`w-full ${roleColor}`}
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Mendaftar..." : "Daftar"}
              </Button>
            </form>
            <p className="my-6 text-center text-gray-500">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className={`${role === "tenant" ? "text-primary-500" : "text-warning-500"}`}
              >
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
        <div
          className={`${role === "tenant" ? "from-primary-800 to-primary-600" : "from-warning-500 to-warning-600"} hidden w-1/2 flex-col items-center justify-center space-y-6 bg-white bg-gradient-to-br p-10 text-gray-600 shadow-lg transition-all duration-500 lg:flex`}
        >
          <Link href={"/"}>
            <AppLogo mode="full" variant="light" />
          </Link>
          <div
            ref={sliderRef}
            className={`keen-slider w-full transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className="keen-slider__slide flex flex-col items-center justify-center px-6 text-white"
              >
                <div className="flex w-64 flex-col items-center space-y-4">
                  <Image
                    src={feature.image}
                    width={300}
                    height={300}
                    className="h-auto w-full rounded-lg border-2 border-gray-300 object-cover"
                    alt="feature"
                  />

                  <h2 className="mt-6 text-center text-2xl font-semibold text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-center text-base leading-6 text-slate-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {loaded && (
            <div className="mt-4 flex justify-center gap-2">
              {features.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-0.5 w-8 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
