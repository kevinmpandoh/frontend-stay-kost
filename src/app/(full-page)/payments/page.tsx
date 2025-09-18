"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { PAYMENT_METHOD } from "@/constants/paymentMethod";
import { PaymentMethodDialog } from "@/features/payment/components/PaymentMethodModal";
import { PaymentMethodSelector } from "@/features/payment/components/PaymentMethodSelector";
import { InvoiceSection } from "@/features/payment/components/InvoiceSection";
import { PaymentCTA } from "@/features/payment/components/PaymentCTA";
import { PaymentInstruction } from "@/features/payment/components/PaymentInstruction";
import { CountdownTimer } from "@/features/payment/components/CountdownTimer";
import { PaymentSummary } from "@/features/payment/components/PaymentSummary";
import { usePayment } from "@/features/payment/hooks/usePayment";
import { APIError } from "@/utils/handleAxiosError";
import ErrorDisplay from "@/components/errors/ErrorDisplay";
import { useInvoice } from "@/features/invoice/hooks/useInvoice";
import { Button } from "@/components/ui/button";

// === Countdown Hook ===
function useCountdown(expiredAt: string | null) {
  const calculateTimeLeft = () => {
    if (!expiredAt) return null;
    const difference = +new Date(expiredAt) - +new Date();
    if (difference <= 0) return null;
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!expiredAt) return null;
      const difference = +new Date(expiredAt) - +new Date();
      if (difference <= 0) return null;
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredAt]);

  return timeLeft;
}

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState<{
    name: string;
    logo: string;
    provider: string;
    method: string;
    channel: string;
  } | null>(null);
  const [confirmedMethod, setConfirmedMethod] = useState<{
    name: string;
    logo: string;
    provider: string;
    method: string;
    channel: string;
  } | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const invoiceNumber = searchParams.get("invoice") ?? "";

  const {
    invoice,
    loadingInvoice,
    errorInvoice,
    createPayment,
    creatingPayment,
  } = useInvoice({
    invoiceNumber,
  });

  const { changeMethod, changingMethod, confirmPayment, confirmingPayment } =
    usePayment();
  const timeLeft = useCountdown(invoice?.payment?.expiredAt ?? null);

  if (errorInvoice instanceof APIError) {
    if (errorInvoice.status === 404) {
      return <ErrorDisplay status={404} message="Tagihan tidak ditemukan." />;
    }
    return (
      <ErrorDisplay
        status={errorInvoice.status}
        message={errorInvoice.message}
      />
    );
  }

  if (loadingInvoice || !invoice)
    return (
      <div className="flex h-96 items-center justify-center">
        {/* <Spinner /> Komponen loading animasi */}
        Loading
      </div>
    );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirmMethod = () => {
    if (!selectedTemp) {
      toast.error("Pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (invoice?.payment) {
      changeMethod({
        paymentId: invoice?.payment._id,
        provider: selectedTemp.provider,
        method: selectedTemp.method,
        channel: selectedTemp.channel,
      });
      // setSelectedTemp(null);
      closeModal();
    } else {
      setConfirmedMethod(selectedTemp);
      // setSelectedTemp(null);
      closeModal();
    }
  };

  const handleClick = () => {
    if (!confirmedMethod) {
      toast.error("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }
    if (invoice && confirmedMethod) {
      createPayment({
        invoiceNumber: invoice.invoiceNumber,
        provider: confirmedMethod.provider,
        method: confirmedMethod.method,
        channel: confirmedMethod.channel,
      });
    }
  };

  const handleConfirm = () => {
    if (!invoice.payment) {
      toast.error("Tidak ada Pembayaran yang bisa dikonfirmasi.");
      return;
    }

    confirmPayment(invoice.payment._id);
  };

  return (
    <>
      {/* Header */}

      {/* Main Content */}
      <main className="mx-auto flex max-w-7xl flex-grow flex-col gap-15 py-10 md:flex-row">
        {/* Left Section */}
        <section className="w-full flex-1">
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-700 select-none"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          <h1 className="mb-8 text-3xl font-extrabold select-text">
            Pembayaran
          </h1>

          {timeLeft && invoice?.payment && (
            <CountdownTimer
              timeLeft={timeLeft}
              expiry_time={invoice?.payment.expiredAt}
            />
          )}

          <InvoiceSection invoice={invoice} />
          {!invoice.payment ? (
            <>
              <PaymentMethodSelector
                confirmedMethod={confirmedMethod}
                openModal={openModal}
              />

              <PaymentCTA
                creatingPayment={creatingPayment}
                handleClick={handleClick}
                confirmedMethod={confirmedMethod}
              />
            </>
          ) : (
            <>
              <PaymentInstruction payment={invoice.payment} />

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant={"outline"}
                  size={"lg"}
                  onClick={openModal}
                  className="w-full flex-1"
                >
                  Ganti Metode Pembayaran
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={confirmingPayment || !invoice}
                  size={"lg"}
                  className="flex-1"
                >
                  {confirmingPayment ? "Memproses..." : "Saya sudah bayar"}
                </Button>
              </div>
            </>
          )}
        </section>

        {/* Right Section */}
        <PaymentSummary invoice={invoice} />
      </main>

      {/* Modal */}
      <PaymentMethodDialog
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmMethod}
        selected={selectedTemp}
        setSelected={(method) => setSelectedTemp(method)}
        methods={PAYMENT_METHOD}
      />
    </>
  );
};

export default PaymentPage;
