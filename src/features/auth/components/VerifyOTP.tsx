"use client";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { useRegisterStore } from "../register.store";
import { useAuthStore } from "@/stores/auth.store";

const VerifyOTPForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP, resendOTP } = useAuth();

  const { isAuthenticated, isHydrated } = useAuthStore();
  const { hasHydrated, justRegistered, email } = useRegisterStore();

  useEffect(() => {
    if (hasHydrated && isHydrated && !justRegistered && !isAuthenticated) {
      router.replace("/register");
    }
  }, [hasHydrated, justRegistered, router, isAuthenticated, isHydrated]);

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  if (!hasHydrated) {
    return <p>Loading...</p>; // jangan redirect dulu sebelum hydrate
  }

  const handleResendOTP = async () => {
    if (!email) return;
    resendOTP.mutate(email, {
      onSuccess: () => {
        setIsResendDisabled(true);
        setTimer(30);
        setOtp(["", "", "", "", "", ""]);
      },
    });
  };

  const handleChange = async (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Hanya angka
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Pindah ke input berikutnya jika ada angka
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Jika sudah 6 digit, otomatis kirim OTP
    if (newOtp.every((digit) => digit !== "")) {
      if (!email) return;
      verifyOTP.mutate({ email, otp: newOtp.join("") });
      localStorage.removeItem("otp_email");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className="from-primary-200 to-primary-50 flex min-h-screen items-center justify-center bg-gradient-to-br via-white">
        <div className="flex flex-col items-center rounded-lg border border-slate-300 bg-white md:flex-row">
          <div className="w-full p-10">
            <Link href="/register" className="mb-4 flex gap-2 text-gray-500">
              <ArrowLeft /> <span>Kembali</span>
            </Link>
            <h2 className="mb-2 text-2xl font-semibold">Masukkan Kode OTP</h2>
            <p className="mb-4 text-gray-600">
              Silahkan masukkan 6 digit kode verifikasi yang dikirimkan ke:
            </p>
            <p className="mb-6 font-semibold text-slate-800">{email}</p>

            {/* Input OTP */}
            <div className="mb-8 flex items-center justify-center space-x-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  className="focus:ring-primary-500 h-12 w-12 rounded-lg border border-gray-300 text-center text-xl focus:ring-2 focus:outline-none"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={verifyOTP.isPending}
                />
              ))}
            </div>

            {/* Timer Resend OTP */}
            <div className="mt-4 text-center text-gray-500">
              {resendOTP.isPending ? (
                <p className="text-warning-500">
                  Mohon tunggu OTP sedang dikirimkan kembali...
                </p>
              ) : isResendDisabled ? (
                <>
                  Mohon tunggu{" "}
                  <span className="text-primary font-semibold">{timer}s</span>{" "}
                  untuk mengirim ulang
                </>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="font-reguler text-primary-500 cursor-pointer hover:underline"
                >
                  Kirim ulang OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTPForm;
