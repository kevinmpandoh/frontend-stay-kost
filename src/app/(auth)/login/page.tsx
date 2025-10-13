import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk ke Stay Kost",
  description:
    "Masuk ke akun Stay Kost untuk mengelola dan mencari kost dengan mudah.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.staykost.my.id/login",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
