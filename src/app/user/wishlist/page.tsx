"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

import KostCard from "@/components/common/CardListKost";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

const WishlistPage = () => {
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
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Wishlist saya</h2>

      <div className="flex flex-wrap gap-4">
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
            claasName="w-full md:w-[250px]"
            availableRooms={item.availableRooms}
          />
        ))}
      </div>
    </>
  );
};

export default WishlistPage;
