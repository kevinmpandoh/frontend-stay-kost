"use client";
import React from "react";

import { kostList } from "@/types/kost.type";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../hooks/useWishlist";
import KostCard from "@/components/common/CardListKost";
import { Button } from "@/components/ui/button";

export const Wishlist = () => {
  const { wishlist } = useWishlist();

  const { isLoading } = wishlist;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!wishlist.data || wishlist.data.length === 0) {
    return (
      <div className="mx-auto flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Image
          src={"/Empty.svg"}
          alt="Empty state illustration"
          width={240}
          height={240}
          className="mb-4 h-48 w-48"
        />
        <p className="text-lg text-gray-500">Kamu belum punya wishlist.</p>
        <Button className="bg-primary-600">
          <Link href={"/kosts"}>Cari Kost</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {wishlist.data.map((item: any) => (
        <KostCard
          key={item.id}
          id={item.roomType_id}
          title={item.kostName}
          location={item.address}
          type={item.type}
          price={item.price}
          images={item.images}
          facilities={item.facilities}
          claasName="w-[250px]"
          availableRooms={item.availableRooms}
        />
      ))}
    </>
  );
};
