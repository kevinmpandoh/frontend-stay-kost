"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useModalStore } from "@/stores/modal.store";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";

import KostCard from "@/components/dashboard/kost-saya/KostCard";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";

// misalnya data subscription dilempar via props atau fetch dari API

const Page = () => {
  const router = useRouter();
  const { openUpgrade } = useModalStore();
  const { currentSubscription } = useSubscription();
  const { kostOwner: kostOwnerData, loadingKostOwner } = useOwnerKost();

  const usedKost = useMemo(() => {
    if (!kostOwnerData) return 0;
    return kostOwnerData.filter((k: any) => k.isPublished === true).length;
  }, [kostOwnerData]);

  const handleTambahKost = () => {
    if (usedKost >= currentSubscription?.package?.maxKost) {
      openUpgrade();
    } else {
      router.push("/dashboard/tambah-kost");
    }
  };

  if (loadingKostOwner) {
    return <h1>Loading</h1>;
  }

  // if (!kostOwnerData || kostOwnerData.length === 0) {
  //   return (
  //     <EmptyState message="Anda belum memiliki data kost. Silakan tambah kost terlebih dahulu." />
  //   );
  // }

  return (
    <>
      <PageHeader title="Kost Saya" />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput placeholder="Cari Kost" />

        <Button type="button" size={"lg"} onClick={handleTambahKost}>
          <Plus /> Tambah Kost
        </Button>
      </div>

      {!kostOwnerData || kostOwnerData.length === 0 ? (
        <EmptyState message="Anda belum memiliki data kost. Silakan tambah kost terlebih dahulu." />
      ) : (
        <>
          {kostOwnerData.map((kost: any) => (
            <KostCard key={kost.id} kost={kost} />
          ))}
        </>
      )}
    </>
  );
};

export default Page;
