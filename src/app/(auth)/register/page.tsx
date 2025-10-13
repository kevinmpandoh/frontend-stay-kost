import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun Stay Kost",
  description:
    "Daftar akun gratis di Stay Kost untuk mulai mengiklankan dan mencari kost.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.staykost.my.id/register",
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
