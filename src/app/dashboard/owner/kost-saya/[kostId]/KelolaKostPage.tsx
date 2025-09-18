"use client";
import { Button } from "@/components/ui/button";

// import { useKost } from "@/hooks/useKost";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import KostTypeCard from "./KostTypeCard";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";
import BackLink from "@/components/common/BackLink";
import SearchInput from "@/components/common/SearchInput";

const KelolaKostPage = ({ kostId }: { kostId: string }) => {
  const { detailKost: kost, loadingDetailKost } = useOwnerKost(kostId ?? "");

  if (loadingDetailKost) {
    return <h1>Loading...</h1>;
  }

  if (!kost) {
    return <h1>Kost tidak ditemukan</h1>;
  }

  return (
    <>
      <BackLink size={"lg"} fallbackUrl="/dashboard/owner/kost-saya" />

      <h1 className="mb-2 text-2xl font-bold">Kost {kost.name}</h1>
      {/* Alamat */}
      <div className="capitalizes mb-4 flex items-center gap-1 text-sm">
        {kost.address != "undefined" && (
          <>
            <MapPin size={18} />
            {kost.address?.district}, {kost.address?.city},{" "}
            {kost.address?.province}
          </>
        )}
      </div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput placeholder="Search" />

        <Button type="button" size={"lg"}>
          <Link
            href={"/dashboard/kost-type/create?kost_id=" + kostId}
            className="flex items-center gap-1"
          >
            <Plus /> Tambah Tipe Kost
          </Link>
        </Button>
      </div>
      <div className="flex items-start gap-4 overflow-x-auto py-4">
        {kost.roomTypes?.map((item: any) => (
          <KostTypeCard key={item.id} kostType={item} kostId={kostId} />
        ))}
      </div>
    </>
  );
};

export default KelolaKostPage;
