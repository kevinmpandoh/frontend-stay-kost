"use client";

import {
  Bell,
  DoorOpen,
  Handshake,
  Home,
  UserPlus2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type Tindakan = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

type Props = {
  jumlahPengajuanSewa: number;
  jumlahPengajuanBerhenti: number;
  jumlahTagihanBelumDibayar: number;
  sudahAdaKost: boolean;
  sudahAdaKamarTersedia: boolean;
};

const TindakanTerbaru = ({
  jumlahPengajuanSewa,
  jumlahPengajuanBerhenti,
  jumlahTagihanBelumDibayar,
  sudahAdaKost,
  sudahAdaKamarTersedia,
}: Props) => {
  const tindakan: Tindakan[] = [];

  if (jumlahPengajuanSewa > 0) {
    tindakan.push({
      icon: <Handshake size={18} />,
      label: `Konfirmasi Pengajuan Sewa (${jumlahPengajuanSewa})`,
      href: "/dashboard/owner/pengajuan",
    });
  }

  if (jumlahPengajuanBerhenti > 0) {
    tindakan.push({
      icon: <DoorOpen size={18} />,
      label: `Persetujuan Berhenti Sewa (${jumlahPengajuanBerhenti})`,
      href: "/dashboard/owner/penghentian",
    });
  }

  if (jumlahTagihanBelumDibayar > 0) {
    tindakan.push({
      icon: <Bell size={18} />,
      label: `Tagihan Belum Dibayar (${jumlahTagihanBelumDibayar})`,
      href: "/dashboard/owner/tagihan",
    });
  }

  if (!sudahAdaKost) {
    tindakan.push({
      icon: <Home size={18} />,
      label: "Tambah Kost Pertama Anda",
      href: "/dashboard/owner/kost/tambah",
    });
  }

  if (sudahAdaKost && sudahAdaKamarTersedia) {
    tindakan.push({
      icon: <UserPlus2 size={18} />,
      label: "Tambah Penyewa Manual",
      href: "/dashboard/owner/penyewa/tambah",
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full min-w-[340px]">
      <h2 className="font-semibold text-lg mb-4">
        Tindakan yang Perlu Dilakukan
      </h2>
      {tindakan.length === 0 ? (
        <p className="text-sm text-gray-600">
          Tidak ada tindakan yang perlu dilakukan saat ini.
        </p>
      ) : (
        <div className="flex flex-col space-y-3 text-sm font-semibold text-gray-700">
          {tindakan.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight size={18} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TindakanTerbaru;
