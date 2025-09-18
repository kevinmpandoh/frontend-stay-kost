"use client";

import { Bell, DoorOpen, Handshake, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

type ActionItem = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  href: string;
};

type ActionBoxProps = {
  pendingApplications: number;
  stopRequests: number;
  unpaidBills: number;
  showAddTenant: boolean;
};

const ActionBox = ({
  pendingApplications,
  stopRequests,
  unpaidBills,
}: ActionBoxProps) => {
  const items: ActionItem[] = [];

  if (pendingApplications > 0) {
    items.push({
      icon: <Handshake size={18} />,
      title: `${pendingApplications} Pengajuan sewa menunggu konfirmasi`,
      href: "/dashboard/owner/pengajuan",
    });
  }

  if (stopRequests > 0) {
    items.push({
      icon: <DoorOpen size={18} />,
      title: `${stopRequests} Pengajuan berhenti sewa`,
      href: "/dashboard/owner/penghentian",
    });
  }

  if (unpaidBills > 0) {
    items.push({
      icon: <Bell size={18} />,
      title: `${unpaidBills} Tagihan belum dibayar bulan ini`,
      href: "/dashboard/owner/tagihan",
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <h2 className="font-semibold text-lg mb-4">
        Tindakan yang Perlu Dilakukan
      </h2>
      {items.length === 0 ? (
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <XCircle size={18} className="text-green-500" />
          Tidak ada tindakan penting saat ini.
        </div>
      ) : (
        <div className="flex flex-col space-y-3 text-sm font-medium text-gray-700">
          {items.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                variant="outline"
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionBox;
