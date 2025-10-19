"use client";

import { Bell, ChevronRight, DoorOpen, Handshake, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

type Action = {
  icon: React.ReactNode;
  label: string;
  href: string;
  count?: number; // optional: untuk badge
};

type Props = {
  jumlahPengajuanSewa: number;
  jumlahPengajuanBerhenti: number;
  jumlahTagihanBelumDibayar: number;
};

const ManageKost = ({
  jumlahPengajuanSewa,
  jumlahPengajuanBerhenti,
  jumlahTagihanBelumDibayar,
}: Props) => {
  const action: Action[] = [];

  if (jumlahPengajuanSewa > 0) {
    action.push({
      icon: <Handshake size={18} />,
      label: "Konfirmasi Pengajuan Sewa",
      href: "/dashboard/owner/pengajuan-sewa",
      count: jumlahPengajuanSewa,
    });
  }

  if (jumlahPengajuanBerhenti > 0) {
    action.push({
      icon: <DoorOpen size={18} />,
      label: "Konfirmasi Berhenti Sewa",
      href: "/dashboard/owner/penyewa",
      count: jumlahPengajuanBerhenti,
    });
  }

  if (jumlahTagihanBelumDibayar > 0) {
    action.push({
      icon: <Bell size={18} />,
      label: "Tagihan Belum Dibayar",
      href: "/dashboard/owner/tagihan",
      count: jumlahTagihanBelumDibayar,
    });
  }

  action.push({
    icon: <Home size={18} />,
    label: "Tambah Kost",
    href: "/dashboard/tambah-kost",
  });

  // action.push({
  //   icon: <UserPlus2 size={18} />,
  //   label: "Tambah Penyewa Manual",
  //   href: "/dashboard/owner/penyewa/tambah",
  // });

  return (
    <div className="w-72 min-w-[380px] rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Kelola Kost Anda</h2>
      {action.length === 0 ? (
        <p className="text-sm text-gray-600">
          Tidak ada tindakan yang perlu dilakukan saat ini.
        </p>
      ) : (
        <div className="flex flex-col space-y-3 text-sm font-semibold text-gray-700">
          {action.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between rounded-md border border-gray-300 px-4 py-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="relative flex items-center justify-between">
                  {item.label}
                  {item.count && (
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                      {item.count}
                    </span>
                  )}
                </span>
              </div>
              <ChevronRight size={18} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageKost;
