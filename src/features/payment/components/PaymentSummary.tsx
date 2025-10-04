import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Invoice } from "../types/invoice.type";

export function PaymentSummary({ invoice }: { invoice: Invoice }) {
  if (!invoice || invoice.amount == null) {
    return (
      <div className="p-4 text-sm text-red-500">
        Data tagihan tidak lengkap.
      </div>
    );
  }

  return (
    <aside
      className={`${invoice.type === "booking" ? "max-w-md" : "max-w-sm"} self-start rounded-lg border border-gray-200 p-6 select-text`}
    >
      {invoice.type === "booking" ? (
        <>
          {/* === Booking === */}
          <div className="mb-6 flex gap-4">
            <Image
              src={invoice?.photos}
              alt={invoice?.kostName}
              className="h-22 w-30 rounded-md object-cover"
              width={120}
              height={90}
            />
            <div className="flex flex-col justify-center space-y-2">
              <Badge variant={"outline"} className="capitalized">
                {invoice?.kostType}
              </Badge>
              <h3 className="text-base leading-tight font-semibold text-slate-800 select-text">
                {invoice?.kostName}
              </h3>
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-700 capitalize select-text">
                <MapPin size={18} />
                {invoice?.address}
              </p>
            </div>
          </div>

          <hr className="mb-6 border-t border-gray-200" />

          <dl className="mb-6 space-y-3 text-base text-gray-800">
            <div className="flex justify-between">
              <dt>Tanggal Masuk</dt>
              <dd>{invoice?.startDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tanggal Selesai</dt>
              <dd>{invoice?.endDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Durasi Sewa</dt>
              <dd>{invoice?.duration} bulan</dd>
            </div>
          </dl>
        </>
      ) : (
        <>
          {/* === Subscription === */}
          <div className="mb-6">
            <Badge>Langganan Paket</Badge>
            <h3 className="mt-2 text-lg font-bold">{invoice?.packageName}</h3>
            <p className="text-sm text-gray-600">
              Berlaku {invoice?.packageDuration} hari
            </p>
          </div>

          {invoice?.packageFeatures?.length > 0 && (
            <ul className="mb-6 list-inside list-disc text-sm text-gray-700">
              {invoice.packageFeatures.map((feature: string, i: number) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          )}
        </>
      )}

      <hr className="mb-6 border-t border-gray-200" />

      <h4 className="mb-4 text-xl font-bold text-slate-800 select-text">
        Rincian Pembayaran
      </h4>

      <dl className="mb-6 space-y-3 text-base text-gray-800">
        {invoice.type === "booking" ? (
          <div className="flex justify-between">
            <dt>Biaya sewa per bulan</dt>
            <dd className="font-semibold">
              Rp {invoice?.amount.toLocaleString("id-ID")}
            </dd>
          </div>
        ) : (
          <div className="flex justify-between">
            <dt>Biaya Langganan</dt>
            <dd className="font-semibold">
              Rp {invoice?.amount.toLocaleString("id-ID")}
            </dd>
          </div>
        )}

        {/* Kalau mau tambahin biaya layanan tetap bisa */}
        <div className="flex justify-between">
          <dt>Biaya Layanan</dt>
          <dd className="font-semibold">Rp 0</dd>
        </div>
      </dl>

      <hr className="mb-6 border-t border-gray-200" />

      <div className="flex justify-between text-xl font-bold text-gray-700 select-text">
        <span>Total Pembayaran</span>
        <span className="text-primary-600">
          Rp {invoice?.amount.toLocaleString("id-ID")}
        </span>
      </div>
    </aside>
  );
}
